import express from 'express';

const router = express.Router();
router.get('/', (req, res, next) => {
  const token = 'eTRPXY8F~np0zbAzi2~KN';
  res.render('index', { token });
});

export default router;