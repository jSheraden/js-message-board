import { Router } from 'express';
import models from '../db/models';

const router = new Router();

router.get('/', (req, res, next) => {
  models.Post.findAll().then(posts => {
    res.send(posts);
  });
});

router.post('/', (req, res) => {
  models.Post.create({
    body: req.body.body,
    type: 'post'
  }).then(() => {
    res.redirect('/');
  });
});

router.get('/new', (req, res) => {
  res.render('newPost', {});
});

router.get('/:id', (req, res) => {
  models.Post.findById(req.params.id).then(post => {
    res.send(post);
  });
});

router.put('/:id/update', (req, res) => {
  models.Post.findById(req.params.id).then(post => {
    post.body = req.body.body;
    post.save();
  }).then(() => {
    res.redirect('/');
  });
});

router.delete('/:id/delete', (req, res) => {
  models.Post.findById(req.params.id).then(post => {
    post.destroy();
  }).then(() => {
    res.redirect('/');
  });
});

export default router;
