import Image from "next/image";
import { Button } from "./ui/button";


const RecapProduits = ({ items, addToCart, removeFromCart, type }: { items: any[]; addToCart?: (item: any) => void; removeFromCart?: any, type?: string }) => {

    return (
        <div className={`flex flex-col gap-3 w-full lg:min-w-7/12 ${type !== 'detailCommande' && type !== 'commandeAprendreEnCharge' ? 'pb-6' : ''}`}>
            {
                items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center w-full p-3 h-32 border rounded-md border-vm_bg_lightgray">
                        <div className="flex h-full gap-4 items-center">
                            <Image alt="produit" src={item.image} width={100} height={100} className="rounded-md min-w-[6.5rem] min-h-[6.5rem] border p-1 overflow-hidden" />
                            <div className="h-full justify-between flex flex-col">
                                <div className="font-extrabold text-lg text-vm_text_gray">{item.nom}</div>
                                {type !== 'detailCommande' && type !== 'commandeAprendreEnCharge' && (
                                    <div className="text-vm_text_gray_secondary hover:underline cursor-pointer" onClick={() => removeFromCart(item.id, true)}>
                                        Retirer
                                    </div>
                                )
                                }
                                {type === 'commandeAprendreEnCharge' && (
                                    <div className={`${item.nb_stock.quantite >= item.quantite ? 'text-green-500' : 'text-red-500'}`}>
                                        {
                                            item.type === 'vélo' ?
                                                item.nb_stock.quantite >= item.quantite
                                                    ? 'En stock (' + item.nb_stock.quantite + ' disponible' + (item.nb_stock.quantite > 1 ? 's' : '') + ')'
                                                    : 'Stock insuffisant (' + item.nb_stock.quantite + ' disponible' + (item.nb_stock.quantite > 1 ? 's' : '') + ', assez de pièces pour en assembler ' + Math.min(...item.pieces_velo.map((piece: any) => piece.nb_stock)) + ' de plus)'
                                                : item.nb_stock.quantite >= item.quantite
                                                    ? 'En stock (' + item.nb_stock.quantite + ' disponible' + (item.nb_stock.quantite > 1 ? 's' : '') + ')'
                                                    : 'Stock insuffisant (' + item.nb_stock.quantite + ' disponible' + (item.nb_stock.quantite > 1 ? 's' : '') + ')'
                                        }
                                    </div>
                                )
                                }
                            </div>
                        </div>
                        <div className="h-full justify-between flex flex-col items-end">
                            {type !== 'commandeAprendreEnCharge' ? (
                                <div className="font-bold text-lg text-vm_secondary flex gap-1">
                                    <span>
                                        {item.prix}
                                    </span>
                                    <span>
                                        €
                                    </span>
                                </div>
                            ) : (
                                <div />
                            )
                            }
                            <div className="text-vm_text_gray_secondary w-fit border rounded-md p-1 text-xs">
                                <div className="flex gap-3 px-1 justify-around items-center">
                                    {type !== 'detailCommande' && type !== 'commandeAprendreEnCharge' ?
                                        (
                                            <>
                                                <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => removeFromCart && removeFromCart(item.id)}>
                                                    -
                                                </Button>
                                                <div className="font-bold">{item.quantite}</div>
                                                <Button className="flex items-center justify-center font-bold h-1 w-1 p-2" onClick={() => addToCart && addToCart(item)}>
                                                    +
                                                </Button>
                                            </>
                                        ) : <div className="font-bold">x{item.quantite}</div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RecapProduits;