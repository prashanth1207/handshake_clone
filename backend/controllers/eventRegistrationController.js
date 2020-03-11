let models = require('./../models');
let EventRegistration = models.EventRegistration
let StudentProfile = models.StudentProfile;
let Event = models.Event;

module.exports.create_registration = async (req,res) => {
  let eventId = req.body.eventId;
  let studentProfileId = req.body.studentProfileId;
  let alreadyRegistered = await EventRegistration.findBy({column: {
    eventId: eventId,
    studentProfileId: studentProfileId,
  }})
  if(alreadyRegistered){
    return res.json({
      success: false,
      error: 'Already registered'
    })
  }
  EventRegistration.create({
    eventId: eventId,
    studentProfileId: studentProfileId,
  })
  .then(_ => res.json({success: true}))
  .catch(e =>{
    return res.json({
      success: false,
      errro: e.message
    })
  })
}

module.exports.is_student_registered = (req,resp) => {
  EventRegistration.findBy({
    column:{
      studentProfileId: req.param('studentProfileId')
    }
  }).then(eventRegistation =>{
    resp.json({
      registered: eventRegistation ? true : false
    })
  })
}

module.exports.get_registrations = (req,res) =>{
  EventRegistration.findAll({
    where: req.query || {},
    include:[
      {
        model: StudentProfile
      },
      {
        model: Event
      }
    ]}).then(registrations => {
    res.json({
      data: registrations
    });
  })
}