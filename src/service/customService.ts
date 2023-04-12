import { Status } from './../db/models/custom.d';
import { query } from '../db';
import { Custom, Custom_Product } from '../db/models/custom';
import { calculateTotalPrice } from '../utils';
import productService from './productService';

class CustomService {
  createCustomProduct = async ({
    userId,
    productIds,
    address,
    city,
  }: {
    userId: number;
    productIds: number[];
    address: string;
    city: string;
  }): Promise<Custom> => {
    const pricesWithIds = await productService.getProductsByIds(productIds);

    const totalPrice = calculateTotalPrice(pricesWithIds, productIds);

    const custom = await this.createCustom({
      userId,
      totalPrice,
      address,
      city,
    });

    for (const id of productIds) {
      await this.addCustomProduct({ custom_id: custom.id, product_id: id });
    }

    return custom;
  };

  createCustom = async ({
    totalPrice,
    userId,
    address,
    city,
  }: {
    totalPrice: number;
    userId: number;
    address: string;
    city: string;
  }): Promise<Custom> => {
    const custom = await query<Custom>(
      'INSERT INTO custom (user_id, totalPrice, address, city, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [userId, totalPrice, address, city, 'processing']
    );

    return custom.rows[0];
  };

  updateCustomStatus = async (customId: number, status: Status) => {
    const custom = await query<Custom>(
      'UPDATE custom SET status = $1 WHERE id = $2 RETURNING *',
      [status, customId]
    );

    return custom.rows[0];
  };

  addCustomProduct = async (customProduct: Custom_Product): Promise<void> => {
    await query(
      'INSERT INTO custom_product (custom_id, product_id) VALUES ($1, $2)',
      [customProduct.custom_id, customProduct.product_id]
    );
  };

  getCustomsByUserId = async (userId: number) => {
    const customs = await query(
      `SELECT
    custom.id,
    custom.datetime,
    custom.totalPrice,
    custom.address,
    custom.city,
    custom.status,
    JSON_AGG(
      JSON_BUILD_OBJECT(
        'id', product.id,
        'title', product.title,
        'price', product.price,
        'rating', product.rating,
        'images', product.images,
        'count', cp.count,
        'brand', brand.name,
        'category', category.name
      )
    ) AS products
  FROM
    custom
    JOIN (
      SELECT
        custom_id,
        product_id,
        COUNT(*) AS count
      FROM
        custom_product
      GROUP BY
        custom_id,
        product_id
    ) AS cp ON custom.id = cp.custom_id
    JOIN product ON cp.product_id = product.id
    JOIN brand ON product.brand_id = brand.id
    JOIN category ON product.category_id = category.id
  WHERE
    custom.user_id = $1
  GROUP BY
    custom.id`,
      [userId]
    );

    return customs.rows;
  };
}

export default new CustomService();
