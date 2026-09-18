import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { products as initialProducts } from '../data/products';
import { Category, Product } from '../types';

interface ProductsContextValue {
  products: Product[];
  featuredProducts: Product[];
  offerProducts: Product[];
  addProduct: (newProduct: Omit<Product, 'id'>) => Product;
  updateProduct: (id: string, updatedFields: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  countByCategory: (category: Category) => number;
  resetToDefaultProducts: () => void;
}

const STORAGE_KEY = 'san_cayetano_products_v3';

// Enriquecemos los productos con especificaciones de retail comercial (Muebles, Electrodomésticos y Tecnología)
const ENRICHED_INITIAL_PRODUCTS: Product[] = initialProducts.map((p) => {
  if (p.id === 'p-sofa-lima') {
    return {
      ...p,
      brand: 'San Cayetano Hogar',
      model: 'Lima 3 Cuerpos',
      material: 'Madera paraíso y tapizado bouclé',
      dimensions: { width: 230, depth: 95, height: 82 },
      upholstery: 'Bouclé avena antimanchas',
      finish: 'Patas de madera lustrada',
      capacity: '3 a 4 cuerpos',
      weight: 58,
      warranty: '12 meses de garantía',
      deliveryTime: 'Entrega inmediata en stock',
      features: ['Almohadones de vellón siliconado de alta densidad', 'Fundas desmontables lavables', 'Estructura reforzada'],
    };
  }
  if (p.id === 'p-mesa-abra') {
    return {
      ...p,
      brand: 'Línea Nórdica',
      model: 'Abra 180',
      material: 'Madera de Paraíso y tapa laqueada',
      dimensions: { width: 180, depth: 90, height: 76 },
      finish: 'Laca poliuretánica mate',
      capacity: '6 a 8 comensales',
      weight: 48,
      warranty: '6 meses de garantía',
      deliveryTime: 'Entrega inmediata en stock',
      features: ['Canto biselado suave', 'Patas cónicas desmontables para fácil traslado', 'Superficie resistente a manchas'],
    };
  }
  if (p.id === 'p-cama-sierra') {
    return {
      ...p,
      brand: 'La Valenziana',
      model: 'Sierra Queen',
      material: 'Madera maciza y lino',
      dimensions: { width: 168, depth: 210, height: 110 },
      upholstery: 'Lino crudo premium',
      capacity: 'Queen (160x200)',
      weight: 65,
      warranty: '12 meses de garantía',
      deliveryTime: 'Envío en 24 a 48 hs',
      features: ['Parrilla reforzada con tirantes centrales', 'Respaldo acolchado capitoné suave', 'Fácil ensamblado con bulonería oculta'],
    };
  }
  if (p.id === 'p-sillon-nube') {
    return {
      ...p,
      brand: 'San Cayetano Hogar',
      model: 'Nube Confort',
      material: 'Espuma de alta densidad y bouclé',
      dimensions: { width: 92, depth: 88, height: 78 },
      upholstery: 'Bouclé crema importado',
      capacity: '1 cuerpo envolvente',
      weight: 22,
      warranty: '12 meses de garantía',
      deliveryTime: 'Entrega inmediata en stock',
      features: ['Diseño ergonómico envolvente', 'Espuma alta densidad 35 kg/m3'],
    };
  }
  if (p.id === 'p-heladera-polar') {
    return {
      ...p,
      brand: 'Whirlpool',
      model: 'French Door No Frost 550 L',
      dimensions: { width: 90, depth: 75, height: 185 },
      capacity: '550 Litros',
      energyEfficiency: 'Clase A+++',
      connectivity: 'Motor Inverter 220V',
      warranty: '12 meses garantía oficial Whirlpool',
      deliveryTime: 'Envío en 24 a 48 hs',
      features: ['Motor Inverter de bajísimo consumo', 'Dispensador exterior de agua filtrada', 'Control digital touch en puerta'],
    };
  }
  if (p.id === 'p-smart-tv-65') {
    return {
      ...p,
      brand: 'Samsung',
      model: 'Crystal UHD 4K 65" Series 8',
      dimensions: { width: 145, depth: 6, height: 83 },
      capacity: '65 Pulgadas',
      energyEfficiency: 'Clase A+',
      connectivity: 'Smart TV Tizen · WiFi dual · Bluetooth 5.2',
      warranty: '12 meses garantía oficial Samsung',
      deliveryTime: 'Entrega inmediata en stock',
      features: ['Resolución 4K Ultra HD (3840 x 2160)', 'HDR10+ y procesador Crystal 4K', 'Comando por voz Bixby y Alexa'],
    };
  }
  if (p.id === 'p-lavarropas-9kg') {
    return {
      ...p,
      brand: 'Drean',
      model: 'Next 8.14 Eco Inverter 9kg',
      dimensions: { width: 60, depth: 55, height: 85 },
      capacity: '9 Kilogramos · 1400 RPM',
      energyEfficiency: 'Clase A+++',
      connectivity: 'Motor Inverter Directo 220V',
      warranty: '12 meses garantía oficial Drean',
      deliveryTime: 'Envío en 24 a 48 hs',
      features: ['14 programas automáticos', 'Centrifugado potente y silencioso', 'Tambor de acero inoxidable con cuidado de prendas'],
    };
  }
  if (p.id === 'p-colchon-serena') {
    return {
      ...p,
      brand: 'Piero',
      model: 'Serena Pocket Pillow Top Queen',
      dimensions: { width: 160, depth: 200, height: 32 },
      capacity: 'Queen (160x200 cm)',
      warranty: '5 años de garantía oficial de fábrica',
      deliveryTime: 'Entrega inmediata en stock',
      features: ['Resortes individuales Pocket independientes', 'Pillow Top europeo de espuma viscoelástica', 'Tejido de punto con tratamiento antiácaros'],
    };
  }
  return p;
});

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

export function ProductsProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // Ignorar error de parsing
    }
    return ENRICHED_INITIAL_PRODUCTS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    } catch {
      // Ignorar error de almacenamiento
    }
  }, [products]);

  const addProduct = (newProductData: Omit<Product, 'id'>): Product => {
    const id = `p-custom-${Date.now()}`;
    const product: Product = {
      ...newProductData,
      id,
    };
    setProducts((prev) => [product, ...prev]);
    return product;
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    );
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const resetToDefaultProducts = () => {
    setProducts(ENRICHED_INITIAL_PRODUCTS);
  };

  const featuredProducts = useMemo(
    () => products.filter((p) => p.featured),
    [products]
  );

  const offerProducts = useMemo(
    () =>
      products.filter(
        (p) => typeof p.compareAtPrice === 'number' && p.compareAtPrice > p.price && p.stock > 0
      ),
    [products]
  );

  const countByCategory = (category: Category): number => {
    return products.filter((p) => p.category === category).length;
  };

  return (
    <ProductsContext.Provider
      value={{
        products,
        featuredProducts,
        offerProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        countByCategory,
        resetToDefaultProducts,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts(): ProductsContextValue {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts must be used within a ProductsProvider');
  }
  return context;
}
