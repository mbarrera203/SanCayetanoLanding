import React, { useState, useEffect } from 'react';
import { ArrowRightIcon } from 'lucide-react';

const heroOffers = [
  {
    id: 1,
    image: "/1d62e4cb-d7e5-4453-bf1d-678dd83ddbc3.jpg",
    alt: "Living moderno con sofá de lino, mesa baja de nogal y alfombra de yute",
    title: "Living Lima completo",
    description: "Sofá, mesa baja y alfombra desde $1.890.000"
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Sillón individual con descuento",
    title: "15% OFF en Sofás",
    description: "Pagando de contado o transferencia bancaria"
  },
  {
    id: 3,
    image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Mesa de comedor de roble",
    title: "Comedor Roble Macizo",
    description: "Llevalo en 3 cuotas sin interés con Naranja X y tarjetas seleccionadas"
  }
];

export function Hero() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroOffers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="top"
      aria-labelledby="hero-heading"
      className="mx-auto max-w-[1400px] px-5 pt-6 sm:px-8 lg:px-12 lg:pt-10">

      <div className="grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-center items-center text-center lg:items-start lg:text-left lg:col-span-5 lg:py-10">
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
          <div className="mt-9 flex flex-row items-center justify-center lg:justify-start gap-3 w-full">
            <a
              href="#destacados"
              className="group inline-flex h-12 sm:h-14 items-center gap-2 rounded-full bg-charcoal px-5 sm:px-8 text-sm sm:text-base font-medium text-white shadow-soft transition-colors duration-150 ease-out hover:bg-terracotta whitespace-nowrap">
              Ver Colección
              <ArrowRightIcon
                className="h-4 w-4 transition-transform duration-200 ease-smooth group-hover:translate-x-1"
                aria-hidden="true" />
            </a>
            <a
              href="#taller"
              className="inline-flex h-12 sm:h-14 items-center rounded-full border border-sand-300 px-5 sm:px-7 text-sm sm:text-base font-medium text-charcoal-700 transition-colors duration-150 ease-out hover:border-charcoal hover:text-charcoal whitespace-nowrap">
              Conocer el taller
            </a>
          </div>

          <dl className="mt-12 grid max-w-md w-full grid-cols-3 gap-2 sm:gap-6 border-t border-sand-200 pt-7 mx-auto lg:mx-0">
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Cuotas
              </dt>
              <dd className="mt-1 text-sm sm:text-base font-semibold text-charcoal">
                3 sin interés
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Garantía
              </dt>
              <dd className="mt-1 text-sm sm:text-base font-semibold text-charcoal">
                5 años
              </dd>
            </div>
            <div>
              <dt className="text-xs uppercase tracking-wide text-charcoal-400">
                Entrega
              </dt>
              <dd className="mt-1 text-sm sm:text-base font-semibold text-charcoal">
                15 días
              </dd>
            </div>
          </dl>
        </div>

        <div className="lg:col-span-7">
          <div className="relative h-[320px] overflow-hidden rounded-4xl bg-sand-100 sm:h-[440px] lg:h-full lg:min-h-[560px]">
            {heroOffers.map((offer, index) => {
              const isActive = index === currentIndex;
              return (
                <div
                  key={offer.id}
                  className={`absolute inset-0 h-full w-full transition-opacity duration-1000 ease-in-out ${
                    isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
                  }`}
                >
                  <img
                    src={offer.image}
                    alt={offer.alt}
                    loading="eager"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/92 p-5 backdrop-blur sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs shadow-xl">
                    <p className="text-sm font-semibold text-charcoal">{offer.title}</p>
                    <p className="mt-1 text-sm text-charcoal-500">{offer.description}</p>
                  </div>
                </div>
              );
            })}


            {/* Slider Dots */}
            <div className="absolute bottom-5 right-5 sm:bottom-7 sm:right-7 flex gap-2 z-10">
              {heroOffers.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex ? 'bg-charcoal w-6' : 'bg-charcoal/30 w-2.5 hover:bg-charcoal/50'
                  }`}
                  aria-label={`Ver oferta ${index + 1}`} />

              ))}
            </div>
          </div>
        </div>
      </div>
    </section>);

}