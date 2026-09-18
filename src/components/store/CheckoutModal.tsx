import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  Building2Icon,
  CheckIcon,
  CopyIcon,
  CreditCardIcon,
  InfoIcon,
  Loader2Icon,
  LockIcon,
  MailIcon,
  MapPinIcon,
  MinusIcon,
  PhoneIcon,
  PlusIcon,
  ShoppingBagIcon,
  StoreIcon,
  TrashIcon,
  TruckIcon,
  UserIcon,
  XIcon,
} from 'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { useSettings } from '../../contexts/SettingsContext';
import { PaymentMethodId } from '../../types';
import { formatPrice } from '../../utils/currency';
import {
  CabalMark,
  CashMark,
  MastercardMark,
  NaranjaMark,
  PosnetMark,
  VisaMark,
} from '../PaymentMarks';

type Status = 'idle' | 'processing' | 'success';
type Step = 1 | 2 | 3;

interface ShippingOption {
  id: 'delivery' | 'pickup';
  title: string;
  detail: string;
  cost: number;
  freeThreshold?: number;
}

function detectCardBrand(number: string): 'visa' | 'mastercard' | 'naranja' | 'cabal' | 'generic' {
  const clean = number.replace(/\s+/g, '');
  if (/^4/.test(clean)) return 'visa';
  if (/^(5[1-5]|2[2-7])/.test(clean)) return 'mastercard';
  if (/^(5895|5896|6011|622|64|65)/.test(clean) || clean.startsWith('58')) return 'naranja';
  if (/^(6042|6043|6044|5896)/.test(clean)) return 'cabal';
  return 'generic';
}

function calculateShippingRate(cp: string, subtotal: number): ShippingOption[] {
  const cleanCp = cp.trim().replace(/\D/g, '');
  const numCp = parseInt(cleanCp, 10);

  // Por defecto si es gratis por superar $1.000.000
  const isFreeOverMillion = subtotal >= 1000000;

  let deliveryCost = 38000;
  let zoneName = 'Envío Nacional Especializado';
  let deliveryTime = '15 a 20 días hábiles';

  if (!cleanCp) {
    deliveryCost = 38000;
    zoneName = 'Flete con instalación';
    deliveryTime = '15 días hábiles';
  } else if (numCp >= 5560 && numCp <= 5570) {
    // Valle de Uco (San Carlos, La Consulta, Tunuyán, Tupungato)
    deliveryCost = isFreeOverMillion ? 0 : 18000;
    zoneName = 'Valle de Uco (Zona Taller propio)';
    deliveryTime = '5 a 7 días hábiles';
  } else if (numCp >= 5500 && numCp <= 5539) {
    // Gran Mendoza
    deliveryCost = isFreeOverMillion ? 0 : 28000;
    zoneName = 'Gran Mendoza y alrededores';
    deliveryTime = '10 a 12 días hábiles';
  } else {
    // Resto del país
    deliveryCost = isFreeOverMillion ? 0 : 45000;
    zoneName = 'Envío a todo el país';
    deliveryTime = '15 a 20 días hábiles';
  }

  if (isFreeOverMillion) {
    deliveryCost = 0;
  }

  return [
    {
      id: 'delivery',
      title: 'Envío a domicilio con instalación',
      detail: `${zoneName} · ${deliveryTime}`,
      cost: deliveryCost,
    },
    {
      id: 'pickup',
      title: 'Retiro en Showroom (La Consulta)',
      detail: 'San Martín 186 · Sin costo de flete · Listo en 15 días',
      cost: 0,
    },
  ];
}

export function CheckoutModal() {
  const {
    lines,
    subtotal,
    itemCount,
    isCheckoutOpen,
    closeCheckout,
    setQuantity,
    removeItem,
    clearCart,
  } = useCart();

  const { settings, isVisaMasterPromoActiveToday, getTodayDayName } = useSettings();

  // Stepper state
  const [currentStep, setCurrentStep] = useState<Step>(1);

  // Paso 1: Envío y CP
  const [customerEmail, setCustomerEmail] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [selectedShippingId, setSelectedShippingId] = useState<'delivery' | 'pickup'>('delivery');

  // Paso 2: Destinatario y Dirección
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [customerFloor, setCustomerFloor] = useState('');
  const [customerCity, setCustomerCity] = useState('');

  // Paso 3: Pago
  const [method, setMethod] = useState<PaymentMethodId>('card');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [cardDni, setCardDni] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [installments, setInstallments] = useState<number>(3);

  // Estado general
  const [status, setStatus] = useState<Status>('idle');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [orderNumber, setOrderNumber] = useState('');

  const isVisaMasterActive = isVisaMasterPromoActiveToday();
  const todayName = getTodayDayName();

  // Bloqueo de scroll del fondo cuando el modal está abierto
  useEffect(() => {
    if (!isCheckoutOpen) {
      setStatus('idle');
      setCurrentStep(1);
      document.body.style.overflow = '';
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeCheckout();
    }
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [isCheckoutOpen, closeCheckout]);

  // Opciones de envío calculadas
  const shippingOptions = calculateShippingRate(postalCode, subtotal);
  const activeShipping = shippingOptions.find((opt) => opt.id === selectedShippingId) || shippingOptions[0];
  const shippingCost = activeShipping.cost;

  const discount =
    method === 'transfer'
      ? Math.round(subtotal * (settings.transferDiscountPercentage / 100))
      : 0;
  const total = Math.max(0, subtotal + shippingCost - discount);

  const cardBrand = detectCardBrand(cardNumber);

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  // Validaciones por paso
  const isStep1Valid = customerEmail.includes('@') && customerEmail.includes('.');
  const isStep2Valid =
    customerName.trim().length >= 3 &&
    customerPhone.trim().length >= 6 &&
    (selectedShippingId === 'pickup' || customerAddress.trim().length >= 4);

  const goToStep = (step: Step) => {
    if (step === 2 && !isStep1Valid) return;
    if (step === 3 && (!isStep1Valid || !isStep2Valid)) return;
    setCurrentStep(step);
  };

  function handlePay() {
    setStatus('processing');
    const newOrderNum = `SC-${Math.floor(100000 + Math.random() * 900000)}`;
    setOrderNumber(newOrderNum);
    window.setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 1500);
  }

  const installmentAmount = Math.round(total / installments);

  return (
    <AnimatePresence>
      {isCheckoutOpen && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4 lg:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="checkout-title"
        >
          <motion.div
            className="absolute inset-0 bg-charcoal/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            onClick={closeCheckout}
          />

          <motion.div
            className="relative flex max-h-[95vh] w-full max-w-6xl flex-col overflow-hidden rounded-t-4xl bg-white shadow-lift sm:rounded-3xl"
            initial={{ opacity: 0, scale: 0.98, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 20 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-sand-200 px-6 py-4 sm:px-8 bg-white z-10">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sand-100 text-charcoal">
                  <ShoppingBagIcon className="h-5 w-5" />
                </div>
                <div>
                  <h2
                    id="checkout-title"
                    className="text-lg sm:text-xl font-semibold tracking-tight text-charcoal"
                  >
                    {status === 'success' ? '¡Compra Exitosa!' : 'Checkout San Cayetano'}
                  </h2>
                  <p className="text-xs text-charcoal-400">
                    Muebles de madera maciza · Pago seguro con Posnet y garantía de fábrica
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={closeCheckout}
                className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-400 transition-colors hover:bg-sand-100 hover:text-charcoal"
                aria-label="Cerrar modal"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>

            {/* Success State */}
            {status === 'success' ? (
              <div className="flex flex-col items-center px-6 py-14 text-center sm:px-12 max-w-2xl mx-auto">
                <span className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                  <CheckIcon className="h-8 w-8 stroke-[2.5]" />
                </span>
                <h3 className="mt-5 text-2xl font-bold tracking-tight text-charcoal">
                  {method === 'card'
                    ? '¡Pago aprobado con Posnet!'
                    : method === 'transfer'
                    ? '¡Pedido registrado con éxito!'
                    : '¡Reserva confirmada en showroom!'}
                </h3>
                <p className="mt-1 text-sm font-semibold text-terracotta">
                  Orden #{orderNumber}
                </p>

                <div className="mt-5 w-full rounded-2xl bg-sand-50 p-5 text-left text-sm text-charcoal-600 border border-sand-200 space-y-3">
                  <div className="flex items-start gap-2.5">
                    <MailIcon className="h-4 w-4 text-terracotta mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">
                        Comprobante enviado por email
                      </p>
                      <p className="text-xs text-charcoal-500">
                        Te enviamos la factura y el detalle de tu compra a{' '}
                        <strong className="text-charcoal font-medium">
                          {customerEmail}
                        </strong>.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5 pt-2 border-t border-sand-200">
                    <PhoneIcon className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                    <div>
                      <p className="font-semibold text-charcoal">
                        Coordinación del despacho
                      </p>
                      <p className="text-xs text-charcoal-500">
                        {selectedShippingId === 'delivery'
                          ? `Un asesor te contactará al teléfono ${customerPhone} para coordinar la entrega en ${customerAddress || 'tu domicilio'}${customerCity ? `, ${customerCity}` : ''}.`
                          : 'Tus muebles están reservados. Te esperamos en San Martín 186, La Consulta para retirar y abonar con Posnet.'}
                      </p>
                    </div>
                  </div>

                  {method === 'transfer' && (
                    <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-xs text-emerald-900">
                      <strong>Recordatorio:</strong> Por favor enviá el comprobante de transferencia por WhatsApp al <strong>+54 9 2622 464531</strong> indicando tu número de orden <strong>#{orderNumber}</strong>.
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-8 inline-flex h-12 items-center rounded-full bg-charcoal px-8 text-sm font-semibold text-white transition-colors hover:bg-terracotta"
                >
                  Continuar explorando la tienda
                </button>
              </div>
            ) : (
              /* Two-Column Layout */
              <div className="grid flex-1 overflow-y-auto lg:grid-cols-12">
                {/* Left Side (Columnas 1 a 7): Stepper / Timeline Form */}
                <div className="lg:col-span-7 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-sand-200 overflow-y-auto">
                  <div>
                    {/* TIMELINE / STEPPER VISUAL */}
                    <nav aria-label="Progreso del pedido" className="mb-6">
                      <ol className="flex items-center justify-between w-full">
                        {/* Step 1 Item */}
                        <li className="flex-1">
                          <button
                            type="button"
                            onClick={() => goToStep(1)}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full text-left"
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                currentStep === 1
                                  ? 'bg-terracotta text-white shadow-sm'
                                  : isStep1Valid
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-sand-200 text-charcoal-500'
                              }`}
                            >
                              {isStep1Valid && currentStep > 1 ? (
                                <CheckIcon className="h-4 w-4 stroke-[2.5]" />
                              ) : (
                                '1'
                              )}
                            </span>
                            <div className="min-w-0">
                              <span
                                className={`block text-xs font-bold ${
                                  currentStep === 1
                                    ? 'text-terracotta'
                                    : 'text-charcoal-700'
                                }`}
                              >
                                Envío & CP
                              </span>
                              <span className="hidden sm:block text-[10px] text-charcoal-400 truncate">
                                Cotizá tu flete
                              </span>
                            </div>
                          </button>
                        </li>

                        {/* Connector 1 */}
                        <li className="w-12 sm:w-16 h-0.5 bg-sand-200 mx-2 -mt-4 sm:mt-0" />

                        {/* Step 2 Item */}
                        <li className="flex-1">
                          <button
                            type="button"
                            onClick={() => goToStep(2)}
                            disabled={!isStep1Valid}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full text-left disabled:opacity-50"
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                currentStep === 2
                                  ? 'bg-terracotta text-white shadow-sm'
                                  : isStep2Valid
                                  ? 'bg-emerald-600 text-white'
                                  : 'bg-sand-200 text-charcoal-500'
                              }`}
                            >
                              {isStep2Valid && currentStep > 2 ? (
                                <CheckIcon className="h-4 w-4 stroke-[2.5]" />
                              ) : (
                                '2'
                              )}
                            </span>
                            <div className="min-w-0">
                              <span
                                className={`block text-xs font-bold ${
                                  currentStep === 2
                                    ? 'text-terracotta'
                                    : 'text-charcoal-700'
                                }`}
                              >
                                Destinatario
                              </span>
                              <span className="hidden sm:block text-[10px] text-charcoal-400 truncate">
                                Datos y entrega
                              </span>
                            </div>
                          </button>
                        </li>

                        {/* Connector 2 */}
                        <li className="w-12 sm:w-16 h-0.5 bg-sand-200 mx-2 -mt-4 sm:mt-0" />

                        {/* Step 3 Item */}
                        <li className="flex-1">
                          <button
                            type="button"
                            onClick={() => goToStep(3)}
                            disabled={!isStep1Valid || !isStep2Valid}
                            className="group flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full text-left disabled:opacity-50"
                          >
                            <span
                              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition-colors ${
                                currentStep === 3
                                  ? 'bg-terracotta text-white shadow-sm'
                                  : 'bg-sand-200 text-charcoal-500'
                              }`}
                            >
                              3
                            </span>
                            <div className="min-w-0">
                              <span
                                className={`block text-xs font-bold ${
                                  currentStep === 3
                                    ? 'text-terracotta'
                                    : 'text-charcoal-700'
                                }`}
                              >
                                Pago Seguro
                              </span>
                              <span className="hidden sm:block text-[10px] text-charcoal-400 truncate">
                                Posnet · 3 cuotas
                              </span>
                            </div>
                          </button>
                        </li>
                      </ol>
                    </nav>

                    {/* CONTENIDO DEL PASO 1: ENVÍO & CÓDIGO POSTAL */}
                    {currentStep === 1 && (
                      <div className="space-y-5 animate-fade-in">
                        <div>
                          <h3 className="text-base font-bold text-charcoal">
                            1. Ingresá tu email y calculá el costo de envío
                          </h3>
                          <p className="text-xs text-charcoal-500 mt-0.5">
                            Cotizá el flete oficial de San Cayetano Muebles para tu zona con instalación incluida.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                              Correo electrónico <span className="text-terracotta">*</span>
                            </label>
                            <div className="relative">
                              <MailIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                              <input
                                type="email"
                                required
                                value={customerEmail}
                                onChange={(e) => setCustomerEmail(e.target.value)}
                                placeholder="tuemail@ejemplo.com"
                                className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 pl-9 pr-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                              />
                            </div>
                            <span className="text-[10px] text-charcoal-400 mt-1 block">
                              Te enviaremos el comprobante y la factura a esta dirección.
                            </span>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                              Código Postal (CP)
                            </label>
                            <div className="relative">
                              <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                              <input
                                type="text"
                                maxLength={6}
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value.replace(/\D/g, ''))}
                                placeholder="Ej: 5569 o 5500"
                                className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 pl-9 pr-3 text-xs font-mono text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                              />
                            </div>
                            <span className="text-[10px] text-charcoal-400 mt-1 block">
                              Ejemplos: 5569 (La Consulta), 5500 (Mendoza), 1414 (CABA).
                            </span>
                          </div>
                        </div>

                        {/* Opciones de Envío Calculadas */}
                        <div>
                          <label className="block text-xs font-semibold text-charcoal-700 mb-2">
                            Seleccioná la modalidad de entrega:
                          </label>

                          <div className="space-y-2.5">
                            {shippingOptions.map((option) => {
                              const isSelected = selectedShippingId === option.id;
                              return (
                                <label
                                  key={option.id}
                                  className={`flex cursor-pointer items-center justify-between p-4 rounded-2xl border transition-all ${
                                    isSelected
                                      ? 'border-terracotta bg-terracotta-50/40 ring-1 ring-terracotta shadow-xs'
                                      : 'border-sand-200 bg-white hover:border-sand-300'
                                  }`}
                                >
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="radio"
                                      name="shipping-option"
                                      value={option.id}
                                      checked={isSelected}
                                      onChange={() => setSelectedShippingId(option.id)}
                                      className="text-terracotta focus:ring-terracotta"
                                    />
                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sand-100 text-charcoal">
                                      {option.id === 'delivery' ? (
                                        <TruckIcon className="h-4 w-4" />
                                      ) : (
                                        <StoreIcon className="h-4 w-4" />
                                      )}
                                    </div>
                                    <div>
                                      <p className="text-xs font-bold text-charcoal">
                                        {option.title}
                                      </p>
                                      <p className="text-[11px] text-charcoal-500">
                                        {option.detail}
                                      </p>
                                    </div>
                                  </div>
                                  <div className="text-right">
                                    <span
                                      className={`text-xs font-bold ${
                                        option.cost === 0
                                          ? 'text-emerald-700'
                                          : 'text-charcoal'
                                      }`}
                                    >
                                      {option.cost === 0 ? '¡Gratis!' : formatPrice(option.cost)}
                                    </span>
                                  </div>
                                </label>
                              );
                            })}
                          </div>

                          {subtotal >= 1000000 && (
                            <div className="mt-3 flex items-center gap-2 rounded-xl bg-emerald-50 border border-emerald-200 p-2.5 text-xs text-emerald-900 font-medium">
                              <CheckIcon className="h-4 w-4 text-emerald-700 shrink-0" />
                              <span>¡Tu compra supera $1.000.000! Tenés envío e instalación gratis a todo el país.</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CONTENIDO DEL PASO 2: DESTINATARIO Y DOMICILIO */}
                    {currentStep === 2 && (
                      <div className="space-y-5 animate-fade-in">
                        <div>
                          <h3 className="text-base font-bold text-charcoal">
                            2. Datos de quién recibe y dirección de entrega
                          </h3>
                          <p className="text-xs text-charcoal-500 mt-0.5">
                            El chofer del flete se comunicará a este teléfono antes de llegar con los muebles.
                          </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                              Nombre y Apellido <span className="text-terracotta">*</span>
                            </label>
                            <div className="relative">
                              <UserIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                              <input
                                type="text"
                                required
                                value={customerName}
                                onChange={(e) => setCustomerName(e.target.value)}
                                placeholder="Nombre completo"
                                className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 pl-9 pr-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          <div>
                            <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                              Teléfono / WhatsApp <span className="text-terracotta">*</span>
                            </label>
                            <div className="relative">
                              <PhoneIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                              <input
                                type="tel"
                                required
                                value={customerPhone}
                                onChange={(e) => setCustomerPhone(e.target.value)}
                                placeholder="Ej: 2622 464531"
                                className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 pl-9 pr-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                              />
                            </div>
                          </div>

                          {selectedShippingId === 'delivery' ? (
                            <>
                              <div className="sm:col-span-2">
                                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                                  Dirección exacta (Calle y Número) <span className="text-terracotta">*</span>
                                </label>
                                <div className="relative">
                                  <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400" />
                                  <input
                                    type="text"
                                    required
                                    value={customerAddress}
                                    onChange={(e) => setCustomerAddress(e.target.value)}
                                    placeholder="Ej: Av. San Martín 450"
                                    className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 pl-9 pr-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                                  />
                                </div>
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                                  Piso / Departamento / Timbre (Opcional)
                                </label>
                                <input
                                  type="text"
                                  value={customerFloor}
                                  onChange={(e) => setCustomerFloor(e.target.value)}
                                  placeholder="Ej: Piso 2, Dpto B"
                                  className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                                />
                              </div>

                              <div>
                                <label className="block text-xs font-semibold text-charcoal-700 mb-1">
                                  Ciudad / Localidad
                                </label>
                                <input
                                  type="text"
                                  value={customerCity}
                                  onChange={(e) => setCustomerCity(e.target.value)}
                                  placeholder="Ej: San Carlos, Mendoza"
                                  className="h-11 w-full rounded-xl border border-sand-200 bg-sand-50 px-3 text-xs text-charcoal placeholder:text-charcoal-400 focus:border-terracotta focus:bg-white focus:outline-none"
                                />
                              </div>
                            </>
                          ) : (
                            <div className="sm:col-span-2 rounded-2xl border border-sand-200 bg-sand-50 p-4 text-xs text-charcoal-600 space-y-1.5">
                              <p className="font-semibold text-charcoal flex items-center gap-2">
                                <StoreIcon className="h-4 w-4 text-terracotta" />
                                Retiro programado en Showroom
                              </p>
                              <p>
                                San Martín 186, La Consulta, Mendoza.
                              </p>
                              <p className="text-[11px] text-charcoal-400">
                                Horario: Lunes a Sábados de 9 a 19 h. Te avisaremos por WhatsApp cuando tus piezas estén embaladas.
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* CONTENIDO DEL PASO 3: PAGO SEGURO */}
                    {currentStep === 3 && (
                      <div className="space-y-5 animate-fade-in">
                        <div>
                          <h3 className="text-base font-bold text-charcoal">
                            3. Elegí tu medio de pago con Posnet o Transferencia
                          </h3>
                          <p className="text-xs text-charcoal-500 mt-0.5">
                            Transacción encriptada con tecnología bancaria Fiserv 3D Secure.
                          </p>
                        </div>

                        {/* Opciones de Medios de Pago */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setMethod('card')}
                            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                              method === 'card'
                                ? 'border-terracotta bg-terracotta-50/30 ring-2 ring-terracotta shadow-xs'
                                : 'border-sand-200 bg-white hover:border-sand-300'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1.5">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                                  method === 'card'
                                    ? 'bg-terracotta text-white'
                                    : 'bg-sand-100 text-charcoal-500'
                                }`}
                              >
                                <CreditCardIcon className="h-4 w-4" />
                              </span>
                              <span className="rounded-full bg-terracotta-100 px-2 py-0.5 text-[10px] font-bold text-terracotta">
                                3 Cuotas
                              </span>
                            </div>
                            <span className="text-xs font-bold text-charcoal">
                              Tarjeta de Crédito / Débito
                            </span>
                            <span className="text-[11px] text-charcoal-500">
                              Posnet · Hasta 3 cuotas sin interés
                            </span>
                          </button>

                          <button
                            type="button"
                            onClick={() => setMethod('transfer')}
                            className={`flex flex-col text-left p-3.5 rounded-2xl border transition-all ${
                              method === 'transfer'
                                ? 'border-emerald-600 bg-emerald-50/40 ring-2 ring-emerald-600 shadow-xs'
                                : 'border-sand-200 bg-white hover:border-sand-300'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1.5">
                              <span
                                className={`flex h-8 w-8 items-center justify-center rounded-xl ${
                                  method === 'transfer'
                                    ? 'bg-emerald-600 text-white'
                                    : 'bg-sand-100 text-charcoal-500'
                                }`}
                              >
                                <Building2Icon className="h-4 w-4" />
                              </span>
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800">
                                {settings.transferDiscountPercentage}% OFF
                              </span>
                            </div>
                            <span className="text-xs font-bold text-charcoal">
                              Transferencia Bancaria
                            </span>
                            <span className="text-[11px] text-charcoal-500">
                              {settings.transferDiscountPercentage}% de descuento directo
                            </span>
                          </button>
                        </div>

                        {/* FORMULARIO DE TARJETA POSNET */}
                        {method === 'card' && (
                          <div className="rounded-2xl border border-sand-200 bg-sand-50/50 p-4 sm:p-5 space-y-3.5">
                            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-sand-200 pb-2.5">
                              <span className="text-xs font-semibold text-charcoal">
                                Datos de la tarjeta
                              </span>
                              <div className="flex items-center gap-1.5">
                                {cardBrand === 'visa' && <VisaMark className="h-6 w-10 text-xs" />}
                                {cardBrand === 'mastercard' && <MastercardMark className="h-6 w-10" />}
                                {cardBrand === 'naranja' && <NaranjaMark className="h-6 scale-90" />}
                                {cardBrand === 'cabal' && <CabalMark className="h-6 text-xs" />}
                                {cardBrand === 'generic' && (
                                  <span className="text-[11px] text-charcoal-400">
                                    Visa · Master · Naranja X · Cabal
                                  </span>
                                )}
                              </div>
                            </div>

                            <div>
                              <label className="block text-xs font-medium text-charcoal-600 mb-1">
                                Número de tarjeta
                              </label>
                              <input
                                type="text"
                                value={cardNumber}
                                onChange={handleCardNumberChange}
                                placeholder="4500 0000 0000 0000"
                                maxLength={19}
                                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm font-mono tracking-wider text-charcoal placeholder:text-charcoal-300 focus:border-terracotta focus:outline-none"
                              />
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-charcoal-600 mb-1">
                                  Nombre del titular
                                </label>
                                <input
                                  type="text"
                                  value={cardHolder}
                                  onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                                  placeholder="COMO FIGURA EN EL PLÁSTICO"
                                  className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-xs uppercase text-charcoal placeholder:text-charcoal-300 focus:border-terracotta focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-charcoal-600 mb-1">
                                  DNI del titular
                                </label>
                                <input
                                  type="text"
                                  value={cardDni}
                                  onChange={(e) => setCardDni(e.target.value.replace(/\D/g, ''))}
                                  placeholder="Sin puntos"
                                  maxLength={9}
                                  className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-xs text-charcoal placeholder:text-charcoal-300 focus:border-terracotta focus:outline-none"
                                />
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                              <div>
                                <label className="block text-xs font-medium text-charcoal-600 mb-1">
                                  Vencimiento
                                </label>
                                <input
                                  type="text"
                                  value={cardExpiry}
                                  onChange={handleExpiryChange}
                                  placeholder="MM/AA"
                                  maxLength={5}
                                  className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-xs font-mono text-charcoal placeholder:text-charcoal-300 focus:border-terracotta focus:outline-none"
                                />
                              </div>
                              <div>
                                <label className="block text-xs font-medium text-charcoal-600 mb-1">
                                  Cód. de seguridad (CVV)
                                </label>
                                <input
                                  type="password"
                                  value={cardCvv}
                                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                  placeholder="123"
                                  maxLength={4}
                                  className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-xs font-mono text-charcoal placeholder:text-charcoal-300 focus:border-terracotta focus:outline-none"
                                />
                              </div>
                            </div>

                            {/* Selector de cuotas */}
                            <div className="pt-2 border-t border-sand-200">
                              <label className="block text-xs font-semibold text-charcoal mb-2">
                                Plan de cuotas Posnet:
                              </label>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                <label
                                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-xs transition-colors ${
                                    installments === 1
                                      ? 'border-terracotta bg-white text-charcoal font-semibold shadow-xs ring-1 ring-terracotta'
                                      : 'border-sand-200 bg-white/70 hover:bg-white text-charcoal-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="installments"
                                      checked={installments === 1}
                                      onChange={() => setInstallments(1)}
                                      className="text-terracotta focus:ring-terracotta"
                                    />
                                    <span>1 pago</span>
                                  </div>
                                  <span>{formatPrice(total)}</span>
                                </label>

                                <label
                                  className={`flex cursor-pointer items-center justify-between rounded-xl border p-2.5 text-xs transition-colors ${
                                    installments === 3
                                      ? 'border-terracotta bg-white text-charcoal font-semibold shadow-xs ring-1 ring-terracotta'
                                      : 'border-sand-200 bg-white/70 hover:bg-white text-charcoal-600'
                                  }`}
                                >
                                  <div className="flex items-center gap-2">
                                    <input
                                      type="radio"
                                      name="installments"
                                      checked={installments === 3}
                                      onChange={() => setInstallments(3)}
                                      className="text-terracotta focus:ring-terracotta"
                                    />
                                    <div>
                                      <span className="block font-bold text-terracotta">
                                        3 cuotas sin interés
                                      </span>
                                      <span className="block text-[10px] text-charcoal-400">
                                        {cardBrand === 'naranja'
                                          ? 'Plan Z (Naranja X)'
                                          : isVisaMasterActive
                                          ? `¡Hoy activo (${todayName})!`
                                          : 'Mié y Sáb (Visa/Master)'}
                                      </span>
                                    </div>
                                  </div>
                                  <span className="font-bold text-terracotta">
                                    3 de {formatPrice(installmentAmount)}
                                  </span>
                                </label>
                              </div>
                            </div>
                          </div>
                        )}

                        {/* DETALLE PARA TRANSFERENCIA */}
                        {method === 'transfer' && (
                          <div className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-4 sm:p-5 space-y-3">
                            <div className="flex items-center gap-2 text-emerald-900 text-xs font-semibold">
                              <InfoIcon className="h-4 w-4 shrink-0 text-emerald-700" />
                              <span>
                                Datos de la cuenta bancaria para transferir (con {settings.transferDiscountPercentage}% OFF aplicado)
                              </span>
                            </div>
                            <div className="bg-white rounded-xl border border-emerald-100 p-3.5 space-y-2.5 text-xs">
                              <div className="flex justify-between">
                                <span className="text-charcoal-400">Banco:</span>
                                <span className="font-semibold text-charcoal">{settings.bankInfo.bankName}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-charcoal-400">Titular:</span>
                                <span className="font-semibold text-charcoal">{settings.bankInfo.accountHolder}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-charcoal-400">CUIT:</span>
                                <span className="font-semibold text-charcoal">{settings.bankInfo.cuit}</span>
                              </div>
                              <div className="flex items-center justify-between border-t border-sand-100 pt-2">
                                <div>
                                  <span className="text-charcoal-400 block text-[11px]">Alias:</span>
                                  <span className="font-mono font-bold text-charcoal text-sm">{settings.bankInfo.alias}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(settings.bankInfo.alias, 'alias')}
                                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100"
                                >
                                  <CopyIcon className="h-3.5 w-3.5" />
                                  {copiedField === 'alias' ? '¡Copiado!' : 'Copiar'}
                                </button>
                              </div>
                              <div className="flex items-center justify-between border-t border-sand-100 pt-2">
                                <div>
                                  <span className="text-charcoal-400 block text-[11px]">CBU:</span>
                                  <span className="font-mono text-xs text-charcoal">{settings.bankInfo.cbu}</span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => handleCopy(settings.bankInfo.cbu, 'cbu')}
                                  className="inline-flex items-center gap-1 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-800 hover:bg-emerald-100"
                                >
                                  <CopyIcon className="h-3.5 w-3.5" />
                                  {copiedField === 'cbu' ? '¡Copiado!' : 'Copiar'}
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* BOTONES DE NAVEGACIÓN DEL STEPPER */}
                  <div className="pt-6 mt-6 border-t border-sand-200 flex items-center justify-between gap-3">
                    {currentStep > 1 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => (prev - 1) as Step)}
                        className="inline-flex items-center gap-2 rounded-full border border-sand-300 px-5 py-2.5 text-xs font-semibold text-charcoal hover:bg-sand-100"
                      >
                        <ArrowLeftIcon className="h-3.5 w-3.5" />
                        Volver
                      </button>
                    ) : (
                      <span />
                    )}

                    {currentStep < 3 ? (
                      <button
                        type="button"
                        onClick={() => setCurrentStep((prev) => (prev + 1) as Step)}
                        disabled={currentStep === 1 ? !isStep1Valid : !isStep2Valid}
                        className="inline-flex items-center gap-2 rounded-full bg-terracotta px-6 py-2.5 text-xs font-semibold text-white shadow-soft transition-colors hover:bg-terracotta-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Continuar
                        <ArrowRightIcon className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePay}
                        disabled={lines.length === 0 || status === 'processing'}
                        className="inline-flex items-center gap-2 rounded-full bg-charcoal px-7 py-3 text-xs font-semibold text-white shadow-soft transition-colors hover:bg-terracotta disabled:opacity-50"
                      >
                        {status === 'processing' ? (
                          <>
                            <Loader2Icon className="h-4 w-4 animate-spin" />
                            Procesando…
                          </>
                        ) : method === 'card' ? (
                          `Pagar ${formatPrice(total)} con Posnet`
                        ) : (
                          `Confirmar Pedido (${formatPrice(total)})`
                        )}
                      </button>
                    )}
                  </div>
                </div>

                {/* Right Side (Columnas 8 a 12): Resumen Dinámico del Pedido */}
                <div className="lg:col-span-5 bg-sand-50/70 p-6 sm:p-8 flex flex-col justify-between">
                  <div>
                    <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal flex items-center justify-between">
                      <span>Resumen de Compra</span>
                      <span className="text-xs font-normal text-charcoal-500">
                        {itemCount} {itemCount === 1 ? 'pieza' : 'piezas'}
                      </span>
                    </h3>

                    {/* Lista de productos en el carrito */}
                    <div className="mt-4 max-h-[200px] overflow-y-auto divide-y divide-sand-200 pr-1">
                      {lines.map(({ product, quantity }) => (
                        <div key={product.id} className="py-2.5 first:pt-0 flex items-center gap-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-12 w-12 rounded-xl object-cover bg-sand-200 shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-xs font-semibold text-charcoal">
                              {product.name}
                            </p>
                            <div className="flex items-center gap-2 mt-0.5">
                              <button
                                type="button"
                                onClick={() => setQuantity(product.id, quantity - 1)}
                                className="h-4 w-4 flex items-center justify-center rounded bg-sand-200 text-charcoal hover:bg-sand-300 text-[10px]"
                              >
                                -
                              </button>
                              <span className="text-xs font-semibold text-charcoal">{quantity}</span>
                              <button
                                type="button"
                                onClick={() => setQuantity(product.id, quantity + 1)}
                                className="h-4 w-4 flex items-center justify-center rounded bg-sand-200 text-charcoal hover:bg-sand-300 text-[10px]"
                              >
                                +
                              </button>
                              <button
                                type="button"
                                onClick={() => removeItem(product.id)}
                                className="ml-auto text-[10px] text-charcoal-400 hover:text-terracotta"
                              >
                                <TrashIcon className="h-3 w-3" />
                              </button>
                            </div>
                          </div>
                          <span className="text-xs font-bold text-charcoal shrink-0">
                            {formatPrice(product.price * quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Desglose de Precios */}
                    <dl className="mt-5 space-y-2 border-t border-sand-200 pt-3.5 text-xs">
                      <div className="flex justify-between">
                        <dt className="text-charcoal-500">Subtotal</dt>
                        <dd className="font-semibold text-charcoal">{formatPrice(subtotal)}</dd>
                      </div>

                      <div className="flex justify-between">
                        <dt className="text-charcoal-500">
                          {selectedShippingId === 'delivery'
                            ? `Envío (${activeShipping.detail.split('·')[0].trim()})`
                            : 'Retiro en Showroom'}
                        </dt>
                        <dd className="font-semibold text-charcoal">
                          {shippingCost === 0 ? (
                            <span className="text-emerald-700">Sin cargo</span>
                          ) : (
                            formatPrice(shippingCost)
                          )}
                        </dd>
                      </div>

                      {discount > 0 && (
                        <div className="flex justify-between text-emerald-700 font-semibold">
                          <dt>Descuento Transferencia ({settings.transferDiscountPercentage}%)</dt>
                          <dd>−{formatPrice(discount)}</dd>
                        </div>
                      )}

                      <div className="flex items-baseline justify-between border-t border-sand-200 pt-3 text-sm">
                        <dt className="font-bold text-charcoal">Total final</dt>
                        <dd className="text-xl font-extrabold text-charcoal">
                          {formatPrice(total)}
                        </dd>
                      </div>
                    </dl>

                    {method === 'card' && total > 0 && installments === 3 && (
                      <div className="mt-3 rounded-xl bg-terracotta-50 p-2.5 text-center">
                        <span className="text-xs font-bold text-terracotta">
                          3 cuotas sin interés de {formatPrice(installmentAmount)}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Sellos de seguridad */}
                  <div className="mt-6 pt-4 border-t border-sand-200 space-y-3">
                    <div className="flex items-center justify-center gap-1.5 text-[11px] text-charcoal-400">
                      <LockIcon className="h-3.5 w-3.5 text-emerald-600" />
                      <span>Transacción encriptada con tecnología Fiserv 3DS</span>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-2 pt-1 border-t border-sand-200">
                      <PosnetMark />
                      <NaranjaMark />
                      <VisaMark />
                      <MastercardMark />
                      <CabalMark />
                      <CashMark />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}