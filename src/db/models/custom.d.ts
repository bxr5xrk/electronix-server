export interface Custom {
  id: number;
  datetime: string;
  totalPrice: number;
  status: Status;
}

export type Status = 'processing' | 'shipped' | 'delivered';

export interface Custom_Product {
  custom_id: number;
  product_id: number;
}
