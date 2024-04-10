'use client';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { Button } from '../ui/button';
import { useContext } from 'react';
const AddToCartBtn = ({ item }: { item: any }) => {
  const { addToCart } = useContext(ShoppingCartContext);
  return (
    <Button
      onClick={() =>
        addToCart({
          id: item.id,
          nom: item.nom,
          prix: item.prix_unitaire,
          image: item.image,
        })
      }
      className="w-fit bg-vm_secondary text-white"
    >
      Ajouter au panier
    </Button>
  );
};

export default AddToCartBtn;
