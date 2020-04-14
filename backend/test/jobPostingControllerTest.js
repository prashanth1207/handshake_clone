var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
let {jwtToken} = require('./autherizationToken');

describe('JobPosting Controller', function(){

    it('GET Job Posting',function(done){
        agent.get('/job_postings/5e839fc3ab314ddcac861d36').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body._id).to.equal('5e839fc3ab314ddcac861d36');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})