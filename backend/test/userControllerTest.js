var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('User Controller', function(){

    it('POST login check',function(done){
        agent.post('/users/login').send({emailId: 'student@sjsu.edu',password: 'student'})
            .then(function(res){
                expect(res.body.success).to.equal(true);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})