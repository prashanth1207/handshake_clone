let mongoose = require('mongoose');
let EventRegistration = mongoose.model('EventRegistration');
let Event = mongoose.model('Event');

module.exports.create_registration = async (req,res) => {
  let eventId = req.body.eventId;
  let studentProfileId = req.body.studentProfileId;
  let alreadyRegistered = await EventRegistration.findOne({
    event: eventId,
    studentProfile: studentProfileId,
  })
  if(alreadyRegistered){
    return res.json({
      success: false,
      error: 'Already registered'
    })
  }
  let eventRegistration = new EventRegistration({
    event: eventId,
    studentProfile: studentProfileId,
  });
  eventRegistration.save()
  .then(async eventRegistration =>{
    let event = await Event.findById(eventId);
    event.eventRegistrations.push(event._id);
    await event.save();
    return eventRegistration
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
  EventRegistration.findOne({
    studentProfile: req.param('studentProfileId')
  }).then(eventRegistation =>{
    resp.json({
      registered: eventRegistation ? true : false
    })
  })
}

module.exports.get_registrations = (req,res) =>{
  EventRegistration.find(req.query || {})
  .populate('studentProfile')
  .populate('event')
  .then(registrations => {
    res.json({
      data: registrations
    });
  })
}