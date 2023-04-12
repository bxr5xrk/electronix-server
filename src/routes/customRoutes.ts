import { managerMiddleware } from "./../middleware/managerMiddleware";
import { authMiddleware } from './../middleware/authMiddleware';
import express from 'express';
import customController from '../controllers/customController';

const router = express.Router();

router.post('/', authMiddleware, customController.createCustom);
router.get('/', authMiddleware, customController.getCustomsByUserId);
router.put('/:id', managerMiddleware, customController.updateCustomStatus);

export default router;
