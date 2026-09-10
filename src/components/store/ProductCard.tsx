import React, { useEffect, useRef, useState } from 'react';
import { CheckIcon, PlusIcon } from 'lucide-react';
import { Product } from '../../types';
import { formatPrice } from '../../utils/currency';
import { useCart } from '../../contexts/CartContext';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const timeout = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => window.clearTimeout(timeout.current);
  }, []);

  const isSoldOut = product.stock === 0;

  function handleAdd() {
    addItem(product);
    setJustAdded(true);
    window.clearTimeout(timeout.current);
    timeout.current = window.setTimeout(() => setJustAdded(false), 1600);
  }

  return (
    <article className="group flex h-full flex-col">
      <div className="relative overflow-hidden rounded-3xl bg-sand-100">
        <img
          src={product.image}
          alt={product.name}
          className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-smooth group-hover:scale-[1.03]" />
        
        {product.compareAtPrice &&
        <span className="absolute left-4 top-4 rounded-full bg-terracotta px-3 py-1 text-xs font-semibold text-white">
            Oferta
          </span>
        }
        {isSoldOut &&
        <span className="absolute left-4 top-4 rounded-full bg-charcoal px-3 py-1 text-xs font-semibold text-white">
            Sin stock
          </span>
        }
      </div>

      <div className="flex flex-1 flex-col pt-5">
        <p className="text-xs uppercase tracking-wide text-charcoal-400">
          {product.category}
        </p>
        <h3 className="mt-2 text-lg font-semibold leading-snug text-charcoal">
          {product.name}
        </h3>
        <p className="mt-1.5 text-sm leading-relaxed text-charcoal-500">
          {product.description}
        </p>

        <div className="mt-auto pt-5">
          <div className="flex items-baseline gap-2.5">
            <span className="text-xl font-semibold text-charcoal">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice &&
            <span className="text-sm text-charcoal-400 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            }
          </div>
          <button
            type="button"
            onClick={handleAdd}
            disabled={isSoldOut}
            className={`mt-4 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors duration-150 ease-out ${
            isSoldOut ?
            'cursor-not-allowed border-sand-200 bg-sand-50 text-charcoal-300' :
            justAdded ?
            'border-terracotta bg-terracotta text-white' :
            'border-charcoal bg-white text-charcoal hover:bg-charcoal hover:text-white'}`
            }
            aria-live="polite">
            
            {isSoldOut ?
            'Avisarme' :
            justAdded ?
            <>
                <CheckIcon className="h-4 w-4" aria-hidden="true" />
                Agregado
              </> :

            <>
                <PlusIcon className="h-4 w-4" aria-hidden="true" />
                Agregar al carrito
              </>
            }
          </button>
        </div>
      </div>
    </article>);

}