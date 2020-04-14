var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
let {jwtToken} = require('./autherizationToken');

describe('Events Controller', function(){

    it('GET Event',function(done){
        agent.get('/events/show/5e83b3c8c1ff29f6ff5376eb').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body._id).to.equal('5e83b3c8c1ff29f6ff5376eb');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})