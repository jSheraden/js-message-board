import { Router } from 'express';

const router = new Router();

// Get the user login page.
router.get('/', (req, res, next) => {
  res.render('login', { title: 'User Login' });
});

export default router;