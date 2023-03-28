import express from 'express';
import logController from '../controllers/logController';
import { adminMiddleware } from '../middleware/adminMiddleware';

const router = express.Router();

router.get('/', adminMiddleware, logController.getLogs);

export default router;
