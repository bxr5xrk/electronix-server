import { query } from '../db';
import { Category } from '../db/models/category';

class CategoryService {
  getCategory = async (): Promise<string[]> => {
    const result = await query<Category>('SELECT name FROM category');

    return result.rows.map((i) => i.name);
  };

  getCategoryById = async (id: number): Promise<Category | null> => {
    const result = await query<Category>(
      'SELECT * FROM category WHERE id = $1',
      [id]
    );
    return result.rowCount ? result.rows[0] : null;
  };

  findCategoryIdByName = async (name: string): Promise<null | number> => {
    try {
      const result = await query<Category>(
        'SELECT id FROM category WHERE name = $1',
        [name]
      );
      const category = result.rows[0];
      return category ? category.id : null;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  };
}

export default new CategoryService();
