import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeftIcon,
  LayoutDashboardIcon,
  PackageIcon,
  ReceiptTextIcon,
  SettingsIcon,
  UsersIcon } from
'lucide-react';

export type AdminSection =
'dashboard' |
'productos' |
'pedidos' |
'clientes' |
'configuracion';

const items: {
  id: AdminSection;
  label: string;
  Icon: typeof LayoutDashboardIcon;
  badge?: string;
}[] = [
{ id: 'dashboard', label: 'Dashboard', Icon: LayoutDashboardIcon },
{ id: 'productos', label: 'Productos', Icon: PackageIcon },
{ id: 'pedidos', label: 'Pedidos', Icon: ReceiptTextIcon, badge: '8' },
{ id: 'clientes', label: 'Clientes', Icon: UsersIcon },
{ id: 'configuracion', label: 'Configuración', Icon: SettingsIcon }];


interface AdminSidebarProps {
  active: AdminSection;
  onSelect: (section: AdminSection) => void;
}

export function AdminSidebar({ active, onSelect }: AdminSidebarProps) {
  return (
    <aside className="flex shrink-0 flex-col border-b border-sand-200 bg-white lg:h-screen lg:w-72 lg:border-b-0 lg:border-r">
      <div className="flex items-center gap-3 px-5 py-5 lg:px-6 lg:py-7">
        <img
          src="/Logo1.jpg"
          alt=""
          className="h-11 w-11 rounded-xl object-cover" />
        
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-charcoal">
            San Cayetano
          </p>
          <p className="text-xs text-charcoal-400">Panel de administración</p>
        </div>
      </div>

      <nav
        aria-label="Secciones del panel"
        className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:px-3 lg:pb-0">
        
        {items.map(({ id, label, Icon, badge }) => {
          const isActive = id === active;
          return (
            <button
              key={id}
              type="button"
              onClick={() => onSelect(id)}
              aria-current={isActive ? 'page' : undefined}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors duration-150 ease-out lg:w-full ${
              isActive ?
              'bg-terracotta-50 text-terracotta' :
              'text-charcoal-500 hover:bg-sand-50 hover:text-charcoal'}`
              }>
              
              <Icon className="h-4 w-4 shrink-0" aria-hidden="true" />
              {label}
              {badge &&
              <span
                className={`ml-auto hidden rounded-full px-2 py-0.5 text-[11px] font-semibold lg:inline ${
                isActive ?
                'bg-terracotta text-white' :
                'bg-sand-100 text-charcoal-500'}`
                }>
                
                  {badge}
                </span>
              }
            </button>);

        })}
      </nav>

      <div className="mt-auto hidden border-t border-sand-200 p-4 lg:block">
        <Link
          to="/"
          className="flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium text-charcoal-500 transition-colors duration-150 ease-out hover:bg-sand-50 hover:text-charcoal">
          
          <ArrowLeftIcon className="h-4 w-4" aria-hidden="true" />
          Volver a la tienda
        </Link>
      </div>
    </aside>);

}