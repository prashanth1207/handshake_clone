var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('CompanyProfile Controller', function(){

    it('GET Company Profile',function(done){
        agent.get('/company_profile/2')
            .then(function(res){
                expect(res.body.id).to.equal(2);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})