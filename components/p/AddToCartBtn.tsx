'use client';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { Button } from '../ui/button';
import { useContext } from 'react';
const AddToCartBtn = ({ item }: { item: any }) => {
  const { addToCart } = useContext(ShoppingCartContext);


  const type = "id_velo" in item ? "vélo" : "pièce";

  return (
    <Button
      onClick={() =>
        addToCart({
          id: item.id_velo || item.id_piece,
          nom: item.nom,
          prix: item.prix_unitaire,
          image: item.image,
          type: type,
        })
      }
      className="w-fit bg-vm_secondary text-white"
    >
      Ajouter au panier
    </Button>
  );
};

export default AddToCartBtn;
