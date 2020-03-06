let models = require('./../models');
let Event = models.Event;
let EventRegistration = models.EventRegistration;

module.exports.show_event = (req, res) =>{
  Event.findByPk(req.param('id')).then(event =>{
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
  let query_params = req.params;
  let studentProfileId = query_params.studentProfileId;
  delete query_params.studentProfileId
  Event.findAll({where: query_params}).then(async events =>{
    let eventRegistrations = await EventRegistration.findAll({
      where: {studentProfileId: studentProfileId}
    });
    let eventsWithRegistrationInfo =  events.map(event =>{
      event.dataValues.registered = eventRegistrations.some(registration => {
          return registration.eventId === event.id
      })
      return event
    })
    return res.json({data: eventsWithRegistrationInfo})
  }).catch(e => {
    res.json({error: 'Something went wrong'})
  });
}

module.exports.show_all_events_for_company = (req,res) =>{
  let query_params = req.params;
  let companyProfileId = query_params.companyProfileId;
  delete query_params.companyProfileId
  Event.findAll(Object.assign({},{where: {companyProfileId: companyProfileId}},query_params)).then(events =>{
    return res.json({
      data: events
    })
  }).catch(e => {
    res.json({error: 'Something went wrong'})
  });
}
