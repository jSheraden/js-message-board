import { Router } from 'express';
import models from '../db/models';

const router = new Router();

router.get('/', (req, res, next) => {
  models.Post.findAll().then(posts => {
    res.send(posts);
  });
});

router.post('/', (req, res, next) => {
  models.Post.create({
    body: req.body.body,
    type: 'post'
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/new', (req, res, next) => {
  res.render('newPost', {});
});

export default router;
