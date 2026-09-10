import React, { useState } from 'react';
import { MenuIcon, SearchIcon, ShoppingBagIcon, XIcon } from 'lucide-react';
import { navLinks } from '../../data/products';
import { useCart } from '../../contexts/CartContext';

export function Header() {
  const { itemCount, openCheckout } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-sand-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-[1400px] items-center gap-6 px-5 sm:px-8 lg:h-24 lg:px-12">
        <a href="#top" className="flex shrink-0 items-center" aria-label="San Cayetano Muebles, inicio">
          <img
            src="/Logo2.jpg"
            alt="San Cayetano Muebles"
            className="h-12 w-auto lg:h-14" />
          
        </a>

        <nav
          aria-label="Categorías"
          className="hidden items-center gap-8 lg:flex">
          
          {navLinks.map((link) =>
          <a
            key={link.label}
            href={link.href}
            className={`text-sm font-medium transition-colors duration-150 ease-out hover:text-terracotta ${
            link.label === 'Ofertas' ? 'text-terracotta' : 'text-charcoal-700'}`
            }>
            
              {link.label}
            </a>
          )}
        </nav>

        <div className="ml-auto hidden min-w-[220px] max-w-sm flex-1 md:block">
          <label className="relative block">
            <span className="sr-only">Buscar muebles</span>
            <SearchIcon
              className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
              aria-hidden="true" />
            
            <input
              type="search"
              placeholder="Buscar sofás, mesas, camas…"
              className="h-11 w-full rounded-full border border-sand-200 bg-sand-50 pl-11 pr-4 text-sm text-charcoal placeholder:text-charcoal-400 transition-colors duration-150 ease-out focus:border-terracotta-200 focus:bg-white focus:outline-none focus-visible:outline-none" />
            
          </label>
        </div>

        <div className="ml-auto flex items-center gap-1 md:ml-0 md:gap-2">
          <button
            type="button"
            onClick={openCheckout}
            className="relative flex h-11 w-11 items-center justify-center rounded-full text-charcoal-700 transition-colors duration-150 ease-out hover:bg-sand-100"
            aria-label={`Abrir carrito, ${itemCount} ${
            itemCount === 1 ? 'artículo' : 'artículos'}`
            }>
            
            <ShoppingBagIcon className="h-5 w-5" aria-hidden="true" />
            {itemCount > 0 &&
            <span className="absolute right-1.5 top-1.5 flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-terracotta px-1 text-[11px] font-semibold leading-none text-white">
                {itemCount}
              </span>
            }
          </button>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            className="flex h-11 w-11 items-center justify-center rounded-full text-charcoal-700 transition-colors duration-150 ease-out hover:bg-sand-100 lg:hidden"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}>
            
            {isMenuOpen ?
            <XIcon className="h-5 w-5" aria-hidden="true" /> :

            <MenuIcon className="h-5 w-5" aria-hidden="true" />
            }
          </button>
        </div>
      </div>

      {isMenuOpen &&
      <div className="border-t border-sand-200 bg-white px-5 pb-6 pt-4 sm:px-8 lg:hidden">
          <label className="relative mb-4 block md:hidden">
            <span className="sr-only">Buscar muebles</span>
            <SearchIcon
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-charcoal-400"
            aria-hidden="true" />
          
            <input
            type="search"
            placeholder="Buscar sofás, mesas, camas…"
            className="h-11 w-full rounded-full border border-sand-200 bg-sand-50 pl-11 pr-4 text-sm placeholder:text-charcoal-400 focus:border-terracotta-200 focus:bg-white focus:outline-none" />
          
          </label>
          <nav aria-label="Categorías" className="flex flex-col">
            {navLinks.map((link) =>
          <a
            key={link.label}
            href={link.href}
            onClick={() => setIsMenuOpen(false)}
            className="border-b border-sand-100 py-3 text-base font-medium text-charcoal-700 last:border-0">
            
                {link.label}
              </a>
          )}
          </nav>
        </div>
      }
    </header>);

}