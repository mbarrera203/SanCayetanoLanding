export type Category = 'Living' | 'Comedor' | 'Dormitorio' | 'Electro' | 'Colchones' | 'Deco';

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: Category;
  description: string;
  price: number;
  compareAtPrice?: number;
  stock: number;
  image: string;
  featured: boolean;
}

export interface CartLine {
  product: Product;
  quantity: number;
}

export type PaymentMethodId = 'card' | 'pix' | 'cash';

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  detail: string;
}