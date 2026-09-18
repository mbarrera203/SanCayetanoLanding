import React, { createContext, useContext, useEffect, useState } from 'react';

export interface BankInfo {
  bankName: string;
  accountHolder: string;
  cuit: string;
  alias: string;
  cbu: string;
}

export interface PromotionSettings {
  // Visa & Mastercard
  visaMasterEnabled: boolean;
  visaMasterInstallments: number;
  visaMasterDays: number[]; // 0 = Domingo, 1 = Lunes, 2 = Martes, 3 = Miércoles, 4 = Jueves, 5 = Viernes, 6 = Sábado
  visaMasterForceActiveForTesting: boolean;

  // Naranja X
  naranjaEnabled: boolean;
  naranjaInstallments: number;

  // Transferencia bancaria
  transferDiscountPercentage: number;
  bankInfo: BankInfo;
}

export const DEFAULT_SETTINGS: PromotionSettings = {
  visaMasterEnabled: true,
  visaMasterInstallments: 3,
  visaMasterDays: [3, 6], // Miércoles (3) y Sábados (6)
  visaMasterForceActiveForTesting: true, // Habilitado por defecto para facilitar pruebas cualquier día
  naranjaEnabled: true,
  naranjaInstallments: 3,
  transferDiscountPercentage: 15,
  bankInfo: {
    bankName: 'Banco de la Nación Argentina',
    accountHolder: 'San Cayetano Muebles S.R.L.',
    cuit: '30-71234567-8',
    alias: 'SANCAYETANO.MUEBLES',
    cbu: '0110485520048550123456',
  },
};

const STORAGE_KEY = 'san_cayetano_promo_settings_v1';

interface SettingsContextValue {
  settings: PromotionSettings;
  updateSettings: (newSettings: Partial<PromotionSettings>) => void;
  resetSettings: () => void;
  isVisaMasterPromoActiveToday: () => boolean;
  getTodayDayName: () => string;
}

const SettingsContext = createContext<SettingsContextValue | undefined>(undefined);

export const DAY_NAMES = [
  'Domingo',
  'Lunes',
  'Martes',
  'Miércoles',
  'Jueves',
  'Viernes',
  'Sábado',
];

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<PromotionSettings>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...DEFAULT_SETTINGS, ...JSON.parse(saved) };
      }
    } catch {
      // Ignorar error de parsing
    }
    return DEFAULT_SETTINGS;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
    } catch {
      // Ignorar error de guardado
    }
  }, [settings]);

  const updateSettings = (newSettings: Partial<PromotionSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  const isVisaMasterPromoActiveToday = (): boolean => {
    if (!settings.visaMasterEnabled) return false;
    if (settings.visaMasterForceActiveForTesting) return true;
    const today = new Date().getDay();
    return settings.visaMasterDays.includes(today);
  };

  const getTodayDayName = (): string => {
    return DAY_NAMES[new Date().getDay()];
  };

  return (
    <SettingsContext.Provider
      value={{
        settings,
        updateSettings,
        resetSettings,
        isVisaMasterPromoActiveToday,
        getTodayDayName,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings(): SettingsContextValue {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
