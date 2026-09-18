import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { BellIcon, ExternalLinkIcon } from 'lucide-react';
import { AdminSection, AdminSidebar } from '../components/admin/AdminSidebar';
import { StatCards } from '../components/admin/StatCards';
import { ProductsTable } from '../components/admin/ProductsTable';
import { PromoSettings } from '../components/admin/PromoSettings';

const titles: Record<AdminSection, string> = {
  dashboard: 'Dashboard General',
  productos: 'Gestión de Productos',
  pedidos: 'Pedidos & Pagos Posnet',
  clientes: 'Clientes',
  configuracion: 'Configuración de Promociones & Financiación'
};

export function Admin() {
  const [section, setSection] = useState<AdminSection>('dashboard');

  return (
    <div className="min-h-screen w-full bg-sand-50 lg:flex">
      <AdminSidebar active={section} onSelect={setSection} />

      <div className="min-w-0 flex-1">
        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 bg-white px-5 py-5 sm:px-8">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight text-charcoal">
              {titles[section]}
            </h1>
            <p className="mt-1 text-sm text-charcoal-500">
              San Cayetano Muebles · Panel de control de ventas y promociones
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full border border-sand-200 text-charcoal-500 transition-colors duration-150 ease-out hover:bg-sand-50 hover:text-charcoal"
              aria-label="Notificaciones, 3 sin leer"
            >
              <BellIcon className="h-4 w-4" aria-hidden="true" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-terracotta" />
            </button>
            <Link
              to="/"
              className="inline-flex h-10 items-center gap-2 rounded-full border border-sand-200 px-4 text-sm font-medium text-charcoal-700 transition-colors duration-150 ease-out hover:border-charcoal hover:text-charcoal"
            >
              Ver tienda
              <ExternalLinkIcon className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-sm font-semibold text-white">
              SC
            </span>
          </div>
        </header>

        <main className="px-5 py-7 sm:px-8 sm:py-9">
          {section === 'dashboard' && (
            <>
              <StatCards />
              <ProductsTable />
              <div className="mt-8">
                <PromoSettings />
              </div>
            </>
          )}

          {section === 'productos' && <ProductsTable />}

          {section === 'configuracion' && <PromoSettings />}

          {(section === 'pedidos' || section === 'clientes') && (
            <div className="rounded-3xl border border-sand-200 bg-white p-12 text-center">
              <h2 className="text-lg font-semibold text-charcoal">
                Sección {titles[section]}
              </h2>
              <p className="mt-2 text-sm text-charcoal-500">
                Los pedidos y cobros de Gateway Posnet se sincronizarán aquí una vez conectadas las credenciales de comercio de Fiserv.
              </p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}