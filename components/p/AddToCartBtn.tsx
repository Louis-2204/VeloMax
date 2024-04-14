'use client';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { Button } from '../ui/button';
import { useContext, useRef } from 'react';
import Link from 'next/link';
const AddToCartBtn = ({ item, profileConnected }: { item: any; profileConnected: any }) => {
  const is_connected = profileConnected !== null;
  const can_buy =
    (is_connected && profileConnected.role === 'particulier') ||
    (is_connected && profileConnected.role === 'professionnel');
  const { addToCart } = useContext(ShoppingCartContext);
  const loginRef = useRef<HTMLAnchorElement>(null);

  const type = 'id_velo' in item ? 'vélo' : 'pièce';

  return (
    <>
      <Button
        onClick={() => {
          if (!is_connected) {
            loginRef.current?.click();
            return;
          }

          if (can_buy) {
            addToCart({
              id: item.id_velo || item.id_piece,
              nom: item.nom,
              prix: item.prix_unitaire,
              image: item.image,
              type: type,
            });
          }
        }}
        className="w-fit bg-vm_secondary text-white"
      >
        {can_buy
          ? 'Ajouter au panier'
          : is_connected
          ? "Votre compte ne vous permet pas d'acheter"
          : 'Ajouter au panier'}
      </Button>
      <Link href="/login" className="hidden" ref={loginRef}></Link>
    </>
  );
};

export default AddToCartBtn;
