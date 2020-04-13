var JWTStrategy =  require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
const kafka = require('./../kafka/client');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRECT_KEY
}

const configAuth = (passport) => {
  passport.use(new JWTStrategy(options, (jwt_payload, done) => {
    id = jwt_payload.id;
    kafka.make_request('passport',id,function(err,result){
      if(err){
        done(err, false);
      }
      if(result){
        done(null,result);
      }
      else{
        done(null,false);
      }
    })
  }));
}
exports.configAuth = configAuth;

exports.checkAuth = passport.authenticate("jwt", { session: false });