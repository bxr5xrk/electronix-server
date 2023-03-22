import express from 'express';
import authRoutes from './authRoutes';
import userRoutes from './userRoutes';
import productRoutes from './productRoutes';
import brandRoutes from './brandRoutes';
import categoryRoutes from './categoryRoutes';
import customRoutes from './customRoutes';

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/products', productRoutes);
router.use('/brands', brandRoutes);
router.use('/categories', categoryRoutes);
router.use('/custom', customRoutes);

export default router;
