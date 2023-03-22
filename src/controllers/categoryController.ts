import { Request, Response } from 'express';
import categoryService from '../service/categoryService';

class CategoryController {
  getCategories = async (_: Request, res: Response): Promise<Response> => {
    try {
      const categories = await categoryService.getCategory();

      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };

  getCategoryById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const category = await categoryService.getCategoryById(Number(id));

      return res.status(200).json(category);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Server error' });
    }
  };
}

export default new CategoryController();
