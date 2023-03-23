const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const opts = {};
const Doctors = require("../models/doctor");

opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();

opts.secretOrKey = "secret@qwervddrw123/7e8wwqwecfe1/4";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    Doctors.findOne({ id: jwt_payload.sub }, function (err, doctor) {
      if (err) {
        return done(err, false);
      }
      if (doctor) {
        return done(null, doctor);
      } else {
        return done(null, false);
        // or you could create a new account
      }
    });
  })
);

module.exports = passport;
