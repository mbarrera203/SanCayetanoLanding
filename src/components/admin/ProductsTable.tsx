import React, { useMemo, useState } from 'react';
import {
  AlertTriangleIcon,
  CheckCircle2Icon,
  PencilIcon,
  PlusIcon,
  RotateCcwIcon,
  RulerIcon,
  SearchIcon,
  SparklesIcon,
  Trash2Icon,
} from 'lucide-react';
import { useProducts } from '../../contexts/ProductsContext';
import { Product } from '../../types';
import { formatPrice } from '../../utils/currency';
import { ProductFormModal } from './ProductFormModal';

function stockLabel(stock: number): { text: string; className: string } {
  if (stock === 0) {
    return {
      text: 'Sin stock',
      className: 'bg-terracotta-50 text-terracotta font-medium',
    };
  }
  if (stock <= 5) {
    return { text: `${stock} u. · bajo`, className: 'bg-[#FDF4E3] text-[#8A5A12]' };
  }
  return { text: `${stock} u.`, className: 'bg-[#EDF6EF] text-[#2F6B41]' };
}

export function ProductsTable() {
  const { products, addProduct, updateProduct, deleteProduct, resetToDefaultProducts } = useProducts();
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return products;
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.sku.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term) ||
        (product.woodType && product.woodType.toLowerCase().includes(term))
    );
  }, [products, query]);

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleSave = (productData: Omit<Product, 'id'>) => {
    if (editingProduct) {
      updateProduct(editingProduct.id, productData);
      showFeedback(`"${productData.name}" actualizado con éxito`);
    } else {
      const created = addProduct(productData);
      showFeedback(`"${created.name}" publicado en la tienda con éxito`);
    }
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDelete = (id: string, name: string) => {
    deleteProduct(id);
    setDeleteConfirmId(null);
    showFeedback(`"${name}" fue eliminado del catálogo`);
  };

  const showFeedback = (msg: string) => {
    setFeedbackMsg(msg);
    setTimeout(() => {
      setFeedbackMsg(null);
    }, 4000);
  };

  return (
    <section
      aria-labelledby="productos-heading"
      className="mt-8 overflow-hidden rounded-3xl border border-sand-200 bg-white shadow-sm"
    >
      {/* Toast de confirmación rápida */}
      {feedbackMsg && (
        <div className="flex items-center gap-2 border-b border-emerald-100 bg-emerald-50 px-6 py-2.5 text-xs font-medium text-emerald-800 animate-fadeIn">
          <CheckCircle2Icon className="h-4 w-4 text-emerald-600 shrink-0" />
          <span>{feedbackMsg}</span>
        </div>
      )}

      {/* Header y Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 px-6 py-5">
        <div>
          <div className="flex items-center gap-3">
            <h2
              id="productos-heading"
              className="text-lg font-semibold tracking-tight text-charcoal"
            >
              Catálogo de Muebles y Productos
            </h2>
            <span className="rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-charcoal-700">
              {products.length} piezas
            </span>
          </div>
          <p className="mt-1 text-sm text-charcoal-500">
            {filtered.length} de {products.length} productos visibles en la tienda online
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <label className="relative">
            <span className="sr-only">Buscar producto o material</span>
            <SearchIcon
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar por nombre, SKU o madera..."
              className="h-11 w-64 rounded-full border border-sand-200 bg-sand-50 pl-10 pr-4 text-sm placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none transition-colors"
            />
          </label>

          <button
            type="button"
            onClick={handleOpenCreate}
            className="inline-flex h-11 items-center gap-2 rounded-full bg-terracotta px-5 text-sm font-medium text-white shadow-sm transition-all duration-150 ease-out hover:bg-terracotta-600 hover:shadow"
          >
            <PlusIcon className="h-4 w-4" aria-hidden="true" />
            <span>Agregar producto</span>
          </button>
        </div>
      </div>

      {/* Alerta de confirmación de borrado */}
      {deleteConfirmId && (
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rose-200 bg-rose-50 px-6 py-3 text-xs text-rose-900">
          <div className="flex items-center gap-2">
            <AlertTriangleIcon className="h-4 w-4 text-rose-600 shrink-0" />
            <span>¿Estás seguro de que deseas eliminar este producto permanentemente de la tienda?</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDeleteConfirmId(null)}
              className="rounded-lg border border-sand-200 bg-white px-3 py-1 font-medium text-charcoal-600 hover:bg-sand-50"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={() => {
                const prod = products.find((p) => p.id === deleteConfirmId);
                if (prod) handleDelete(prod.id, prod.name);
              }}
              className="rounded-lg bg-rose-600 px-3 py-1 font-medium text-white hover:bg-rose-700"
            >
              Sí, eliminar
            </button>
          </div>
        </div>
      )}

      {/* Contenido Tabla */}
      {filtered.length === 0 ? (
        <div className="px-6 py-16 text-center">
          <p className="text-sm font-medium text-charcoal-700">
            No encontramos productos para “{query}”.
          </p>
          <p className="mt-1 text-xs text-charcoal-400">
            Probá buscando por categoría, nombre de modelo o tipo de madera.
          </p>
          <button
            type="button"
            onClick={() => setQuery('')}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-sand-200 bg-white px-4 py-1.5 text-xs font-medium text-charcoal hover:bg-sand-50"
          >
            Limpiar búsqueda
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] border-collapse text-left">
            <caption className="sr-only">
              Listado de productos con detalles de carpintería, stock, precio y acciones
            </caption>
            <thead>
              <tr className="border-b border-sand-200 bg-sand-50 text-xs font-semibold uppercase tracking-wider text-charcoal-400">
                <th scope="col" className="px-6 py-3.5">
                  Pieza / Modelo
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Categoría
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Especificaciones Técnicas
                </th>
                <th scope="col" className="px-6 py-3.5">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3.5 text-right">
                  Precio
                </th>
                <th scope="col" className="px-6 py-3.5 text-right">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sand-100 text-sm">
              {filtered.map((product) => {
                const stock = stockLabel(product.stock);
                const hasDimensions =
                  product.dimensions &&
                  (product.dimensions.width > 0 ||
                    product.dimensions.depth > 0 ||
                    product.dimensions.height > 0);

                return (
                  <tr
                    key={product.id}
                    className="transition-colors duration-150 ease-out hover:bg-sand-50/60"
                  >
                    <th scope="row" className="px-6 py-4 font-normal">
                      <div className="flex items-center gap-4">
                        <img
                          src={product.image}
                          alt=""
                          className="h-14 w-14 shrink-0 rounded-xl bg-sand-100 object-cover border border-sand-200"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-sm font-semibold text-charcoal">
                              {product.name}
                            </p>
                            {product.featured && (
                              <span
                                title="Destacado en portada"
                                className="inline-flex items-center rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700"
                              >
                                <SparklesIcon className="mr-0.5 h-2.5 w-2.5" />
                                Destacado
                              </span>
                            )}
                          </div>
                          <p className="mt-0.5 text-xs text-charcoal-400">
                            SKU: {product.sku}
                          </p>
                        </div>
                      </div>
                    </th>

                    <td className="px-6 py-4 text-charcoal-600">
                      <span className="inline-flex items-center rounded-full bg-sand-100 px-2.5 py-0.5 text-xs font-medium text-charcoal-700">
                        {product.category}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="space-y-1">
                        {product.woodType && (
                          <div className="text-xs font-medium text-charcoal-700">
                            🪵 {product.woodType}
                          </div>
                        )}
                        {hasDimensions && product.dimensions && (
                          <div className="inline-flex items-center gap-1 text-xs text-charcoal-500">
                            <RulerIcon className="h-3 w-3 text-charcoal-400 shrink-0" />
                            <span>
                              {product.dimensions.width} × {product.dimensions.depth} × {product.dimensions.height} cm
                            </span>
                          </div>
                        )}
                        {product.deliveryTime && (
                          <div className="text-[11px] text-terracotta font-medium">
                            ⏱️ {product.deliveryTime}
                          </div>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${stock.className}`}
                      >
                        {stock.text}
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right font-medium text-charcoal">
                      <div className="text-sm font-bold text-charcoal">
                        {formatPrice(product.price)}
                      </div>
                      {product.compareAtPrice && (
                        <div className="text-xs text-charcoal-400 line-through">
                          {formatPrice(product.compareAtPrice)}
                        </div>
                      )}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(product)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand-200 text-charcoal-500 transition-colors duration-150 ease-out hover:border-charcoal hover:bg-sand-100 hover:text-charcoal"
                          aria-label={`Editar ${product.name}`}
                          title="Editar especificaciones y precio"
                        >
                          <PencilIcon className="h-4 w-4" aria-hidden="true" />
                        </button>

                        <button
                          type="button"
                          onClick={() => setDeleteConfirmId(product.id)}
                          className="flex h-9 w-9 items-center justify-center rounded-xl border border-sand-200 text-charcoal-500 transition-colors duration-150 ease-out hover:border-terracotta hover:bg-terracotta-50 hover:text-terracotta"
                          aria-label={`Eliminar ${product.name}`}
                          title="Eliminar producto"
                        >
                          <Trash2Icon className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Footer con opción de restaurar muestras si se desea */}
      <div className="flex items-center justify-between border-t border-sand-200 bg-sand-50/50 px-6 py-3.5 text-xs text-charcoal-400">
        <span>Sincronización en tiempo real con la tienda pública</span>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('¿Restablecer el catálogo con las piezas de muestra de carpintería originales?')) {
              resetToDefaultProducts();
              showFeedback('Catálogo restablecido con los muebles de fábrica iniciales');
            }
          }}
          className="inline-flex items-center gap-1.5 text-charcoal-500 hover:text-charcoal transition-colors underline"
        >
          <RotateCcwIcon className="h-3 w-3" />
          Restablecer catálogo inicial
        </button>
      </div>

      {/* Modal de Agregar / Editar Producto con Specs de Carpintería */}
      <ProductFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingProduct(null);
        }}
        onSave={handleSave}
        initialProduct={editingProduct}
      />
    </section>
  );
}