import { authMiddleware } from './../middleware/authMiddleware';
import express from 'express';
import customController from '../controllers/customController';

const router = express.Router();

router.post('/', authMiddleware, customController.createCustom);
router.get('/', authMiddleware, customController.getCustomsByUserId);

export default router;
