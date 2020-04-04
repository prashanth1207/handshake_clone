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
  let query_params = req.query;
  let page = parseInt(query_params.page || 1) - 1;
  let perPage = parseInt(query_params.perPage || 10);
  delete query_params.page;
  delete query_params.perPage;
  query_params = searchableQuery(query_params);
  let totalRecordCount = await Event.find(query_params).count();
  Event.find(query_params)
  .skip(page > -1 ? page : 0)
  .limit(perPage)
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
    return res.json({
      events: eventsWithRegistrationInfo, 
      studentMajor: major, 
      totalRecordCount: totalRecordCount
    })
  }).catch(e => {
    console.log(e);
    res.json({error: 'Something went wrong'})
  });
}

module.exports.show_all_events_for_company = async (req,res) =>{
  let {companyProfileId} = req.params;
  let query_params = req.query;
  let page = parseInt(query_params.page || 1) - 1;
  let perPage = parseInt(query_params.perPage || 10);
  delete query_params.page;
  delete query_params.perPage;
  query_params = searchableQuery(query_params);
  let totalRecordCount = await Event.find({...query_params,
    companyProfile: companyProfileId}).count();
  Event.find({
    ...query_params,
    companyProfile: companyProfileId
  })
  .skip(page > -1 ? page : 0)
  .limit(perPage)
  .sort('-time')
  .then(events =>{
    return res.json({
      events: events,
      totalRecordCount: totalRecordCount
    })
  }).catch(e => {
    res.json({error: 'Something went wrong'})
  });
}
