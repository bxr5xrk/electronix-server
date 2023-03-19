export interface Product {
  id: number;
  title: string;
  images: string[];
  rating: number;
  price: number;
  brand_id: number;
  category_id: number;

  brand?: string;
  category?: string;
}
