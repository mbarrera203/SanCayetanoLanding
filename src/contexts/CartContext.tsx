import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState } from
'react';
import { CartLine, Product } from '../types';

interface CartContextValue {
  lines: CartLine[];
  itemCount: number;
  subtotal: number;
  isCheckoutOpen: boolean;
  addItem: (product: Product) => void;
  setQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  openCheckout: () => void;
  closeCheckout: () => void;
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: {children: React.ReactNode;}) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setLines((current) => {
      const existing = current.find((line) => line.product.id === product.id);
      if (existing) {
        return current.map((line) =>
        line.product.id === product.id ?
        { ...line, quantity: line.quantity + 1 } :
        line
        );
      }
      return [...current, { product, quantity: 1 }];
    });
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    setLines((current) =>
    quantity <= 0 ?
    current.filter((line) => line.product.id !== productId) :
    current.map((line) =>
    line.product.id === productId ? { ...line, quantity } : line
    )
    );
  }, []);

  const removeItem = useCallback((productId: string) => {
    setLines((current) => current.filter((line) => line.product.id !== productId));
  }, []);

  const clearCart = useCallback(() => setLines([]), []);
  const openCheckout = useCallback(() => setIsCheckoutOpen(true), []);
  const closeCheckout = useCallback(() => setIsCheckoutOpen(false), []);

  const value = useMemo<CartContextValue>(() => {
    const itemCount = lines.reduce((total, line) => total + line.quantity, 0);
    const subtotal = lines.reduce(
      (total, line) => total + line.product.price * line.quantity,
      0
    );
    return {
      lines,
      itemCount,
      subtotal,
      isCheckoutOpen,
      addItem,
      setQuantity,
      removeItem,
      clearCart,
      openCheckout,
      closeCheckout
    };
  }, [
  lines,
  isCheckoutOpen,
  addItem,
  setQuantity,
  removeItem,
  clearCart,
  openCheckout,
  closeCheckout]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }
  return context;
}