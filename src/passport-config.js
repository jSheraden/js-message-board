import passport from 'passport';
import { Strategy } from 'passport-local';
import models from './db/models';

passport.use(new Strategy((username, password, done) => {
  models.User.findOne({
    where: { name: username }
  }).then(user => {
    console.log('Validation process initiated.');

    if (!user) return done(null, false);
    console.log('Username validated.');

    if (user.password != password) return done(null, false);
    console.log('Password validated.');

    return done(null, user);
  });
}));

passport.serializeUser((user, done) => done(null, user.id));

passport.deserializeUser((id, done) => 
  models.User.findById(id)
    .then(user => done(null, user))
    .catch(done)
);

export default passport;
