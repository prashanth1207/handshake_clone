var JWTStrategy =  require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
  secretOrKey: process.env.JWT_SECRECT_KEY
}

const configAuth = (passport) => {
  passport.use(new JWTStrategy(options, (jwt_payload, done) => {
    id = jwt_payload.id;
    User.findOne({_id: id},(err, user) => {
      if(err){
        done(err, false);
      }
      if(user){
        done(null,user);
      }
      else{
        done(null,false);
      }
    })
  }));
}
exports.configAuth = configAuth;

exports.checkAuth = passport.authenticate("jwt", { session: false });