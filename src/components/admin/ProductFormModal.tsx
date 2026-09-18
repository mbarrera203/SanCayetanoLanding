import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CheckIcon,
  EyeIcon,
  ImageIcon,
  LayersIcon,
  PackageIcon,
  PlusIcon,
  RulerIcon,
  SparklesIcon,
  TagIcon,
  Trash2Icon,
  XIcon,
} from 'lucide-react';
import { Category, Product } from '../../types';
import { formatInstallments, formatPrice } from '../../utils/currency';

interface ProductFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (productData: Omit<Product, 'id'>, id?: string) => void;
  productToEdit?: Product | null;
  initialProduct?: Product | null;
}

const CATEGORIES: Category[] = [
  'Living',
  'Comedor',
  'Dormitorio',
  'Electro',
  'Colchones',
  'Deco',
];

const WOOD_PRESETS = [
  'Nogal macizo',
  'Roble natural',
  'Paraíso seleccionado',
  'Guatambú macizo',
  'Hierro y Roble',
  'Petiribí',
];

const UPHOLSTERY_PRESETS = [
  'Bouclé avena antimanchas',
  'Lino crudo natural',
  'Pana suave con proceso Teflón',
  'Cuero vacuno curtido vegetal',
  'Sin tapizado',
];

const FINISH_PRESETS = [
  'Aceites naturales de linaza',
  'Laca poliuretánica mate',
  'Cera de abejas artesanal',
  'Lustre nogal oscuro',
];

const PHOTO_PRESETS = [
  { label: 'Aparador Nogal', url: '/c59a83e3-e15f-42ff-994e-c54b37e9b07e.jpg' },
  { label: 'Sofá Bouclé', url: '/31eb8dd6-14ab-4c5f-8b09-92ce8f65ed40.jpg' },
  { label: 'Mesa Roble', url: '/445183ae-ff87-4ea8-9d97-98765de69451.jpg' },
  { label: 'Cama Sierra', url: '/bf494ce8-df99-4fa3-9aad-ce989ecd3f3d.jpg' },
  { label: 'Sillón Nube', url: '/a30b1da9-7a51-41a5-bca6-3e18f240f976.jpg' },
  { label: 'Mesa de Luz', url: '/69f16f4e-13cf-46ad-867b-046d23464363.jpg' },
];

export function ProductFormModal({
  isOpen,
  onClose,
  onSave,
  productToEdit,
  initialProduct,
}: ProductFormModalProps) {
  const currentProduct = productToEdit || initialProduct;
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [category, setCategory] = useState<Category>('Living');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number | ''>(950000);
  const [compareAtPrice, setCompareAtPrice] = useState<number | ''>('');
  const [stock, setStock] = useState<number>(5);
  const [featured, setFeatured] = useState<boolean>(true);
  const [image, setImage] = useState(PHOTO_PRESETS[0].url);

  // Mueblería / Carpintería Specs
  const [width, setWidth] = useState<number | ''>(180);
  const [depth, setDepth] = useState<number | ''>(85);
  const [height, setHeight] = useState<number | ''>(75);
  const [weight, setWeight] = useState<number | ''>(45);
  const [woodType, setWoodType] = useState('Nogal macizo');
  const [upholstery, setUpholstery] = useState('Lino crudo natural');
  const [finish, setFinish] = useState('Aceites naturales de linaza');
  const [capacity, setCapacity] = useState('3 cuerpos');
  const [deliveryTime, setDeliveryTime] = useState('15 días en taller');
  const [features, setFeatures] = useState<string[]>([
    'Madera estacionada en horno propio',
    'Garantía estructural de 5 años',
  ]);
  const [newFeatureInput, setNewFeatureInput] = useState('');

  // Sincronizar si se edita un producto
  useEffect(() => {
    if (currentProduct) {
      setName(currentProduct.name);
      setSku(currentProduct.sku);
      setCategory(currentProduct.category);
      setDescription(currentProduct.description);
      setPrice(currentProduct.price);
      setCompareAtPrice(currentProduct.compareAtPrice || '');
      setStock(currentProduct.stock);
      setFeatured(currentProduct.featured);
      setImage(currentProduct.image);

      setWidth(currentProduct.dimensions?.width || '');
      setDepth(currentProduct.dimensions?.depth || '');
      setHeight(currentProduct.dimensions?.height || '');
      setWeight(currentProduct.weight || '');
      setWoodType(currentProduct.woodType || 'Nogal macizo');
      setUpholstery(currentProduct.upholstery || 'Sin tapizado');
      setFinish(currentProduct.finish || 'Aceites naturales de linaza');
      setCapacity(currentProduct.capacity || '');
      setDeliveryTime(currentProduct.deliveryTime || '15 días en taller');
      setFeatures(currentProduct.features || []);
    } else {
      // Valores por defecto para nueva pieza
      setName('');
      setSku(`SCM-${category.slice(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`);
      setDescription('');
      setPrice(850000);
      setCompareAtPrice('');
      setStock(6);
      setFeatured(true);
      setImage(PHOTO_PRESETS[0].url);
      setWidth(180);
      setDepth(90);
      setHeight(75);
      setWeight(42);
      setWoodType('Nogal macizo');
      setUpholstery('Sin tapizado');
      setFinish('Aceites naturales de linaza');
      setCapacity('');
      setDeliveryTime('15 días en taller');
      setFeatures([
        'Madera secada en horno propio',
        'Garantía estructural de 5 años',
      ]);
    }
  }, [currentProduct, isOpen]);

  // Bloqueo de scroll cuando el modal está abierto
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = '';
      return;
    }
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const handleAddFeature = () => {
    if (newFeatureInput.trim()) {
      setFeatures((prev) => [...prev, newFeatureInput.trim()]);
      setNewFeatureInput('');
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFeatures((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const numericPrice = typeof price === 'number' ? price : 0;
    const numericCompare = typeof compareAtPrice === 'number' ? compareAtPrice : undefined;

    const productPayload: Omit<Product, 'id'> = {
      name: name.trim(),
      sku: sku.trim() || `SCM-${category.slice(0, 3).toUpperCase()}-001`,
      category,
      description: description.trim(),
      price: numericPrice,
      compareAtPrice: numericCompare,
      stock: Number(stock),
      featured,
      image,
      dimensions: {
        width: typeof width === 'number' ? width : undefined,
        depth: typeof depth === 'number' ? depth : undefined,
        height: typeof height === 'number' ? height : undefined,
      },
      weight: typeof weight === 'number' ? weight : undefined,
      woodType: woodType.trim() || undefined,
      upholstery: upholstery.trim() || undefined,
      finish: finish.trim() || undefined,
      capacity: capacity.trim() || undefined,
      deliveryTime: deliveryTime.trim() || undefined,
      features,
    };

    onSave(productPayload, currentProduct?.id);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 lg:p-6"
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          <motion.div
            className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-4xl bg-white shadow-lift sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4 sm:px-8 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-terracotta-50 text-terracotta">
                  <PackageIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-charcoal">
                    {currentProduct ? 'Editar Pieza de Mobiliario' : 'Nueva Pieza de Mobiliario'}
                  </h2>
                  <p className="text-xs text-charcoal-400">
                    Cargá la ficha técnica completa con medidas, madera maciza y acabados para la tienda.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-400 hover:bg-sand-100 hover:text-charcoal"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Modal Body: Form & Live Preview */}
            <form onSubmit={handleSubmit} className="grid flex-1 overflow-y-auto lg:grid-cols-12">
              {/* Left Side: Specialized Inputs (7 Cols) */}
              <div className="lg:col-span-7 p-6 sm:p-8 space-y-6 border-b lg:border-b-0 lg:border-r border-sand-200 overflow-y-auto">
                {/* SECCIÓN 1: DATOS GENERALES */}
                <div className="space-y-3.5">
                  <div className="flex items-center gap-2 border-b border-sand-100 pb-2">
                    <TagIcon className="h-4 w-4 text-terracotta" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      1. Identificación y Categoría
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Nombre de la pieza <span className="text-terracotta">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ej: Mesa Abra 180 cm de Nogal"
                      className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Código SKU
                      </label>
                      <input
                        type="text"
                        value={sku}
                        onChange={(e) => setSku(e.target.value)}
                        placeholder="SCM-COM-014"
                        className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs font-mono text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Categoría
                      </label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value as Category)}
                        className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      >
                        {CATEGORIES.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Descripción de carpintería y estilo
                    </label>
                    <textarea
                      rows={2}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Ej: Nogal macizo con cantos biselados a mano, patas cónicas encastradas para 6 a 8 comensales."
                      className="w-full rounded-xl border border-sand-200 bg-sand-50 p-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                    />
                  </div>
                </div>

                {/* SECCIÓN 2: PRECIOS Y STOCK */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-2 border-b border-sand-100 pb-2">
                    <SparklesIcon className="h-4 w-4 text-terracotta" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      2. Precios, Financiación e Inventario
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Precio de venta ($) <span className="text-terracotta">*</span>
                      </label>
                      <input
                        type="number"
                        required
                        min="0"
                        step="1000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : '')}
                        placeholder="950000"
                        className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs font-semibold text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Precio tachado (Oferta $)
                      </label>
                      <input
                        type="number"
                        min="0"
                        step="1000"
                        value={compareAtPrice}
                        onChange={(e) => setCompareAtPrice(e.target.value ? Number(e.target.value) : '')}
                        placeholder="1150000"
                        className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal-500 focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Stock disponible (unid.)
                      </label>
                      <input
                        type="number"
                        min="0"
                        value={stock}
                        onChange={(e) => setStock(Number(e.target.value))}
                        className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={featured}
                        onChange={(e) => setFeatured(e.target.checked)}
                        className="h-4 w-4 rounded text-terracotta focus:ring-terracotta"
                      />
                      <span className="text-xs font-medium text-charcoal">
                        Mostrar en la colección "Destacados" de portada
                      </span>
                    </label>

                    <div className="flex items-center gap-2">
                      <label className="text-xs text-charcoal-600">Tiempo de taller:</label>
                      <select
                        value={deliveryTime}
                        onChange={(e) => setDeliveryTime(e.target.value)}
                        className="h-8 rounded-lg border border-sand-200 bg-white px-2 text-xs text-charcoal"
                      >
                        <option value="Entrega inmediata">Entrega inmediata</option>
                        <option value="15 días en taller">15 días en taller</option>
                        <option value="30 días a pedido">30 días a pedido</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* SECCIÓN 3: DIMENSIONES & ESPECIFICACIONES DE CARPINTERÍA */}
                <div className="space-y-3.5 pt-2">
                  <div className="flex items-center gap-2 border-b border-sand-100 pb-2">
                    <RulerIcon className="h-4 w-4 text-terracotta" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      3. Medidas y Ficha de Carpintería
                    </h3>
                  </div>

                  {/* Medidas W x D x H */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1.5">
                      Dimensiones (en centímetros)
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] text-charcoal-400 block mb-0.5">Ancho (cm)</span>
                        <input
                          type="number"
                          value={width}
                          onChange={(e) => setWidth(e.target.value ? Number(e.target.value) : '')}
                          placeholder="180"
                          className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal-400 block mb-0.5">Profundidad (cm)</span>
                        <input
                          type="number"
                          value={depth}
                          onChange={(e) => setDepth(e.target.value ? Number(e.target.value) : '')}
                          placeholder="85"
                          className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] text-charcoal-400 block mb-0.5">Altura (cm)</span>
                        <input
                          type="number"
                          value={height}
                          onChange={(e) => setHeight(e.target.value ? Number(e.target.value) : '')}
                          placeholder="75"
                          className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Materiales y Acabados */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Madera / Estructura principal
                      </label>
                      <input
                        type="text"
                        list="wood-presets"
                        value={woodType}
                        onChange={(e) => setWoodType(e.target.value)}
                        placeholder="Nogal macizo"
                        className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                      <datalist id="wood-presets">
                        {WOOD_PRESETS.map((wood) => (
                          <option key={wood} value={wood} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Tapizado / Tela
                      </label>
                      <input
                        type="text"
                        list="upholstery-presets"
                        value={upholstery}
                        onChange={(e) => setUpholstery(e.target.value)}
                        placeholder="Bouclé avena o Lino crudo"
                        className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                      <datalist id="upholstery-presets">
                        {UPHOLSTERY_PRESETS.map((uph) => (
                          <option key={uph} value={uph} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Acabado y Lustre
                      </label>
                      <input
                        type="text"
                        list="finish-presets"
                        value={finish}
                        onChange={(e) => setFinish(e.target.value)}
                        placeholder="Aceites naturales"
                        className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                      <datalist id="finish-presets">
                        {FINISH_PRESETS.map((f) => (
                          <option key={f} value={f} />
                        ))}
                      </datalist>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                        Capacidad / Plazas
                      </label>
                      <input
                        type="text"
                        value={capacity}
                        onChange={(e) => setCapacity(e.target.value)}
                        placeholder="Ej: 3 cuerpos o 6 comensales"
                        className="h-9 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Tags y Atributos especiales */}
                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      Sellos y características especiales
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={newFeatureInput}
                        onChange={(e) => setNewFeatureInput(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            e.preventDefault();
                            handleAddFeature();
                          }
                        }}
                        placeholder="Ej: Canto biselado a mano"
                        className="h-9 flex-1 rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={handleAddFeature}
                        className="h-9 px-3 rounded-xl bg-sand-200 hover:bg-sand-300 text-xs font-semibold text-charcoal flex items-center gap-1"
                      >
                        <PlusIcon className="h-3.5 w-3.5" />
                        Agregar
                      </button>
                    </div>
                    {features.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {features.map((feat, idx) => (
                          <span
                            key={idx}
                            className="inline-flex items-center gap-1 rounded-lg bg-sand-100 px-2 py-0.5 text-[11px] font-medium text-charcoal-700"
                          >
                            {feat}
                            <button
                              type="button"
                              onClick={() => handleRemoveFeature(idx)}
                              className="text-charcoal-400 hover:text-terracotta"
                            >
                              <XIcon className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* SECCIÓN 4: IMAGEN */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center gap-2 border-b border-sand-100 pb-2">
                    <ImageIcon className="h-4 w-4 text-terracotta" />
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal">
                      4. Fotografía de la Pieza
                    </h3>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                      URL de la imagen
                    </label>
                    <input
                      type="text"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                      placeholder="/ruta-o-https://..."
                      className="h-10 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal focus:border-terracotta focus:bg-white focus:outline-none"
                    />
                  </div>

                  <div>
                    <span className="text-[11px] text-charcoal-500 block mb-1.5 font-medium">
                      O elegí una foto del catálogo de carpintería:
                    </span>
                    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                      {PHOTO_PRESETS.map((preset) => (
                        <button
                          key={preset.url}
                          type="button"
                          onClick={() => setImage(preset.url)}
                          className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                            image === preset.url
                              ? 'border-terracotta shadow-xs scale-95'
                              : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={preset.url}
                            alt={preset.label}
                            className="h-full w-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side: Live Card Preview & Action (5 Cols) */}
              <div className="lg:col-span-5 bg-sand-50/70 p-6 sm:p-8 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-charcoal flex items-center gap-1.5">
                      <EyeIcon className="h-4 w-4 text-terracotta" />
                      Vista previa en la Tienda
                    </h3>
                    <span className="text-[10px] text-charcoal-400 font-medium">
                      Así lo verá el comprador
                    </span>
                  </div>

                  {/* LIVE PREVIEW CARD */}
                  <div className="rounded-3xl border border-sand-200 bg-white p-4 shadow-sm space-y-3">
                    <div className="relative aspect-[4/3] rounded-2xl bg-sand-100 overflow-hidden">
                      <img
                        src={image || PHOTO_PRESETS[0].url}
                        alt={name || 'Vista previa'}
                        className="h-full w-full object-cover"
                      />
                      {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                        <span className="absolute left-3 top-3 rounded-full bg-terracotta px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Oferta
                        </span>
                      )}
                      {stock === 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-charcoal px-2.5 py-0.5 text-[10px] font-bold text-white">
                          Sin stock
                        </span>
                      )}
                    </div>

                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold uppercase tracking-wider text-charcoal-400">
                          {category} · {sku}
                        </span>
                        {deliveryTime && (
                          <span className="text-[10px] font-medium text-terracotta bg-terracotta-50 px-2 py-0.5 rounded-full">
                            {deliveryTime}
                          </span>
                        )}
                      </div>

                      <h4 className="mt-1 text-sm font-bold text-charcoal truncate">
                        {name || 'Nombre del mueble'}
                      </h4>

                      <p className="mt-1 text-xs text-charcoal-500 line-clamp-2">
                        {description || 'Descripción detallada de maderas macizas y terminaciones.'}
                      </p>

                      {/* Pill con Medidas y Madera */}
                      <div className="mt-2.5 flex flex-wrap gap-1.5 text-[10px]">
                        {(width || depth || height) && (
                          <span className="rounded-md bg-sand-100 px-2 py-0.5 font-medium text-charcoal-700">
                            📏 {width || '-'}x{depth || '-'}x{height || '-'} cm
                          </span>
                        )}
                        {woodType && (
                          <span className="rounded-md bg-sand-100 px-2 py-0.5 font-medium text-charcoal-700">
                            🌲 {woodType}
                          </span>
                        )}
                      </div>

                      <div className="mt-3 pt-2.5 border-t border-sand-100">
                        <div className="flex items-baseline gap-2">
                          <span className="text-lg font-bold text-charcoal">
                            {formatPrice(Number(price) || 0)}
                          </span>
                          {compareAtPrice && Number(compareAtPrice) > Number(price) && (
                            <span className="text-xs text-charcoal-400 line-through">
                              {formatPrice(Number(compareAtPrice))}
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] font-medium text-terracotta mt-0.5">
                          Hasta {formatInstallments(Number(price) || 0, 3)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Buttons */}
                <div className="mt-6 pt-4 border-t border-sand-200 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    onClick={onClose}
                    className="h-11 px-5 rounded-full border border-sand-300 text-xs font-semibold text-charcoal hover:bg-sand-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="h-11 px-7 rounded-full bg-terracotta text-xs font-semibold text-white shadow-soft transition-colors hover:bg-terracotta-600 flex items-center gap-1.5"
                  >
                    <CheckIcon className="h-4 w-4" />
                    {currentProduct ? 'Guardar Cambios' : 'Publicar en la Tienda'}
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
