import React from 'react';
import { CreditCardIcon, StarIcon, TagIcon } from 'lucide-react';
import { NaranjaMark, PosnetMark } from '../PaymentMarks';
import { useSettings } from '../../contexts/SettingsContext';

export function PromoBand() {
  const { settings, isVisaMasterPromoActiveToday } = useSettings();
  const isVisaMasterActive = isVisaMasterPromoActiveToday();

  return (
    <section
      aria-label="Beneficios y planes de financiación con Posnet"
      className="mt-8 border-y border-sand-200 bg-sand-50 lg:mt-20"
    >
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4 sm:px-8 lg:px-12">
        {/* Item 1: Trayectoria */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-5 sm:py-7 border-r border-b lg:border-b-0 border-sand-200 lg:py-9">
          <div className="text-center sm:text-right">
            <div
              className="flex items-center justify-center gap-1 text-terracotta-400"
              aria-hidden="true"
            >
              <StarIcon className="h-3 w-3 fill-current" />
              <StarIcon className="h-3.5 w-3.5 fill-current" />
              <StarIcon className="h-3 w-3 fill-current" />
            </div>
            <p className="mt-1 text-3xl sm:text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
              20
            </p>
            <p className="mt-1 text-[9px] sm:text-[11px] font-semibold uppercase tracking-[0.28em] text-charcoal-500">
              años
            </p>
          </div>
          <div className="hidden sm:block h-12 w-px bg-sand-300" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-semibold leading-snug text-charcoal text-center sm:text-left">
            San Cayetano<br className="hidden sm:block" /> Muebles
          </p>
        </div>

        {/* Item 2: Visa & Master (Miércoles y Sábados) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-5 sm:py-7 border-b lg:border-b-0 lg:border-r border-sand-200 lg:py-9 text-center sm:text-left">
          <CreditCardIcon
            className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 text-charcoal"
            aria-hidden="true"
          />
          <div>
            <p className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2">
              <span className="text-3xl sm:text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                {settings.visaMasterInstallments}
              </span>
              <span className="text-[11px] sm:text-sm font-bold uppercase leading-tight tracking-wide text-charcoal">
                cuotas
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>sin interés
              </span>
            </p>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-charcoal-500 font-medium">
              Visa y Master · Mié y Sáb
              {isVisaMasterActive && (
                <span className="ml-1.5 inline-block rounded-full bg-emerald-100 px-1.5 py-0.5 text-[9px] font-bold text-emerald-800">
                  ¡Hoy activo!
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Item 3: Naranja X (Plan Z) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-5 sm:py-7 border-r lg:border-r border-sand-200 lg:py-9 text-center sm:text-left">
          <div className="shrink-0">
            <NaranjaMark className="scale-90 sm:scale-100" />
          </div>
          <div>
            <p className="flex flex-col sm:flex-row items-center sm:items-baseline gap-1 sm:gap-2">
              <span className="text-3xl sm:text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                {settings.naranjaInstallments}
              </span>
              <span className="text-[11px] sm:text-sm font-bold uppercase leading-tight tracking-wide text-charcoal">
                cuotas
                <br className="hidden sm:block" />
                <span className="sm:hidden"> </span>cero interés
              </span>
            </p>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-charcoal-500 font-medium">
              Plan Z · Todos los días
            </p>
          </div>
        </div>

        {/* Item 4: 15% OFF contado / transferencia */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 p-5 sm:py-7 lg:py-9 text-center sm:text-left">
          <TagIcon
            className="h-7 w-7 sm:h-9 sm:w-9 shrink-0 text-charcoal"
            aria-hidden="true"
          />
          <div>
            <p className="flex items-center justify-center sm:justify-start items-baseline gap-1">
              <span className="text-3xl sm:text-[2.75rem] font-semibold leading-none tracking-tight text-terracotta">
                {settings.transferDiscountPercentage}
              </span>
              <span className="text-lg sm:text-xl font-semibold leading-none text-terracotta">
                %
              </span>
              <span className="ml-1 text-[11px] sm:text-sm font-bold uppercase tracking-wide text-charcoal">
                off
              </span>
            </p>
            <p className="mt-1 sm:mt-2 text-[10px] sm:text-xs text-charcoal-500 font-medium">
              por transferencia bancaria
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
