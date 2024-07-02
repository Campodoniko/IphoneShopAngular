export interface Product {
  id: number;
  createdAt: string;
  price: number;
  discount_price: number;
  guarantee: number;
  rating: number;
  count_review: number;
  is_available: boolean;
  store_address: string | null;
  color: string;
  brand: string;
  country: string;
  category: string;
  name: string;
  images: string[];
  characteristics: Characteristic[];
}
export interface Characteristic {
  characteristic: string;
  unit_type: string;
  value: string;
}