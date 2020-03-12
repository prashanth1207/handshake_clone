let models = require('./../models');
let Event = models.Event;
let StudentProfile = models.StudentProfile;
let EventRegistration = models.EventRegistration;
let EducationDetail = models.EducationDetail;
let searchableQuery =  require('./../utility/search').searchableQuery;

module.exports.show_event = (req, res) =>{
  Event.findByPk(req.params.id).then(event =>{
    return res.json(event);
  }).catch(e =>{
    return res.status(404).json({error: 'Record not found'});
  })
}

module.exports.create_event = (req,res) => {
  Event.create(req.body).then(_ => {
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
  Event.findAll({
    where: query_params,
    order: [
      ['time', 'DESC']
    ]
  }).then(async events =>{
    let eventRegistrations = await EventRegistration.findAll({
      where: {studentProfileId: studentProfileId}
    });
    let eventsWithRegistrationInfo =  events.map(event =>{
      event.dataValues.registered = eventRegistrations.some(registration => {
          return registration.eventId === event.id
      })
      return event
    })
    let studentProfile = await StudentProfile.findBy({
      column: {
        id: studentProfileId
      },
      include:[{
        model: EducationDetail,
        as: 'educationDetails'
      }]});
    let major = (studentProfile.educationDetails[0] || {}).major;
    return res.json({events: eventsWithRegistrationInfo, studentMajor: major})
  }).catch(e => {
    console.log(e);
    res.json({error: 'Something went wrong'})
  });
}

module.exports.show_all_events_for_company = (req,res) =>{
  let {companyProfileId} = req.params;
  let query_params = Object.assign({},searchableQuery(req.query),{companyProfileId: companyProfileId});
  Event.findAll({where: query_params}).then(events =>{
    return res.json({
      events: events
    })
  }).catch(e => {
    res.json({error: 'Something went wrong'})
  });
}
