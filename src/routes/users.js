import { Router } from 'express';
import models from '../db/models';

// Get user data.
export default new Router()
  .get('/', (req, res) => {
    models.User.findAll().then(users => {
      res.send(users);
    });
  })

  .post('/', (req, res) => {
    models.User.create({
      name: req.body.name,
      password: req.body.password
    }).then(() => {
      res.redirect('/');
    });
  })

  .get('/:name', (req, res) =>
    models.User.findOne({
      where: { name: req.params.name }
    }).then(user => res.send(user))
  );