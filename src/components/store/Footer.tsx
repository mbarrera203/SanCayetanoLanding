import React from 'react';
import { Link } from 'react-router-dom';
import {
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon } from
'lucide-react';
import { navLinks } from '../../data/products';
import {
  CashMark,
  MastercardMark,
  MercadoPagoMark,
  PixMark,
  VisaMark } from
'../PaymentMarks';

const socials = [
{ label: 'Instagram', Icon: InstagramIcon, href: '#instagram' },
{ label: 'Facebook', Icon: FacebookIcon, href: '#facebook' }];


export function Footer() {
  return (
    <footer
      id="ofertas"
      className="bg-charcoal text-sand-100"
      aria-labelledby="footer-heading">
      
      <h2 id="footer-heading" className="sr-only">
        Información de contacto y medios de pago
      </h2>
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <img
              src="/Logo1.jpg"
              alt="San Cayetano Muebles"
              className="h-24 w-24 rounded-2xl object-cover" />
            
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-charcoal-300">
              Fábrica y showroom de muebles de madera maciza. Diseño propio,
              producción nacional, envíos a todo el país.
            </p>
            <div className="mt-7 flex items-center gap-3">
              {socials.map(({ label, Icon, href }) =>
              <a
                key={label}
                href={href}
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-sand-100 transition-colors duration-150 ease-out hover:border-white/40 hover:bg-white/10">
                
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              )}
            </div>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Tienda
            </h3>
            <ul className="mt-5 space-y-3">
              {navLinks.map((link) =>
              <li key={link.label}>
                  <a
                  href={link.href}
                  className="text-sm text-sand-100 transition-colors duration-150 ease-out hover:text-terracotta-200">
                  
                    {link.label}
                  </a>
                </li>
              )}
              <li>
                <Link
                  to="/admin"
                  className="text-sm text-sand-100 transition-colors duration-150 ease-out hover:text-terracotta-200">
                  
                  Panel de administración
                </Link>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-5">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
              Contacto
            </h3>
            <ul className="mt-5 space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPinIcon
                  className="mt-0.5 h-4 w-4 shrink-0 text-terracotta-200"
                  aria-hidden="true" />
                
                <span>
                  Av. San Cayetano 1840, Córdoba
                  <br />
                  Lunes a sábados de 9 a 19 h
                </span>
              </li>
              <li className="flex items-center gap-3">
                <PhoneIcon
                  className="h-4 w-4 shrink-0 text-terracotta-200"
                  aria-hidden="true" />
                
                <a
                  href="tel:+543514567890"
                  className="transition-colors duration-150 ease-out hover:text-terracotta-200">
                  
                  +54 351 456 7890
                </a>
              </li>
              <li className="flex items-center gap-3">
                <MailIcon
                  className="h-4 w-4 shrink-0 text-terracotta-200"
                  aria-hidden="true" />
                
                <a
                  href="mailto:hola@sancayetanomuebles.com.ar"
                  className="transition-colors duration-150 ease-out hover:text-terracotta-200">
                  
                  hola@sancayetanomuebles.com.ar
                </a>
              </li>
            </ul>

            <div className="mt-9 rounded-2xl bg-white/[0.06] p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-charcoal-300">
                Medios de pago
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-3">
                <MercadoPagoMark />
                <VisaMark />
                <MastercardMark />
                <PixMark />
                <CashMark />
              </div>
              <p className="mt-4 text-xs text-charcoal-300">
                Hasta 12 cuotas sin interés con Mercado Pago y tarjetas
                bancarias.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-3 border-t border-white/10 pt-7 text-xs text-charcoal-300 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 San Cayetano Muebles. Todos los derechos reservados.</p>
          <div className="flex gap-6">
            <a href="#terminos" className="hover:text-sand-100">
              Términos
            </a>
            <a href="#privacidad" className="hover:text-sand-100">
              Privacidad
            </a>
            <a href="#envios" className="hover:text-sand-100">
              Envíos y devoluciones
            </a>
          </div>
        </div>
      </div>
    </footer>);

}