import express from 'express';
import ProductController from '../controllers/productController';
import { managerMiddleware } from '../middleware/managerMiddleware';

const router = express.Router();

router.get('/', ProductController.getProducts);
router.get('/:id', ProductController.getProduct);
router.post('/', managerMiddleware, ProductController.createProduct);
router.put('/:id', managerMiddleware, ProductController.updateProduct);
router.delete('/:id', managerMiddleware, ProductController.deleteProduct);

export default router;
