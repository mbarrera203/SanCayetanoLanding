import React, { useState } from 'react';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  CreditCardIcon,
  PercentIcon,
  RotateCcwIcon,
  SaveIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import { DAY_NAMES, useSettings } from '../../contexts/SettingsContext';
import { NaranjaMark, PosnetMark, VisaMark, MastercardMark } from '../PaymentMarks';

export function PromoSettings() {
  const {
    settings,
    updateSettings,
    resetSettings,
    isVisaMasterPromoActiveToday,
    getTodayDayName,
  } = useSettings();

  const [form, setForm] = useState(settings);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const isTodayActive = isVisaMasterPromoActiveToday();
  const todayName = getTodayDayName();

  const handleDayToggle = (dayIndex: number) => {
    setForm((prev) => {
      const exists = prev.visaMasterDays.includes(dayIndex);
      const nextDays = exists
        ? prev.visaMasterDays.filter((d) => d !== dayIndex)
        : [...prev.visaMasterDays, dayIndex].sort();
      return { ...prev, visaMasterDays: nextDays };
    });
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(form);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleReset = () => {
    if (window.confirm('¿Seguro que deseás restablecer los valores de promociones predeterminados?')) {
      resetSettings();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    }
  };

  return (
    <section
      aria-labelledby="promo-settings-heading"
      className="mt-8 overflow-hidden rounded-3xl border border-sand-200 bg-white"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-sand-200 px-6 py-5">
        <div>
          <h2
            id="promo-settings-heading"
            className="text-lg font-semibold tracking-tight text-charcoal flex items-center gap-2"
          >
            <ShieldCheckIcon className="h-5 w-5 text-terracotta" />
            Configuración de Promociones y Medios de Pago
          </h2>
          <p className="mt-1 text-sm text-charcoal-500">
            Administrá los días activos para cuotas sin interés en Posnet, Tarjeta Naranja X y descuentos por transferencia.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {savedSuccess && (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-full animate-fade-in">
              <CheckCircle2Icon className="h-4 w-4" />
              ¡Cambios guardados con éxito!
            </span>
          )}
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex h-10 items-center gap-2 rounded-full border border-sand-200 px-4 text-xs font-medium text-charcoal-600 hover:bg-sand-50"
          >
            <RotateCcwIcon className="h-3.5 w-3.5" />
            Restablecer
          </button>
        </div>
      </div>

      <form onSubmit={handleSave} className="p-6 sm:p-8 space-y-8">
        {/* Bloque 1: Visa & Mastercard */}
        <div className="rounded-2xl border border-sand-200 p-5 bg-sand-50/50 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1">
                <VisaMark className="h-6 w-10 text-xs" />
                <MastercardMark className="h-6 w-10" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  Promoción Visa y Mastercard (Posnet)
                </h3>
                <p className="text-xs text-charcoal-500">
                  {form.visaMasterInstallments} cuotas sin interés en los días seleccionados
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-medium text-charcoal-600">Promo Habilitada</span>
              <input
                type="checkbox"
                checked={form.visaMasterEnabled}
                onChange={(e) => setForm({ ...form, visaMasterEnabled: e.target.checked })}
                className="h-4 w-4 rounded text-terracotta focus:ring-terracotta"
              />
            </label>
          </div>

          {/* Días activos */}
          <div className="pt-3 border-t border-sand-200">
            <label className="block text-xs font-semibold text-charcoal mb-2">
              Días de la semana con cuotas sin interés:
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2">
              {DAY_NAMES.map((dayName, idx) => {
                const isSelected = form.visaMasterDays.includes(idx);
                const isToday = new Date().getDay() === idx;
                return (
                  <button
                    key={dayName}
                    type="button"
                    onClick={() => handleDayToggle(idx)}
                    className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-xs font-medium transition-all ${
                      isSelected
                        ? 'border-terracotta bg-terracotta text-white shadow-sm font-semibold'
                        : 'border-sand-200 bg-white text-charcoal-600 hover:bg-sand-50'
                    }`}
                  >
                    <span>{dayName}</span>
                    {isToday && (
                      <span
                        className={`text-[9px] mt-0.5 ${
                          isSelected ? 'text-white/90' : 'text-terracotta'
                        }`}
                      >
                        (Hoy)
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Modo prueba */}
          <div className="flex items-center justify-between rounded-xl bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
            <div className="flex items-center gap-2">
              <AlertCircleIcon className="h-4 w-4 shrink-0 text-amber-700" />
              <div>
                <span className="font-semibold">Modo prueba / Forzar promo hoy: </span>
                <span>
                  Permite que en el checkout siempre se active la promo de 3 cuotas para verificar su funcionamiento cualquier día.
                </span>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer shrink-0 ml-3">
              <input
                type="checkbox"
                checked={form.visaMasterForceActiveForTesting}
                onChange={(e) =>
                  setForm({ ...form, visaMasterForceActiveForTesting: e.target.checked })
                }
                className="sr-only peer"
              />
              <div className="w-9 h-5 bg-sand-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-sand-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
        </div>

        {/* Bloque 2: Tarjeta Naranja X */}
        <div className="rounded-2xl border border-sand-200 p-5 bg-sand-50/50 space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <NaranjaMark className="h-7" />
              <div>
                <h3 className="text-sm font-semibold text-charcoal">
                  Tarjeta Naranja X · Plan Z
                </h3>
                <p className="text-xs text-charcoal-500">
                  {form.naranjaInstallments} cuotas cero interés vigente todos los días
                </p>
              </div>
            </div>

            <label className="flex items-center gap-2 cursor-pointer">
              <span className="text-xs font-medium text-charcoal-600">Habilitada</span>
              <input
                type="checkbox"
                checked={form.naranjaEnabled}
                onChange={(e) => setForm({ ...form, naranjaEnabled: e.target.checked })}
                className="h-4 w-4 rounded text-terracotta focus:ring-terracotta"
              />
            </label>
          </div>
        </div>

        {/* Bloque 3: Transferencia Bancaria */}
        <div className="rounded-2xl border border-sand-200 p-5 bg-sand-50/50 space-y-4">
          <div className="flex items-center gap-2">
            <PercentIcon className="h-5 w-5 text-emerald-700" />
            <h3 className="text-sm font-semibold text-charcoal">
              Descuento por Transferencia Bancaria y Datos del Comercio
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Porcentaje de descuento (%):
              </label>
              <input
                type="number"
                min="0"
                max="50"
                value={form.transferDiscountPercentage}
                onChange={(e) =>
                  setForm({ ...form, transferDiscountPercentage: Number(e.target.value) })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Banco:
              </label>
              <input
                type="text"
                value={form.bankInfo.bankName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankInfo: { ...form.bankInfo, bankName: e.target.value },
                  })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Titular de la cuenta:
              </label>
              <input
                type="text"
                value={form.bankInfo.accountHolder}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankInfo: { ...form.bankInfo, accountHolder: e.target.value },
                  })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                CUIT:
              </label>
              <input
                type="text"
                value={form.bankInfo.cuit}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankInfo: { ...form.bankInfo, cuit: e.target.value },
                  })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                Alias:
              </label>
              <input
                type="text"
                value={form.bankInfo.alias}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankInfo: { ...form.bankInfo, alias: e.target.value },
                  })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm font-mono text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-charcoal mb-1">
                CBU:
              </label>
              <input
                type="text"
                value={form.bankInfo.cbu}
                onChange={(e) =>
                  setForm({
                    ...form,
                    bankInfo: { ...form.bankInfo, cbu: e.target.value },
                  })
                }
                className="h-10 w-full rounded-xl border border-sand-200 bg-white px-3 text-sm font-mono text-charcoal focus:border-emerald-600 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Botón de Guardar */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t border-sand-200">
          <button
            type="submit"
            className="inline-flex h-12 items-center gap-2 rounded-full bg-terracotta px-8 text-sm font-semibold text-white shadow-soft transition-colors duration-150 ease-out hover:bg-terracotta-600"
          >
            <SaveIcon className="h-4 w-4" />
            Guardar cambios de promociones
          </button>
        </div>
      </form>
    </section>
  );
}
