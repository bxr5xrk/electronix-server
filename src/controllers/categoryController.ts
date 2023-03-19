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

// export async function getCategoryById(id: number): Promise<Category | null> {
//   const result = await query<Category>('SELECT * FROM category WHERE id = $1', [
//     id,
//   ]);
//   return result.rowCount ? result.rows[0] : null;
// }

// export const findCategoryIdByName = async (
//   name: string
// ): Promise<null | number> => {
//   try {
//     const result = await query<Category>(
//       'SELECT id FROM category WHERE name = $1',
//       [name]
//     );
//     const category = result.rows[0];
//     return category ? category.id : null;
//   } catch (err) {
//     console.error(err);
//     throw new Error('Internal server error');
//   }
// };
