'use client';
import { createContext, ReactNode, useState } from 'react';

export const ShoppingCartContext = createContext({
  getCart: () => {
    return [] as { id: string; nom: string; quantite: number; prix: number; image: string }[];
  },
  addToCart: (product: { id: string; nom: string; prix: number; image: string }) => {},
  removeFromCart: (id: string) => {},
  clearCart: () => {},
});

export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ id: string; nom: string; quantite: number; prix: number; image: string }[]>([]);

  const addToCart = ({ id, nom, prix, image }: { id: string; nom: string; prix: number; image: string }) => {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      setCart(cart.map((product) => (product.id === id ? { ...product, quantite: product.quantite + 1 } : product)));
    } else {
      setCart([...cart, { id, nom, quantite: 1, prix, image }]);
    }
    // set to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const removeFromCart = (id: string) => {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct?.quantite === 1) {
      setCart(cart.filter((product) => product.id !== id));
    } else {
      setCart(cart.map((product) => (product.id === id ? { ...product, quantite: product.quantite - 1 } : product)));
    }
    // set to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const clearCart = () => {
    setCart([]);
    // set to local storage
    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const getCart = () => {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  };

  return (
    <ShoppingCartContext.Provider value={{ getCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
