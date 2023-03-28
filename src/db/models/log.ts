export interface Log {
  id: string;
  datetime: string;
  action: Action;
  user_id: number;
  product_name: string;
}

export type Action = 'add' | 'remove';
