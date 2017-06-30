import { Router } from 'express';

const router = new Router();

// Get the home page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JavaScript Message Board' });
});

export default router;
