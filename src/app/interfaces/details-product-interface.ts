import { MetaInterface } from './meta-interface';

export interface DetailsProductInterface {
  data: Product;
  meta: MetaInterface;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  rate: number;
  vegetarian: boolean;
  spiciness: number;
  method: string;
  ingredients: string[];

  isUserCreated: boolean;
  key: string | null;
  categoryId: number;
  category: string | null;
  items: unknown[];

  createdAt: string;
  updatedAt: string;
}