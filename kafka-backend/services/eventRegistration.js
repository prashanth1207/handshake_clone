let mongoose = require('mongoose');
let EventRegistration = mongoose.model('EventRegistration');
let Event = mongoose.model('Event');

async function handle_request(msg, callback) {
  console.log(msg);
 if(msg.params.path === 'createRegistrations'){
    let eventId = msg.body.event;
    let studentProfileId = msg.body.studentProfileId;
    let alreadyRegistered = await EventRegistration.findOne({
      event: eventId,
      studentProfile: studentProfileId,
    })
    if(alreadyRegistered){
      console.log('Already registered');
      callback(null,{error: 'Already registered'});
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
    .then(_ => callback(null,true))
    .catch(e =>{
      console.log(e.message);
      callback(null,{error: e.message});
    })
  }
  
 if(msg.params.path === 'is_student_registered'){
    EventRegistration.findOne({
      studentProfile: msg.param('studentProfileId')
    }).then(eventRegistation =>{
      callback(null,eventRegistation ? true : false);
    })
  }
  
 if(msg.params.path === 'get_registrations'){
    EventRegistration.find(msg.query || {})
    .populate('studentProfile')
    .populate('event')
    .then(registrations => {
      callback(null,registrations);
    })
  }
}

exports.handle_request = handle_request;