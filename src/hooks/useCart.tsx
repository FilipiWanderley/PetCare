'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartLogic } from '@/lib/cart';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number | null;
  image: string;
  isSale?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  deleteFromCart: (productId: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalValue: number;
  isInitialized: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    // Wrap in setTimeout to avoid "setState synchronously within effect" warning
    // This is safe because we want to trigger a re-render after hydration anyway
    setTimeout(() => {
      const savedCart = localStorage.getItem('petcare_cart');
      if (savedCart) {
        try {
          setCart(JSON.parse(savedCart));
        } catch (e) {
          console.error('Failed to parse cart from localStorage', e);
        }
      }
      setIsInitialized(true);
    }, 0);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('petcare_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => CartLogic.addToCart(prevCart, product));
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => CartLogic.removeFromCart(prevCart, productId));
  };

  const deleteFromCart = (productId: number) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
  };

  const { totalItems, totalValue } = CartLogic.calculateTotals(cart);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        deleteFromCart,
        clearCart,
        totalItems,
        totalValue,
        isInitialized,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
