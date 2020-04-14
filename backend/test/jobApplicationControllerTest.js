var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
let {jwtToken} = require('./autherizationToken');

describe('Job Application Controller', function(){

    it('GET Job Application',function(done){
        agent.get('/job_application?jobPostingId=5e839fc3ab314ddcac861d36').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body.data.length > 0).to.equal(true);
                expect(res.body.data.some(reg => reg.jobPosting === '5e839fc3ab314ddcac861d36')).to.equal(true);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})