let mongoose = require('mongoose');
let Event = mongoose.model('Event');
let StudentProfile = mongoose.model('StudentProfile');
let CompanyProfile = mongoose.model('CompanyProfile');
let EventRegistration = mongoose.model('EventRegistration');
let searchableQuery =  require('./../utility/search').searchableQuery;

async function handle_request(msg, callback) {
  if(msg.params.path === 'show_event'){
    Event.findById(msg.params.id).then(event =>{
      callback(null,event);
    }).catch(e =>{
      callback(null,{error: 'Record not found'});
    })
  }
  
  if(msg.params.path === 'create_event'){
    let event = new Event(msg.body);
    event.companyProfile = msg.body.companyProfileId;
    event.save()
    .then(async event => {
      let companyProfile = await CompanyProfile.findById(msg.body.companyProfileId);
      companyProfile.events.push(event._id);
      await companyProfile.save();
      return event;
    })
    .then(_ => {
      callback(null,true)
    }).catch(error => {
      callback(null,{error: error.message});
    })
  }
  
  if(msg.params.path === 'show_all_events_for_student'){
    let {studentProfileId} = msg.params;
    let query_params = msg.query;
    let page = parseInt(query_params.page || 1) - 1;
    let perPage = parseInt(query_params.perPage || 10);
    delete query_params.page;
    delete query_params.perPage;
    query_params = searchableQuery(query_params);
    let totalRecordCount = await Event.find(query_params).count();
    Event.find(query_params)
    .skip(page > -1 ? page*perPage : 0)
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
      callback(null,{
        events: eventsWithRegistrationInfo, 
        studentMajor: major, 
        totalRecordCount: totalRecordCount
      })
    }).catch(e => {
      console.log(e);
      callback(null,{error: 'Something went wrong'});
    });
  }
  
  if(msg.params.path === 'show_all_events_for_company'){
    let {companyProfileId} = msg.params;
    let query_params = msg.query;
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
    .skip(page > -1 ? page*perPage : 0)
    .limit(perPage)
    .sort('-time')
    .then(events =>{
      callback(null,{
        events: events,
        totalRecordCount: totalRecordCount
      })
    }).catch(e => {
      callback(null,{error: 'Something went wrong'});
    });
  }
}

exports.handle_request = handle_request;