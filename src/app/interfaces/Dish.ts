export interface Dish {
  id: number;
  name: string;
  categoryId: number;
  price: number;
  vegetarian: boolean;
  image1: string;
  image2?: string;
  image3?: string;
}