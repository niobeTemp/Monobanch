const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

module.exports = function(passport) {
  passport.use(new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
    User.findOne({ email: email.toLowerCase() }, (err, user) => {
      if (err) return done(err);
      if (!user) return done(null, false, { message: 'Incorrect email' });
      user.comparePassword(password, (err, isMatch) => {
        if (err) return done(err);
        if (isMatch) return done(null, user);
        return done(null, false, { message: 'Incorrect password' });
      });
    });
  }));

  passport.use(new JwtStrategy({
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
  }, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, user) => {
      if (err) return done(err, false);
      if (user) return done(null, user);
      else return done(null, false);
    });
  }));
};