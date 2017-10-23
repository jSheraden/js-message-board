import { Router } from 'express';
import models from '../db/models';

export default new Router()
  .get('/', (req, res) =>
    models.Forum.findAll()
      .then(forums => res.send(forums))
  )

  .get('/:id', (req, res) =>
    models.Forum.findById(req.params.id)
      .then(forum =>
        models.Thread.findAll({
          where: { forumId: forum.id }
        }).then(threads =>
          res.render('showForum', {
            forum: forum,
            threads: threads
          })
        )
      )
  )

  .post('/:id/threads', (req, res) =>
    models.Forum.findById(req.params.id)
      .then(forum => {
        if (req.user) {
          models.Thread.create({
            title: req.body.title,
            forumId: forum.id
          }).then(() => 
            models.Thread.findOne({
              where: { title: req.body.title }
            }).then(thread =>
              models.Post.create({
                body: req.body.body,
                userId: req.user.id,
                threadId: thread.id,
                type: 'post'
              })
            ).then(() =>
              res.redirect('/forums/' + forum.id)
            )
          );
        } else {
          res.redirect('/login');
        }
      })
  );