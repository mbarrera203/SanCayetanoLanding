import React from 'react';
import { ArrowRightIcon } from 'lucide-react';

export function WorkshopBand() {
  return (
    <section
      id="taller"
      aria-labelledby="taller-heading"
      className="bg-sand-50">
      
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 py-20 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12 lg:py-28">
        <div className="lg:col-span-7">
          <img
            src="/c59a83e3-e15f-42ff-994e-c54b37e9b07e.jpg"
            alt="Aparador Córdoba en nogal macizo con frentes ranurados"
            className="h-[280px] w-full rounded-4xl object-cover sm:h-[420px]" />
          
        </div>
        <div className="lg:col-span-5">
          <p className="text-sm font-medium text-terracotta">Nuestro taller</p>
          <h2
            id="taller-heading"
            className="mt-4 text-3xl font-semibold leading-tight tracking-tight text-charcoal sm:text-4xl">
            
            Cada mueble pasa por seis pares de manos antes de llegar a tu casa.
          </h2>
          <p className="mt-6 text-base leading-relaxed text-charcoal-500">
            Seleccionamos la madera pieza por pieza, secamos en horno propio y
            terminamos con aceites naturales. Si algo se mueve, se raya o se
            afloja en los primeros cinco años, lo reparamos sin cargo.
          </p>
          <a
            href="#ofertas"
            className="group mt-8 inline-flex items-center gap-2 text-sm font-medium text-charcoal transition-colors duration-150 ease-out hover:text-terracotta">
            
            Ver piezas en oferta
            <ArrowRightIcon
              className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
              aria-hidden="true" />
            
          </a>
        </div>
      </div>
    </section>);

}