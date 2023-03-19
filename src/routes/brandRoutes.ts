import express from 'express';
import brandController from '../controllers/brandController';

const router = express.Router();

router.get('/', brandController.getBrands);
router.get('/:id', brandController.getBrandById);

export default router;
