'use client';
import { createContext, ReactNode, useEffect, useState } from 'react';

export const ShoppingCartContext = createContext({
  getCart: () => {
    return [] as { id: string; nom: string; quantite: number; prix: number; image: string }[];
  },
  addToCart: (product: { id: string; nom: string; prix: number; image: string }) => { },
  removeFromCart: (id: string) => { },
  clearCart: () => { },
});


export const ShoppingCartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<{ id: string; nom: string; quantite: number; prix: number; image: string }[]>([]);
  const [isInit, setIsInit] = useState(false);

  useEffect(() => {
    if (isInit) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);


  useEffect(() => {
    const cart = localStorage.getItem('cart');
    if (cart) {
      setCart(JSON.parse(cart));
    }
    setIsInit(true);
  }, []);


  const addToCart = ({ id, nom, prix, image }: { id: string; nom: string; prix: number; image: string }) => {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct) {
      setCart(cart.map((product) => (product.id === id ? { ...product, quantite: product.quantite + 1 } : product)));
    } else {
      setCart([...cart, { id, nom, quantite: 1, prix, image }]);
    }
  };

  const removeFromCart = (id: string) => {
    const existingProduct = cart.find((product) => product.id === id);
    if (existingProduct?.quantite === 1) {
      setCart(cart.filter((product) => product.id !== id));
    } else {
      setCart(cart.map((product) => (product.id === id ? { ...product, quantite: product.quantite - 1 } : product)));
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCart = () => {
    return cart;
  };

  return (
    <ShoppingCartContext.Provider value={{ getCart, addToCart, removeFromCart, clearCart }}>
      {children}
    </ShoppingCartContext.Provider>
  );
};
