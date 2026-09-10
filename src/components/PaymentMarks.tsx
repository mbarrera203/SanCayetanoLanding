import React from 'react';

interface MarkProps {
  className?: string;
}

export function MercadoPagoMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-lg bg-mp-yellow px-2.5 py-1.5 ${className}`}
      aria-label="Mercado Pago"
      role="img">
      
      <svg viewBox="0 0 32 20" className="h-4 w-6" aria-hidden="true">
        <path
          d="M4 11.2c0-4.3 4.4-7.8 10-7.8s10 3.5 10 7.8-4.4 5.4-10 5.4S4 15.5 4 11.2Z"
          fill="#2D3277"
          opacity="0.12" />
        
        <path
          d="M8.4 9.6l3.2-2.1 3 1.9 2.6-1.8 3.3 2.2-2.3 2.9-2.4-1.5-2.3 1.6-2.4-1.5-2.7 1.5Z"
          fill="#2D3277" />
        
      </svg>
      <span className="text-[11px] font-bold leading-none tracking-tight text-mp-ink">
        mercado pago
      </span>
    </span>);

}

export function VisaMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 w-14 items-center justify-center rounded-lg border border-sand-200 bg-white ${className}`}
      role="img"
      aria-label="Visa">
      
      <span className="text-[13px] font-bold italic tracking-tight text-[#1A1F71]">
        VISA
      </span>
    </span>);

}

export function MastercardMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 w-14 items-center justify-center rounded-lg border border-sand-200 bg-white ${className}`}
      role="img"
      aria-label="Mastercard">
      
      <svg viewBox="0 0 34 20" className="h-4 w-8" aria-hidden="true">
        <circle cx="13" cy="10" r="7" fill="#EB001B" />
        <circle cx="21" cy="10" r="7" fill="#F79E1B" />
        <path
          d="M17 4.6a7 7 0 0 0 0 10.8 7 7 0 0 0 0-10.8Z"
          fill="#FF5F00" />
        
      </svg>
    </span>);

}

export function PixMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 ${className}`}
      role="img"
      aria-label="Pix">
      
      <svg viewBox="0 0 20 20" className="h-4 w-4" aria-hidden="true">
        <path
          d="M10 1.6 18.4 10 10 18.4 1.6 10 10 1.6Zm0 3.4L5 10l5 5 5-5-5-5Z"
          fill="#32BCAD" />
        
      </svg>
      <span className="text-[11px] font-bold leading-none text-[#0E7C6F]">
        pix
      </span>
    </span>);

}

export function CashMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 ${className}`}
      role="img"
      aria-label="Efectivo en puntos de pago">
      
      <svg viewBox="0 0 24 16" className="h-4 w-6" aria-hidden="true">
        <rect
          x="1"
          y="1.5"
          width="22"
          height="13"
          rx="2.5"
          fill="#EAF6EC"
          stroke="#3F8F55"
          strokeWidth="1.2" />
        
        <circle cx="12" cy="8" r="3" fill="#3F8F55" />
      </svg>
      <span className="text-[11px] font-bold leading-none text-[#2F6B41]">
        efectivo
      </span>
    </span>);

}