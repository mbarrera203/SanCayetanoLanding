import React from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import { formatPrice } from '../../utils/currency';

const weeklySales = [42, 58, 51, 74, 66, 88, 96];

const secondaryStats: {label: string;value: string;note: string;}[] = [
{ label: 'Pedidos nuevos', value: '8', note: '3 esperando confirmación' },
{ label: 'Ticket promedio', value: formatPrice(842000), note: '+6% vs. mes anterior' },
{ label: 'Piezas en stock bajo', value: '3', note: 'Reponer antes del viernes' }];


export function StatCards() {
  const maxSale = Math.max(...weeklySales);

  return (
    <div className="grid gap-5 lg:grid-cols-3">
      <section
        aria-labelledby="ventas-heading"
        className="rounded-3xl bg-charcoal p-7 text-white lg:col-span-2">
        
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2
              id="ventas-heading"
              className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              
              Ventas totales · septiembre
            </h2>
            <p className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              {formatPrice(18420000)}
            </p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-terracotta-200">
              <ArrowUpRightIcon className="h-4 w-4" aria-hidden="true" />
              +14,2% respecto de agosto
            </p>
          </div>
          <div
            className="flex h-24 items-end gap-2"
            role="img"
            aria-label="Ventas de las últimas siete semanas, con tendencia en alza">
            
            {weeklySales.map((value, index) =>
            <span
              key={index}
              className={`w-4 rounded-t-md ${
              index === weeklySales.length - 1 ?
              'bg-terracotta-200' :
              'bg-white/20'}`
              }
              style={{ height: `${value / maxSale * 100}%` }} />

            )}
          </div>
        </div>
      </section>

      <div className="grid gap-5 sm:grid-cols-3 lg:grid-cols-1">
        {secondaryStats.map((stat) =>
        <section
          key={stat.label}
          className="rounded-3xl border border-sand-200 bg-white p-5">
          
            <h2 className="text-xs font-semibold uppercase tracking-wider text-charcoal-400">
              {stat.label}
            </h2>
            <p className="mt-2 text-2xl font-semibold tracking-tight text-charcoal">
              {stat.value}
            </p>
            <p className="mt-1 text-xs text-charcoal-500">{stat.note}</p>
          </section>
        )}
      </div>
    </div>);

}