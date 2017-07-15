import { Router } from 'express';

const router = new Router();

// Get the home page.
router.get('/', (req, res, next) => {
  res.render('index', { title: 'JavaScript Message Board' });
});

router.get('/joey', (req, res, next) => {
  res.render('index', { title: 'Joey\'s Page' });
});

export default router;
