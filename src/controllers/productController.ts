import { Request, Response } from 'express';
import ProductService from '../service/productService';

class ProductController {
  getProducts = async (_: Request, res: Response): Promise<Response> => {
    try {
      const result = await ProductService.getProducts();
      return res.status(200).json(result);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Internal server error' });
    }
  };

  getProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const product = await ProductService.getProductById(Number(id));
      if (product) {
        res.json(product);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  };

  createProduct = async (req: Request, res: Response) => {
    const { title, images, rating, price, brandName, categoryName } = req.body;
    try {
      const newProduct = await ProductService.createProduct(
        title,
        images,
        rating,
        price,
        brandName,
        categoryName
      );
      res.status(201).json(newProduct);
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  };
  updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, images, rating, price, brandName, categoryName } = req.body;
    try {
      const updatedProduct = await ProductService.updateProduct(
        Number(id),
        title,
        images,
        rating,
        price,
        brandName,
        categoryName
      );
      if (updatedProduct) {
        res.json(updatedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  };

  deleteProduct = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
      const deletedProduct = await ProductService.deleteProduct(Number(id));
      if (deletedProduct) {
        res.json(deletedProduct);
      } else {
        res.status(404).json({ error: 'Product not found' });
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(500).json({ error: err.message });
      }
    }
  };
}

export default new ProductController();
