let mongoose = require('mongoose');
let Event = mongoose.model('Event');
let StudentProfile = mongoose.model('StudentProfile');
let CompanyProfile = mongoose.model('CompanyProfile');
let EventRegistration = mongoose.model('EventRegistration');
let searchableQuery =  require('./../utility/search').searchableQuery;

module.exports.show_event = (req, res) =>{
  Event.findById(req.params.id).then(event =>{
    return res.json(event);
  }).catch(e =>{
    return res.status(404).json({error: 'Record not found'});
  })
}

module.exports.create_event = (req,res) => {
  let event = new Event(req.body);
  event.companyProfile = req.body.companyProfileId;
  event.save()
  .then(async event => {
    let companyProfile = await CompanyProfile.findById(req.body.companyProfileId);
    companyProfile.events.push(event._id);
    await companyProfile.save();
    return event;
  })
  .then(_ => {
    return res.json({
      success: true
    })
  }).catch(error => {
    return res.json({
      success: false,
      error: error.message
    })
  })
}

module.exports.show_all_events_for_student = async (req,res) =>{
  let {studentProfileId} = req.params;
  let query_params = searchableQuery(req.query);
  Event.find(query_params)
  .sort('-time')
  .then(async events =>{
    let eventRegistrations = await EventRegistration.find({
      studentProfile: studentProfileId
    });
    let eventsWithRegistrationInfo =  events.map(event =>{
      event._doc.registered = eventRegistrations.some(registration => {
          return registration.event.toString() === event._id.toString()
      })
      return event
    })
    let studentProfile = await StudentProfile.findById(studentProfileId)
      .populate('educationDetails');
    let major = (studentProfile.educationDetails[0] || {}).major;
    return res.json({events: eventsWithRegistrationInfo, studentMajor: major})
  }).catch(e => {
    console.log(e);
    res.json({error: 'Something went wrong'})
  });
}

module.exports.show_all_events_for_company = (req,res) =>{
  let {companyProfileId} = req.params;
  let query_params = searchableQuery(req.query);
  Event.find({
    ...query_params,
    companyProfile: companyProfileId
  }).then(events =>{
    return res.json({
      events: events
    })
  }).catch(e => {
    res.json({error: 'Something went wrong'})
  });
}
