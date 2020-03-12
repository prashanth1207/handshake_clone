var app = require('../app');
var chai = require('chai');
chai.use(require('chai-http'));
var expect = require('chai').expect;

var agent = require('chai').request.agent(app);

describe('Events Controller', function(){

    it('GET Event',function(done){
        agent.get('/events/show/2')
            .then(function(res){
                expect(res.body.id).to.equal(2);
                done();
            })
            .catch((e) => {
                done(e);
            });
    });
})