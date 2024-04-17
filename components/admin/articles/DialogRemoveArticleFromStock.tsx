import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getFournisseursByIdItems } from '@/utils/getFournisseursByIdItem';
import Image from 'next/image';
import { removePieceFromStock } from '@/utils/removePieceFromStock';

const DialogRemoveArticleFromStock = ({
  dialogOpen,
  setDialogOpen,
  id_boutique,
  articles,
}: {
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  id_boutique: string;
  articles: any;
}) => {
  const [newArticle, setNewArticle] = useState<string>();
  const [newQuantite, setNewQuantite] = useState<number>();
  const [newFournisseur, setNewFournisseur] = useState<string>();
  const [allFournisseurs, setAllFournisseurs] = useState<undefined | any[]>();

  useEffect(() => {
    setNewFournisseur(undefined);
    setNewQuantite(undefined);
    if (!newArticle) return;
    const fetchFournisseurs = async () => {
      const data = await getFournisseursByIdItems(newArticle);
      setAllFournisseurs(data);
    };
    fetchFournisseurs();
  }, [newArticle]);

  const router = useRouter();
  const handleAddArticle = async () => {
    if (isDisabled()) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }
    let data: any;
    let table: 'boutiques_pieces_fournisseurs' | 'boutiques_velos';

    if (articles.find((article: any) => article.id_piece === newArticle)) {
      data = {
        id_piece: newArticle,
        id_fournisseur: newFournisseur,
        id_boutique: id_boutique,
        quantite: newQuantite,
      };
      table = 'boutiques_pieces_fournisseurs';
    } else {
      data = {
        id_velo: newArticle,
        id_boutique: id_boutique,
        quantite: newQuantite,
      };
      table = 'boutiques_velos';
    }

    const is_created = await removePieceFromStock(data, table);
    setDialogOpen(false);
    if (is_created) {
      const toastMessage = data.quantite === 1 ? 'Article retiré avec succès' : 'Articles retirés avec succès';
      toast.success(toastMessage);
    } else {
      const toastMessage = data.quantite === 1 ? 'Erreur lors de la suppression de l\'article' : 'Erreur lors de la suppression des articles';
      toast.error(toastMessage);
    }
    router.refresh();
  };

  const isDisabled = () => {
    if (!newArticle) return true;
    if (!newQuantite) return true;
    if (newArticle && !articles.find((article: any) => article.id_piece === newArticle)) return false;
    if (newArticle && articles.find((article: any) => article.id_piece === newArticle) && !newFournisseur) return true;
  };

  return (
    <Dialog open={dialogOpen}>
      <DialogContent className="sm:max-w-[425px] overflow-y-auto max-h-screen">
        <DialogHeader>
          <DialogTitle>Retirer un article du stock</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="article" className="text-right">
              Article
            </Label>
            <Select name="article" onValueChange={(value) => setNewArticle(value)}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder={<span className="opacity-80">Séléctionner un article</span>} />
              </SelectTrigger>
              <SelectContent>
                {articles &&
                  articles.length > 0 &&
                  articles.map((article: any) => (
                    <SelectItem
                      key={`select-${article.id_velo || article.id_piece}`}
                      value={article.id_velo || article.id_piece}
                      className="ps-1"
                    >
                      <div className="flex gap-2 items-center ">
                        <Image src={article.image} alt={article.nom} width={40} height={40} className="rounded-md" />
                        {article.nom}
                      </div>
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="quantite" className="text-right">
              Quantite
            </Label>
            <Input
              className="col-span-3"
              type="number"
              placeholder="Indiquer la quantité"
              name="quantite"
              onChange={(e: any) => setNewQuantite(Number(e.target.value))}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            {allFournisseurs === undefined &&
              newArticle &&
              articles.find((article: any) => article.id_piece === newArticle) && (
                <p className="col-span-4 text-center">Aucun fournisseur ne fournit cet article</p>
              )}

            {allFournisseurs && allFournisseurs.length > 0 && (
              <>
                <Label htmlFor="fournisseurs" className="text-right">
                  Fournisseurs
                </Label>
                <Select name="fournisseurs" onValueChange={(value) => setNewFournisseur(value)}>
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder={<span className="opacity-80">Séléctionner un fournisseur</span>} />
                  </SelectTrigger>
                  <SelectContent>
                    {allFournisseurs &&
                      allFournisseurs.length > 0 &&
                      allFournisseurs.map((fournisseur: any) => (
                        <SelectItem
                          key={`select-${fournisseur.id_fournisseur}`}
                          value={fournisseur.id_fournisseur}
                          className="ps-1"
                        >
                          <div className="flex gap-2 items-center ">{fournisseur.nom_entreprise}</div>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </>
            )}
          </div>
        </div>
        <DialogFooter>
          <Button onClick={() => setDialogOpen(false)}>Annuler</Button>
          <Button
            disabled={isDisabled()}
            onClick={() => {
              handleAddArticle();
            }}
          >
            Retirer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogRemoveArticleFromStock;
