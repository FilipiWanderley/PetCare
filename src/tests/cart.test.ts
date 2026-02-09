import { describe, it, expect } from 'vitest';
import { CartLogic } from '@/lib/cart';
import { Product } from '@/hooks/useCart';

describe('Cart Business Logic', () => {
  const mockProduct: Product = {
    id: 1,
    name: 'Test Product',
    price: 100,
    image: 'test.jpg',
  };

  it('should add item to empty cart', () => {
    const cart = CartLogic.addToCart([], mockProduct);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(1);
  });

  it('should increment quantity if item exists', () => {
    const initialCart = [{ ...mockProduct, quantity: 1 }];
    const cart = CartLogic.addToCart(initialCart, mockProduct);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(2);
  });

  it('should remove item when quantity is 1', () => {
    const initialCart = [{ ...mockProduct, quantity: 1 }];
    const cart = CartLogic.removeFromCart(initialCart, mockProduct.id);
    expect(cart).toHaveLength(0);
  });

  it('should decrement quantity when > 1', () => {
    const initialCart = [{ ...mockProduct, quantity: 2 }];
    const cart = CartLogic.removeFromCart(initialCart, mockProduct.id);
    expect(cart).toHaveLength(1);
    expect(cart[0].quantity).toBe(1);
  });

  it('should calculate totals correctly', () => {
    const cart = [
      { ...mockProduct, quantity: 2 }, // 200
      { ...mockProduct, id: 2, price: 50, quantity: 1 }, // 50
    ];
    const { totalItems, totalValue } = CartLogic.calculateTotals(cart);
    expect(totalItems).toBe(3);
    expect(totalValue).toBe(250);
  });
});
