import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { CartItem, Product } from '@/lib/types';
import { mockCartService } from '@/lib/mockServices';

interface CartContextType {
  items: CartItem[];
  itemCount: number;
  total: number;
  addToCart: (product: Product, quantity?: number) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>(mockCartService.getCart());

  const addToCart = useCallback((product: Product, quantity: number = 1) => {
    const updatedCart = mockCartService.addToCart(product, quantity);
    setItems(updatedCart);
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    const updatedCart = mockCartService.updateQuantity(productId, quantity);
    setItems(updatedCart);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    const updatedCart = mockCartService.removeFromCart(productId);
    setItems(updatedCart);
  }, []);

  const clearCart = useCallback(() => {
    mockCartService.clearCart();
    setItems([]);
  }, []);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  return (
    <CartContext.Provider value={{
      items,
      itemCount,
      total,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
