var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('StudentProfile Controller', function(){

    it('GET Student Profile',function(done){
        agent.get('/student_profile/2')
            .then(function(res){
                expect(res.body.id).to.equal(2);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})