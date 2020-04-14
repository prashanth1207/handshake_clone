var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);
agent.set('Authorization','')
let {jwtToken} = require('./autherizationToken');

describe('CompanyProfile Controller', function(){

    it('GET Company Profile',function(done){
        agent.get('/company_profile/5e751ce4908a87ff34eca20b').set('Authorization',jwtToken)
            .then(function(res){
                expect(res.body._id).to.equal('5e751ce4908a87ff34eca20b');
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})