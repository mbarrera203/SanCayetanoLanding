export type Category = 'Living' | 'Comedor' | 'Dormitorio' | 'Electro' | 'Tecnologia' | 'Colchones' | 'Deco';

export interface ProductDimensions {
  width?: number; // cm
  depth?: number; // cm
  height?: number; // cm
}

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
  // Atributos de retail (Muebles, Electrodomésticos y Tecnología)
  brand?: string; // ej: 'Samsung', 'Whirlpool', 'Drean', 'Piero', 'La Valenziana'
  model?: string; // ej: 'Crystal UHD 50"', 'Inverter 8kg'
  dimensions?: ProductDimensions;
  weight?: number; // kg
  material?: string; // ej: 'Melamina 18mm reforzada', 'Madera de Paraíso', 'Acero inox'
  woodType?: string; // retrocompatibilidad para materiales
  upholstery?: string; // ej: 'Pana antimanchas', 'Ecocuero', 'Chenille'
  finish?: string; // ej: 'Roble natural', 'Negro satinado', 'Gris plata'
  capacity?: string; // ej: '50 pulgadas', '380 Litros', '8 kg', '3 cuerpos', 'Queen 160x200'
  energyEfficiency?: string; // ej: 'Clase A+++', 'Clase A'
  connectivity?: string; // ej: 'Smart TV Tizen · WiFi · Bluetooth', 'Motor Inverter 220V'
  warranty?: string; // ej: '12 meses oficial', '6 meses oficial'
  deliveryTime?: string; // ej: 'Entrega inmediata', 'Envío en 24-48 hs', 'Por pedido (7 a 10 días)'
  features?: string[];
}


export interface CartLine {
  product: Product;
  quantity: number;
}

export type PaymentMethodId = 'card' | 'transfer' | 'showroom';

export interface PaymentMethod {
  id: PaymentMethodId;
  label: string;
  detail: string;
  badge?: string;
}