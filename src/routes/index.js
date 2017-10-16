import { Router } from 'express';
import bodyParser from 'body-parser';
import passportConfig from '../passport-config';
import { ensureLoggedIn } from 'connect-ensure-login';

// Get the home page.
export default new Router()
  .get('/', (req, res) =>
    res.render('index', {
      title: 'JavaScript Message Board',
      user: req.user
    })
  )

  .get('/signup', (req, res) => res.render('signup', {}))
  .get('/login',  (req, res) => res.render('login',  { title: 'User Login' }))

  .post('/login',
    bodyParser.urlencoded({ extended: true }),
    (req, res, next) => {
      passportConfig.authenticate('local', (err, user, info) => {
        if (err) return next(err);

        if (!user) {
          console.log('User does not exist!');
          return res.redirect('/login');
        }

        req.logIn(user, err => {
          console.log('Login successful!');

          if (err) return next(err);

          return res.redirect('/');
        });
      })(req, res, next);
    }
  )

  .get('/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  })

  .get('/profile', ensureLoggedIn(), (req, res) =>
    res.render('profile', { user: req.user })
  );