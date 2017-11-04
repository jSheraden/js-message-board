import { Router } from 'express';
import models from '../db/models';

export default new Router()
  .get('/', (req, res) =>
    models.User.findAll().then(users =>
      res.send(users)
    )
  )

  .post('/', (req, res) => {
    if (req.body.password === req.body.passwordConfirm) {
      models.User.create({
        name: req.body.name,
        password: req.body.password,
        email: req.body.email
      }).then(() =>
        res.redirect('/')
      );
    } else {
      res.redirect('/register');
    }
  })

  .get('/:id', (req, res) =>
    models.User.findOne({
      where: { id: req.params.id }
    }).then(user =>
      res.send(user)
    )
  )

  .get('/:name', (req, res) =>
    models.User.findOne({
      where: { name: req.params.name }
    }).then(user =>
      res.send(user)
    )
  );