import React from 'react';

interface MarkProps {
  className?: string;
}

export function PosnetMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-[#003B70]/20 bg-[#003B70] px-2.5 py-1.5 text-white ${className}`}
      aria-label="Posnet Fiserv"
      role="img"
    >
      <span className="flex h-3 w-3 items-center justify-center rounded-full bg-[#FF6600]" />
      <span className="text-[12px] font-bold tracking-tight text-white">
        posnet
      </span>
      <span className="text-[9px] font-medium text-white/70">
        fiserv.
      </span>
    </span>
  );
}

export function NaranjaMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center gap-1 rounded-lg border border-[#FF6600]/30 bg-[#FFF3EB] px-2.5 ${className}`}
      role="img"
      aria-label="Tarjeta Naranja X"
    >
      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#FF6600] text-[10px] font-black text-white">
        X
      </span>
      <span className="text-[12px] font-extrabold tracking-tight text-[#FF6600]">
        naranja
      </span>
    </span>
  );
}

export function VisaMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 w-14 items-center justify-center rounded-lg border border-sand-200 bg-white ${className}`}
      role="img"
      aria-label="Visa"
    >
      <span className="text-[13px] font-black italic tracking-tight text-[#1A1F71]">
        VISA
      </span>
    </span>
  );
}

export function MastercardMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 w-14 items-center justify-center rounded-lg border border-sand-200 bg-white ${className}`}
      role="img"
      aria-label="Mastercard"
    >
      <svg viewBox="0 0 34 20" className="h-4 w-8" aria-hidden="true">
        <circle cx="13" cy="10" r="7" fill="#EB001B" />
        <circle cx="21" cy="10" r="7" fill="#F79E1B" />
        <path
          d="M17 4.6a7 7 0 0 0 0 10.8 7 7 0 0 0 0-10.8Z"
          fill="#FF5F00"
        />
      </svg>
    </span>
  );
}

export function CabalMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex h-8 items-center justify-center rounded-lg border border-sand-200 bg-white px-2.5 ${className}`}
      role="img"
      aria-label="Cabal"
    >
      <span className="text-[11px] font-extrabold tracking-wider text-[#008542]">
        CABAL
      </span>
    </span>
  );
}

export function TransferMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-2.5 py-1.5 ${className}`}
      role="img"
      aria-label="Transferencia Bancaria con 15% de descuento"
    >
      <svg viewBox="0 0 20 20" className="h-4 w-4 fill-emerald-700" aria-hidden="true">
        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
      </svg>
      <span className="text-[11px] font-bold text-emerald-800">
        15% off transferencia
      </span>
    </span>
  );
}

export function CashMark({ className = '' }: MarkProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-lg border border-sand-200 bg-white px-2.5 py-1.5 ${className}`}
      role="img"
      aria-label="Efectivo en showroom"
    >
      <svg viewBox="0 0 24 16" className="h-4 w-6" aria-hidden="true">
        <rect
          x="1"
          y="1.5"
          width="22"
          height="13"
          rx="2.5"
          fill="#EAF6EC"
          stroke="#3F8F55"
          strokeWidth="1.2"
        />
        <circle cx="12" cy="8" r="3" fill="#3F8F55" />
      </svg>
      <span className="text-[11px] font-bold leading-none text-[#2F6B41]">
        efectivo
      </span>
    </span>
  );
}

// Mantenemos estos para no romper imports anteriores mientras se migra
export function MercadoPagoMark({ className = '' }: MarkProps) {
  return <PosnetMark className={className} />;
}

export function PixMark({ className = '' }: MarkProps) {
  return <TransferMark className={className} />;
}