import { findBrandIdByName } from '../controllers/brandController';
import { findCategoryIdByName } from '../controllers/categoryController';
import { query } from '../db';
import { Product } from '../db/models/product';

class ProductService {
  getProducts = async (): Promise<Product[]> => {
    try {
      const result = await query<Product>(
        `SELECT p.id, p.title, p.images, p.rating, p.price, b.name AS brand, c.name AS category
        FROM product p
        JOIN brand b ON p.brand_id = b.id
        JOIN category c ON p.category_id = c.id`
      );

      return result.rows;
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  };

  getProductById = async (productId: number): Promise<Product | null> => {
    try {
      const result = await query<Product>(
        `SELECT p.id, p.title, p.images, p.rating, p.price, b.name AS brand, c.name AS category
        FROM product p
        JOIN brand b ON p.brand_id = b.id
        JOIN category c ON p.category_id = c.id WHERE p.id = $1`,
        [productId]
      );
      if (result.rowCount === 0) {
        return null;
      }

      return result.rows[0];
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  };

  createProduct = async (
    title: string,
    images: string[],
    rating: number,
    price: number,
    brand: string,
    category: string
  ): Promise<Product> => {
    try {
      const brandId = await findBrandIdByName(brand);
      const categoryId = await findCategoryIdByName(category);
      const result = await query<Product>(
        'INSERT INTO product (title, images, rating, price, brand_id, category_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id, title, images, rating, price, brand_id, category_id',
        [title, images, rating, price, brandId, categoryId]
      );
      const row = result.rows[0];

      return {
        ...row,
        brand,
        category,
      };
    } catch (err) {
      console.error(err);
      throw new Error('Internal server error');
    }
  };

  updateProduct = async (
    id: number,
    title: string,
    images: string[],
    rating: number,
    price: number,
    brandName: string,
    categoryName: string
  ): Promise<Product> => {
    const brandId = await findBrandIdByName(brandName);
    const categoryId = await findCategoryIdByName(categoryName);
    const result = await query<Product>(
      'UPDATE product SET title = $1, images = $2, rating = $3, price = $4, brand_id = $5, category_id = $6 WHERE id = $7 RETURNING *',
      [title, images, rating, price, brandId, categoryId, id]
    );
    return result.rows[0];
  };

  deleteProduct = async (id: number): Promise<Product> => {
    const result = await query<Product>(
      'DELETE FROM product WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  };
}

export default new ProductService();
