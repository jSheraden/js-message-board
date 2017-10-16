import { Router } from 'express';
import models from '../db/models';

export default new Router()
  .get('/', (req, res) => {
    models.Post.findAll().then(posts => {
      res.send(posts);
    });
  })

  .post('/', (req, res) => {
    models.Post.create({
      body: req.body.body,
      type: 'post'
    }).then(() => {
      res.redirect('/');
    });
  })

  .get('/new', (req, res) => {
    res.render('newPost', {});
  })

  .get('/:id', (req, res) => {
    models.Post.findById(req.params.id).then(post => {
      res.send(post);
    });
  })

  .put('/:id/update', (req, res) => {
    models.Post.findById(req.params.id).then(post => {
      post.body = req.body.body;
      post.save();
    }).then(() => {
      res.redirect('/');
    });
  })

  .delete('/:id/delete', (req, res) => {
    models.Post.findById(req.params.id).then(post => {
      post.destroy();
    }).then(() => {
      res.redirect('/');
    });
  });
