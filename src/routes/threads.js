import { Router } from 'express';
import models from '../db/models';

export default new Router()
  .get('/', (req, res) =>
    models.Thread.findAll()
      .then(threads => res.send(threads))
  )

  .get('/new', (req, res) => {
    if (req.user) {
      res.render('newThread', {});
    } else {
      res.redirect('/login');
    }
  })

  .get('/:id', (req, res) => {
      // Get all posts belonging to the thread.
      models.Thread.findById(req.params.id).then(thread =>
        models.Post.findAll({
          where: { threadId: thread.id }
        }).then(posts => {
          let userIds = [];

          // Get the IDs of all users participating in the thread.
          posts.forEach(post => userIds.push(post.userId));

          // Some users may have posted multiple times
          // in the same thread. We only need one copy
          // of their data.
          userIds.filter((id, pos) =>
            userIds.indexOf(id) == pos
          );

          models.User.findAll({
            where: { id: userIds }
          }).then(users =>
            res.render('showThread', {
              thread: thread,
              users: users,
              posts: posts
            })
          );
        })
      );
  })

  .post('/:id/newPost', (req, res) => {
    if (req.user) {
      models.Post.create({
        body: req.body.postBody,
        type: 'post',
        userId: req.user.id,
        threadId: req.params.id
      }).then(() =>
        res.redirect('/threads/' + req.params.id)
      )
    } else {
      res.redirect('/login');
    }
  });