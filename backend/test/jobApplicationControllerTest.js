var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Job Application Controller', function(){

    it('GET Job Application',function(done){
        agent.get('/job_application?jobPostingId=2')
            .then(function(res){
                expect(res.body.data.length > 0).to.equal(true);
                expect(res.body.data.some(reg => reg.jobPostingId === 2)).to.equal(true);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})