import { query } from '../db';
import { Brand } from '../db/models/brand';

class BrandService {
  getBrands = async (): Promise<string[]> => {
    const result = await query<Brand>('SELECT name FROM brand');

    return result.rows.map((i) => i.name);
  };

  getBrandById = async (id: number): Promise<Brand | null> => {
    const result = await query<Brand>('SELECT * FROM brand WHERE id = $1', [
      id,
    ]);

    return result.rowCount ? result.rows[0] : null;
  };

  findBrandIdByName = async (name: string): Promise<null | number> => {
    try {
      const result = await query<Brand>(
        'SELECT id FROM brand WHERE name = $1',
        [name]
      );
      const brand = result.rows[0];
      return brand ? brand.id : null;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  };
}

export default new BrandService();
