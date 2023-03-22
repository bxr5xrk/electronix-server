import { query } from '../db';
import { Custom, Custom_Product } from '../db/models/custom';
import { calculateTotalPrice } from '../utils';

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
    const pricesWithIds = await this.getProductsByIds(productIds);

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
      'INSERT INTO custom (user_id, totalPrice, address, city) VALUES ($1, $2, $3, $4) RETURNING *',
      [userId, totalPrice, address, city]
    );

    return custom.rows[0];
  };

  getProductsByIds = async (
    productIds: number[]
  ): Promise<{ price: number; id: number }[]> => {
    const productPrices = await query<{ price: number; id: number }>(
      `SELECT price, id FROM product WHERE id = ANY($1)`,
      [productIds]
    );

    return productPrices.rows;
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
