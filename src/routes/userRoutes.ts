import express from 'express';
import userController from '../controllers/userController';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = express.Router();

router.get('/', adminMiddleware, userController.getUsers);
router.post('/', userController.createUser);
router.put('/:id', adminMiddleware, userController.updateRole);

export default router;
