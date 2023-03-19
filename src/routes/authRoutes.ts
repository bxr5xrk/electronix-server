import express from 'express';
import AuthController from '../controllers/authController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

export default router;
