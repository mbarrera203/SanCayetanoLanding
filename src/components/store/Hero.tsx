import React from 'react';
import { ArrowRightIcon } from 'lucide-react';

export function Hero() {
  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 lg:px-12 lg:pt-10">
      
      <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-center lg:col-span-5 lg:py-10">
          <p className="text-sm font-medium text-terracotta">
            Colección Otoño 2026
          </p>
          <h1
            id="hero-heading"
            className="mt-5 text-[2.75rem] font-semibold leading-[1.03] tracking-tight text-charcoal sm:text-6xl lg:text-[4.25rem]">
            
            Muebles hechos para quedarse.
          </h1>
          <p className="mt-6 max-w-md text-lg leading-relaxed text-charcoal-500">
            Piezas de nogal y roble macizo, tapizados naturales y terminaciones
            a mano en nuestro taller de San Cayetano. Envío e instalación en
            todo el país.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <a
              href="#destacados"
              className="group inline-flex h-14 items-center gap-2.5 rounded-full bg-charcoal px-8 text-base font-medium text-white shadow-soft transition-colors duration-150 ease-out hover:bg-terracotta">
              
              Ver Colección
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
                aria-hidden="true" />
              
            </a>
            <a
              href="#taller"
              className="inline-flex h-14 items-center rounded-full border border-sand-300 px-7 text-base font-medium text-charcoal-700 transition-colors duration-150 ease-out hover:border-charcoal hover:text-charcoal">
              
              Conocer el taller
            </a>
          </div>

          <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-sand-200 pt-7">
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Cuotas
              </dt>
              <dd className="mt-1 text-base font-semibold text-charcoal">
                12 sin interés
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Garantía
              </dt>
              <dd className="mt-1 text-base font-semibold text-charcoal">
                5 años
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Entrega
              </dt>
              <dd className="mt-1 text-base font-semibold text-charcoal">
                15 días
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[320px] overflow-hidden rounded-4xl bg-sand-100 sm:h-[440px] lg:h-full lg:min-h-[560px]">
            <img
              src="/1d62e4cb-d7e5-4453-bf1d-678dd83ddbc3.jpg"
              alt="Living moderno con sofá de lino, mesa baja de nogal y alfombra de yute"
              className="h-full w-full object-cover" />
            
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-5 backdrop-blur sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs">
              <p className="text-sm font-semibold text-charcoal">
                Living Lima completo
              </p>
              <p className="mt-1 text-sm text-charcoal-500">
                Sofá, mesa baja y alfombra desde $1.890.000
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>);

}