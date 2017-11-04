import { Router } from 'express';
import bodyParser from 'body-parser';
import passportConfig from '../passport-config';
import { ensureLoggedIn } from 'connect-ensure-login';
import models from '../db/models';

// Get the home page.
export default new Router()
  .get('/', (req, res) =>
    models.Category.findAll().then(categories =>
      models.Forum.findAll().then(forums =>
        res.render('index', {
          title: 'JavaScript Message Board',
          user: req.user,
          categories: categories,
          forums: forums
        })
      )
    )
  )

  .get('/register', (req, res) => res.render('register', {}))
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
          if (err) return next(err);

          console.log('Login successful!');

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