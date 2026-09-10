import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  BanknoteIcon,
  CheckIcon,
  CreditCardIcon,
  Loader2Icon,
  LockIcon,
  MinusIcon,
  PlusIcon,
  ShoppingBagIcon,
  TrashIcon,
  XIcon,
  ZapIcon } from
'lucide-react';
import { useCart } from '../../contexts/CartContext';
import { PaymentMethod, PaymentMethodId } from '../../types';
import { formatInstallments, formatPrice } from '../../utils/currency';
import { MastercardMark, MercadoPagoMark, VisaMark } from '../PaymentMarks';

const methods: PaymentMethod[] = [
{
  id: 'card',
  label: 'Tarjeta de crédito o débito',
  detail: 'Hasta 12 cuotas sin interés'
},
{ id: 'pix', label: 'Pix', detail: 'Acreditación inmediata, 5% off' },
{
  id: 'cash',
  label: 'Efectivo',
  detail: 'Rapipago, Pago Fácil o en el showroom'
}];


const methodIcons: Record<PaymentMethodId, typeof CreditCardIcon> = {
  card: CreditCardIcon,
  pix: ZapIcon,
  cash: BanknoteIcon
};

type Status = 'idle' | 'processing' | 'success';

export function CheckoutModal() {
  const {
    lines,
    subtotal,
    itemCount,
    isCheckoutOpen,
    closeCheckout,
    setQuantity,
    removeItem,
    clearCart
  } = useCart();
  const [method, setMethod] = useState<PaymentMethodId>('card');
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (!isCheckoutOpen) {
      setStatus('idle');
      return;
    }
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') closeCheckout();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [isCheckoutOpen, closeCheckout]);

  const shipping = subtotal > 1000000 || subtotal === 0 ? 0 : 38000;
  const discount = method === 'pix' ? Math.round(subtotal * 0.05) : 0;
  const total = subtotal + shipping - discount;

  function handlePay() {
    setStatus('processing');
    window.setTimeout(() => {
      setStatus('success');
      clearCart();
    }, 1500);
  }

  return (
    <AnimatePresence>
      {isCheckoutOpen &&
      <div
        className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-6"
        role="dialog"
        aria-modal="true"
        aria-labelledby="checkout-title">
        
          <motion.div
          className="absolute inset-0 bg-charcoal/50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={closeCheckout} />
        
          <motion.div
          className="relative flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-4xl bg-white shadow-lift sm:rounded-4xl"
          initial={{ opacity: 0, scale: 0.97, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97, y: 16 }}
          transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>
          
            <div className="flex items-center justify-between border-b border-sand-200 px-6 py-5 sm:px-8">
              <div>
                <h2
                id="checkout-title"
                className="text-xl font-semibold tracking-tight text-charcoal">
                
                  {status === 'success' ? 'Compra confirmada' : 'Tu carrito'}
                </h2>
                {status !== 'success' &&
              <p className="mt-1 text-sm text-charcoal-500">
                    {itemCount === 0 ?
                'Todavía no agregaste piezas' :
                `${itemCount} ${
                itemCount === 1 ? 'artículo' : 'artículos'} · entrega estimada 15 días`
                }
                  </p>
              }
              </div>
              <button
              type="button"
              onClick={closeCheckout}
              className="flex h-10 w-10 items-center justify-center rounded-full text-charcoal-500 transition-colors duration-150 ease-out hover:bg-sand-100 hover:text-charcoal"
              aria-label="Cerrar carrito">
              
                <XIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            {status === 'success' ?
          <div className="flex flex-col items-center px-6 py-16 text-center sm:px-8">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-terracotta-50 text-terracotta">
                  <CheckIcon className="h-7 w-7" aria-hidden="true" />
                </span>
                <p className="mt-6 text-2xl font-semibold tracking-tight text-charcoal">
                  ¡Pago aprobado!
                </p>
                <p className="mt-3 max-w-md text-base text-charcoal-500">
                  Te enviamos el comprobante de Mercado Pago por email. Un
                  asesor te contacta en 24 h para coordinar la entrega.
                </p>
                <button
              type="button"
              onClick={closeCheckout}
              className="mt-8 inline-flex h-12 items-center rounded-full bg-charcoal px-7 text-sm font-medium text-white transition-colors duration-150 ease-out hover:bg-terracotta">
              
                  Seguir comprando
                </button>
              </div> :

          <div className="grid flex-1 overflow-y-auto lg:grid-cols-[1.15fr_0.85fr]">
                <div className="px-6 py-6 sm:px-8">
                  {lines.length === 0 ?
              <div className="flex h-full min-h-[240px] flex-col items-center justify-center text-center">
                      <span className="flex h-12 w-12 items-center justify-center rounded-full bg-sand-100 text-charcoal-400">
                        <ShoppingBagIcon
                    className="h-5 w-5"
                    aria-hidden="true" />
                  
                      </span>
                      <p className="mt-5 text-base font-medium text-charcoal">
                        Tu carrito está vacío
                      </p>
                      <p className="mt-2 max-w-xs text-sm text-charcoal-500">
                        Agregá una pieza de la colección Destacados para
                        continuar.
                      </p>
                      <button
                  type="button"
                  onClick={closeCheckout}
                  className="mt-6 inline-flex h-11 items-center rounded-full border border-charcoal px-6 text-sm font-medium text-charcoal transition-colors duration-150 ease-out hover:bg-charcoal hover:text-white">
                  
                        Ver la colección
                      </button>
                    </div> :

              <ul className="divide-y divide-sand-100">
                      {lines.map(({ product, quantity }) =>
                <li
                  key={product.id}
                  className="flex gap-4 py-5 first:pt-0">
                  
                          <img
                    src={product.image}
                    alt={product.name}
                    className="h-24 w-24 shrink-0 rounded-2xl bg-sand-100 object-cover sm:h-28 sm:w-28" />
                  
                          <div className="flex min-w-0 flex-1 flex-col">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-base font-semibold text-charcoal">
                                  {product.name}
                                </p>
                                <p className="mt-1 text-xs uppercase tracking-wide text-charcoal-400">
                                  {product.category} · {product.sku}
                                </p>
                              </div>
                              <p className="shrink-0 text-base font-semibold text-charcoal">
                                {formatPrice(product.price * quantity)}
                              </p>
                            </div>
                            <div className="mt-auto flex items-center gap-3 pt-4">
                              <div className="flex items-center rounded-full border border-sand-200">
                                <button
                          type="button"
                          onClick={() =>
                          setQuantity(product.id, quantity - 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-500 transition-colors duration-150 ease-out hover:bg-sand-100"
                          aria-label={`Quitar una unidad de ${product.name}`}>
                          
                                  <MinusIcon
                            className="h-4 w-4"
                            aria-hidden="true" />
                          
                                </button>
                                <span className="w-8 text-center text-sm font-medium text-charcoal">
                                  {quantity}
                                </span>
                                <button
                          type="button"
                          onClick={() =>
                          setQuantity(product.id, quantity + 1)
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal-500 transition-colors duration-150 ease-out hover:bg-sand-100"
                          aria-label={`Agregar una unidad de ${product.name}`}>
                          
                                  <PlusIcon
                            className="h-4 w-4"
                            aria-hidden="true" />
                          
                                </button>
                              </div>
                              <button
                        type="button"
                        onClick={() => removeItem(product.id)}
                        className="inline-flex items-center gap-1.5 text-sm text-charcoal-500 transition-colors duration-150 ease-out hover:text-terracotta">
                        
                                <TrashIcon
                          className="h-4 w-4"
                          aria-hidden="true" />
                        
                                Eliminar
                              </button>
                            </div>
                          </div>
                        </li>
                )}
                    </ul>
              }
                </div>

                <div className="border-t border-sand-200 bg-sand-50 px-6 py-6 sm:px-8 lg:border-l lg:border-t-0">
                  <fieldset>
                    <legend className="text-sm font-semibold text-charcoal">
                      Medio de pago
                    </legend>
                    <div className="mt-4 space-y-2.5">
                      {methods.map((option) => {
                    const Icon = methodIcons[option.id];
                    const selected = method === option.id;
                    return (
                      <label
                        key={option.id}
                        className={`flex cursor-pointer items-center gap-3 rounded-2xl border bg-white p-4 transition-colors duration-150 ease-out ${
                        selected ?
                        'border-mp ring-1 ring-mp' :
                        'border-sand-200 hover:border-sand-300'}`
                        }>
                        
                            <input
                          type="radio"
                          name="payment-method"
                          value={option.id}
                          checked={selected}
                          onChange={() => setMethod(option.id)}
                          className="sr-only" />
                        
                            <span
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                          selected ?
                          'bg-mp/10 text-mp' :
                          'bg-sand-100 text-charcoal-500'}`
                          }>
                          
                              <Icon className="h-4 w-4" aria-hidden="true" />
                            </span>
                            <span className="min-w-0 flex-1">
                              <span className="block text-sm font-medium text-charcoal">
                                {option.label}
                              </span>
                              <span className="mt-0.5 block text-xs text-charcoal-500">
                                {option.detail}
                              </span>
                            </span>
                            <span
                          className={`h-4 w-4 shrink-0 rounded-full border-2 ${
                          selected ?
                          'border-mp bg-mp' :
                          'border-sand-300 bg-white'}`
                          }
                          aria-hidden="true" />
                        
                          </label>);

                  })}
                    </div>
                  </fieldset>

                  <dl className="mt-7 space-y-3 border-t border-sand-200 pt-6 text-sm">
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Subtotal</dt>
                      <dd className="font-medium text-charcoal">
                        {formatPrice(subtotal)}
                      </dd>
                    </div>
                    <div className="flex justify-between">
                      <dt className="text-charcoal-500">Envío e instalación</dt>
                      <dd className="font-medium text-charcoal">
                        {shipping === 0 ? 'Sin cargo' : formatPrice(shipping)}
                      </dd>
                    </div>
                    {discount > 0 &&
                <div className="flex justify-between">
                        <dt className="text-charcoal-500">Descuento Pix 5%</dt>
                        <dd className="font-medium text-terracotta">
                          −{formatPrice(discount)}
                        </dd>
                      </div>
                }
                    <div className="flex items-baseline justify-between border-t border-sand-200 pt-4">
                      <dt className="text-base font-semibold text-charcoal">
                        Total
                      </dt>
                      <dd className="text-2xl font-semibold tracking-tight text-charcoal">
                        {formatPrice(total)}
                      </dd>
                    </div>
                  </dl>

                  {method === 'card' && total > 0 &&
              <p className="mt-2 text-xs text-charcoal-500">
                      {formatInstallments(total)}
                    </p>
              }

                  <button
                type="button"
                onClick={handlePay}
                disabled={lines.length === 0 || status === 'processing'}
                className="mt-6 inline-flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-mp text-base font-semibold text-white transition-colors duration-150 ease-out hover:bg-mp-dark disabled:cursor-not-allowed disabled:bg-sand-200 disabled:text-charcoal-400">
                
                    {status === 'processing' ?
                <>
                        <Loader2Icon
                    className="h-5 w-5 animate-spin"
                    aria-hidden="true" />
                  
                        Procesando pago…
                      </> :

                'Pagar con Mercado Pago'
                }
                  </button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-charcoal-500">
                    <LockIcon className="h-3.5 w-3.5" aria-hidden="true" />
                    Pago protegido por Mercado Pago
                  </div>

                  <div className="mt-5 flex flex-wrap items-center justify-center gap-3 border-t border-sand-200 pt-5">
                    <MercadoPagoMark />
                    <VisaMark />
                    <MastercardMark />
                  </div>
                </div>
              </div>
          }
          </motion.div>
        </div>
      }
    </AnimatePresence>);

}