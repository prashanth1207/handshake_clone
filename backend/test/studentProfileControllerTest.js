var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
let {jwtToken} = require('./autherizationToken');

describe('StudentProfile Controller', function(){

    it('GET Student Profile',function(done){
        
        agent.get('/student_profile/5e751fac908a87ff34eca20d').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body._id).to.equal('5e751fac908a87ff34eca20d');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})