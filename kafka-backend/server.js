var connection = new require('./kafka/connection');
//load db models and connect
require('./models/index');

//topics files
var companyProfile = require('./services/companyProfile');
var educationDetail = require('./services/educationDetail');
var eventRegistration = require('./services/eventRegistration');
var events = require('./services/events');
var experienceDetail = require('./services/experienceDetail');
var jobApplication = require('./services/jobApplication');
var jobPosting = require('./services/jobPosting');
var message = require('./services/message');
var studentProfile = require('./services/studentProfile');
var user = require('./services/user');
var passport = require('./services/passport');


// const mongoose = require('mongoose');
// const fs = require('fs');

// var options = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     reconnectTries: Number.MAX_VALUE,
//     reconnectInterval: 500, // Reconnect every 500ms
//     poolSize: 500,
//     bufferMaxEntries: 0
//   };

// mongoose.connect(process.env.MONGO_DB_URL, options, (err, res) => {
//     if (err) {
//         console.log(`MongoDB Connection Failed`);
//     } else {
//         console.log(`MongoDB Connected`);
//     }
// });

// fs.readdirSync(__dirname + '/dbSchema').forEach(filename => {
//     if (~filename.indexOf('.js')) {
//         require(__dirname + '/dbSchema/' + filename)
//     }
// });

function handleTopicRequest(topic_name, fname) {
    //var topic_name = 'root_topic';
    var consumer = connection.getConsumer(topic_name);
    var producer = connection.getProducer();
    console.log('Kafka Server is running ');
    consumer.on('message', function (message) {
        console.log('Message received for ' + topic_name);
        var data = JSON.parse(message.value);

        fname.handle_request(data.data, function (err, res) {
            var payloads = [
                {
                    topic: data.replyTo,
                    messages: JSON.stringify({
                        correlationId: data.correlationId,
                        data: res
                    }),
                    partition: 0
                }
            ];
            producer.send(payloads, function (err, data) {
                console.log(data);
            });
            return;
        });

    });
}
// Add your TOPICs here
//first argument is topic name
//second argument is a function that will handle this topic request

handleTopicRequest('companyProfile', companyProfile);
handleTopicRequest('educationDetail', educationDetail);
handleTopicRequest('eventRegistration', eventRegistration);
handleTopicRequest('events', events);
handleTopicRequest('experienceDetail', experienceDetail);
handleTopicRequest('jobApplication', jobApplication);
handleTopicRequest('jobPosting', jobPosting);
handleTopicRequest('message', message);
handleTopicRequest('studentProfile', studentProfile);
handleTopicRequest('user', user);
handleTopicRequest('passport', passport);