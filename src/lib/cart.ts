import { Product, CartItem } from '@/hooks/useCart';

export const CartLogic = {
  addToCart: (cart: CartItem[], product: Product): CartItem[] => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      return cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    }
    return [...cart, { ...product, quantity: 1 }];
  },

  removeFromCart: (cart: CartItem[], productId: number): CartItem[] => {
    const existingItem = cart.find((item) => item.id === productId);
    if (existingItem && existingItem.quantity > 1) {
      return cart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      );
    }
    return cart.filter((item) => item.id !== productId);
  },

  calculateTotals: (cart: CartItem[]) => {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    const totalValue = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    return { totalItems, totalValue };
  },
};
