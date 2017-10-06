import { Router } from 'express';
import models from '../db/models';

const router = new Router();

// Get user data.
router.get('/', (req, res, next) => {
  models.User.findAll().then(users => {
    res.send(users);
  });
});

router.post('/', (req, res, next) => {
  models.User.create({
    name: req.body.name,
    password: req.body.password
  }).then(() => {
    res.redirect('/');
  });
});

export default router;
