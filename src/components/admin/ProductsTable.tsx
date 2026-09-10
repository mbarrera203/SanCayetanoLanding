import React, { useMemo, useState } from 'react';
import { PencilIcon, PlusIcon, SearchIcon, Trash2Icon } from 'lucide-react';
import { products as seedProducts } from '../../data/products';
import { Product } from '../../types';
import { formatPrice } from '../../utils/currency';

function stockLabel(stock: number): {text: string;className: string;} {
  if (stock === 0) {
    return {
      text: 'Sin stock',
      className: 'bg-terracotta-50 text-terracotta'
    };
  }
  if (stock <= 5) {
    return { text: `${stock} u. · bajo`, className: 'bg-[#FDF4E3] text-[#8A5A12]' };
  }
  return { text: `${stock} u.`, className: 'bg-[#EDF6EF] text-[#2F6B41]' };
}

export function ProductsTable() {
  const [rows, setRows] = useState<Product[]>(seedProducts);
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return rows;
    return rows.filter(
      (product) =>
      product.name.toLowerCase().includes(term) ||
      product.sku.toLowerCase().includes(term) ||
      product.category.toLowerCase().includes(term)
    );
  }, [rows, query]);

  return (
    <section
      aria-labelledby="productos-heading"
      className="mt-8 overflow-hidden rounded-3xl border border-sand-200 bg-white">
      
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 px-6 py-5">
        <div>
          <h2
            id="productos-heading"
            className="text-lg font-semibold tracking-tight text-charcoal">
            
            Gestión de productos
          </h2>
          <p className="mt-1 text-sm text-charcoal-500">
            {filtered.length} de {rows.length} piezas publicadas
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <label className="relative">
            <span className="sr-only">Buscar producto</span>
            <SearchIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden="true" />
            
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre o SKU"
              className="h-11 w-56 rounded-full border border-sand-200 bg-sand-50 pl-10 pr-4 text-sm placeholder:text-charcoal-400 focus:border-terracotta-200 focus:bg-white focus:outline-none" />
            
          </label>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-full bg-terracotta px-5 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-terracotta-600">
            
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            Agregar producto
          </button>
        </div>
      </div>

      {filtered.length === 0 ?
      <p className="px-6 py-16 text-center text-sm text-charcoal-500">
          No encontramos productos para “{query}”.
        </p> :

      <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-collapse text-left">
            <caption className="sr-only">
              Listado de productos con stock, precio y acciones
            </caption>
            <thead>
              <tr className="border-b border-sand-200 bg-sand-50">
                <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                
                  Producto
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                
                  Categoría
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                
                  Stock
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                
                  Precio
                </th>
                <th
                scope="col"
                className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100">
              {filtered.map((product) => {
              const stock = stockLabel(product.stock);
              return (
                <tr
                  key={product.id}
                  className="transition-colors duration-150 ease-out hover:bg-sand-50">
                  
                    <th scope="row" className="px-6 py-4 font-normal">
                      <div className="flex items-center gap-4">
                        <img
                        src={product.image}
                        alt=""
                        className="h-14 w-14 shrink-0 rounded-xl bg-sand-100 object-cover" />
                      
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-charcoal">
                            {product.name}
                          </p>
                          <p className="mt-0.5 text-xs text-charcoal-400">
                            {product.sku}
                          </p>
                        </div>
                      </div>
                    </th>
                    <td className="px-6 py-4 text-sm text-charcoal-500">
                      {product.category}
                    </td>
                    <td className="px-6 py-4">
                      <span
                      className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stock.className}`}>
                      
                        {stock.text}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right text-sm font-semibold text-charcoal">
                      {formatPrice(product.price)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                        type="button"
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand-200 text-charcoal-500 transition-colors duration-150 ease-out hover:border-charcoal hover:text-charcoal"
                        aria-label={`Editar ${product.name}`}>
                        
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                        type="button"
                        onClick={() =>
                        setRows((current) =>
                        current.filter((row) => row.id !== product.id)
                        )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-sand-200 text-charcoal-500 transition-colors duration-150 ease-out hover:border-terracotta hover:bg-terracotta-50 hover:text-terracotta"
                        aria-label={`Eliminar ${product.name}`}>
                        
                          <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>);

            })}
            </tbody>
          </table>
        </div>
      }
    </section>);

}