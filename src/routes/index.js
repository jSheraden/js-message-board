import { Router } from 'express';
import models from '../db/models';

const router = new Router();

// Get the home page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JavaScript Message Board' });
});

router.get('/signup', (req, res, next) => {
  res.render('signup', {});
});

export default router;
