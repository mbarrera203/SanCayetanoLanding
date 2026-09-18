import React from 'react';
import { ArrowRightIcon } from 'lucide-react';
import { useProducts } from '../../contexts/ProductsContext';
import { ProductCard } from './ProductCard';

export function FeaturedProducts() {
  const { featuredProducts } = useProducts();
  return (
    <section
      id="destacados"
      aria-labelledby="destacados-heading"
      className="mx-auto max-w-[1400px] px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
      
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-sand-200 pb-8">
        <div>
          <h2
            id="destacados-heading"
            className="text-3xl font-semibold tracking-tight text-charcoal sm:text-4xl">
            
            Destacados
          </h2>
          <p className="mt-3 max-w-lg text-base text-charcoal-500">
            Las piezas más elegidas de la temporada, listas para entrega en 15
            días.
          </p>
        </div>
        <a
          href="#ofertas"
          className="group inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors duration-150 ease-out hover:text-terracotta">
          
          Ver todo el catálogo
          <ArrowRightIcon
            className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
            aria-hidden="true" />
          
        </a>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
        {featuredProducts.map((product) =>
        <ProductCard key={product.id} product={product} />
        )}
      </div>
    </section>);

}