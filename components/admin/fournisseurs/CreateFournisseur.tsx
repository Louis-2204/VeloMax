import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { createFournisseur } from '@/utils/fournisseurs/createFournisseur';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
const CreateFournisseur = ({ pieces, onClose }: { pieces: any; onClose: () => void }) => {
  const router = useRouter();
  const [newNomEntreprise, setNewNomEntreprise] = useState('');
  const [newNomContact, setNewNomContact] = useState('');
  const [newSiret, setNewSiret] = useState('');
  const [newAdresse, setNewAdresse] = useState('');
  const [newVille, setNewVille] = useState('');
  const [newCp, setNewCp] = useState('');
  const [newLibelle, setNewLibelle] = useState<string | null>(null);
  const [newCatalogue, setNewCatalogue] = useState<
    {
      id_piece: string;
      image_piece: string;
      nom_piece: string;
      prix_fournisseur: number;
      delai_approvisionnement: number;
      numero_catalogue: number;
    }[]
  >([]);
  const [newPiece, setNewPiece] = useState<{
    id_piece: string;
    image: string;
    nom: string;
  }>();
  const [newNumeroCatalogue, setNewNumeroCatalogue] = useState<number>();
  const [newPrixFournisseur, setNewPrixFournisseur] = useState<number>();
  const [newDelaiApprovisionnement, setNewDelaiApprovisionnement] = useState<number>();

  const handleSelectPiece = (id_piece: string) => {
    const piece = pieces.find((piece: any) => piece.id_piece === id_piece);
    setNewPiece({
      id_piece: piece.id_piece,
      image: piece.image,
      nom: piece.nom,
    });
  };

  const triggerAjouter = () => {
    if (!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur || !newPiece || !newSiret) return;
    setNewCatalogue([
      ...newCatalogue,
      {
        id_piece: newPiece.id_piece,
        image_piece: newPiece.image,
        nom_piece: newPiece.nom,
        prix_fournisseur: newPrixFournisseur,
        delai_approvisionnement: newDelaiApprovisionnement,
        numero_catalogue: newNumeroCatalogue,
      },
    ]);
    setNewPiece(undefined);
    setNewNumeroCatalogue(0);
    setNewPrixFournisseur(0);
    setNewDelaiApprovisionnement(0);
  };

  const removeItem = (item: any) => {
    setNewCatalogue(newCatalogue.filter((catalogueItem) => catalogueItem.id_piece !== item.id_piece));
  };

  const handleCreateFournisseur = async () => {
    const isCreated = await createFournisseur(
      newNomEntreprise,
      newNomContact,
      newAdresse,
      newVille,
      newCp,
      newLibelle,
      newCatalogue.map((item) => ({
        numero_catalogue: item.numero_catalogue,
        prix_fournisseur: item.prix_fournisseur,
        delai_approvisionnement: item.delai_approvisionnement,
        id_piece: item.id_piece,
      }))
    );
    if (!isCreated) {
      toast.error("Une erreur est survenue lors de l'ajout");
    } else {
      toast.success("L'ajout a été effectué avec succès");
      setNewNomEntreprise('');
      setNewNomContact('');
      setNewAdresse('');
      setNewVille('');
      setNewCp('');
      setNewLibelle('');
      setNewCatalogue([]);
      onClose();
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="nom_entreprise">Nom de l'entreprise</Label>
        <Input
          placeholder="Nom de l'entreprise"
          id="nom_entreprise"
          type="text"
          value={newNomEntreprise}
          onChange={(e) => setNewNomEntreprise(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="nom_contact">Nom du contact</Label>
        <Input
          placeholder="Nom du contact"
          id="nom_contact"
          type="text"
          value={newNomContact}
          onChange={(e) => setNewNomContact(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="siret">Siret</Label>
        <Input
          placeholder="Siret"
          id="siret"
          type="text"
          value={newSiret}
          onChange={(e) => setNewSiret(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="adresse">Adresse</Label>
        <Input
          placeholder="Adresse"
          id="adresse"
          type="text"
          value={newAdresse}
          onChange={(e) => setNewAdresse(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="ville">Ville</Label>
        <Input
          placeholder="Ville"
          id="ville"
          type="text"
          value={newVille}
          onChange={(e) => setNewVille(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="cp">Code postal</Label>
        <Input placeholder="Code postal" id="cp" type="text" value={newCp} onChange={(e) => setNewCp(e.target.value)} />
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Label htmlFor="libelle">Libelle (optionnel)</Label>
        <Select onValueChange={(value) => setNewLibelle(value)} value={newLibelle || undefined}>
          <SelectTrigger>
            <SelectValue placeholder="Libelle" />
          </SelectTrigger>
          <SelectContent className="z-[500000000]">
            <SelectItem key={'Très bon'} value={'Très bon'} className="px-2">
              Très bon
            </SelectItem>
            <SelectItem key={'Bon'} value={'Bon'} className="px-2">
              Bon
            </SelectItem>
            <SelectItem key={'Moyen'} value={'Moyen'} className="px-2">
              Moyen
            </SelectItem>
            <SelectItem key={'Mauvais'} value={'Mauvais'} className="px-2">
              Mauvais
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-2 w-full">
        {newCatalogue.length === 0 ? (
          <p className="text-red-500">Veuillez ajouter des articles au catalogue</p>
        ) : (
          newCatalogue.map((item) => (
            <Card className={`mb-4 p-4 items-center flex flex-col gap-2 pt-2`}>
              <div className="flex w-full justify-end">
                <svg
                  onClick={() => removeItem(item)}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6 text-red-700 cursor-pointer"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="flex w-full justify-between">
                <div className="flex flex-col">
                  <p>Numéro catalogue : {item.numero_catalogue}</p>
                  <p>Pièce : {item.nom_piece}</p>
                  <p>Prix fournisseur : {item.prix_fournisseur} €</p>
                  <p>Délai d'approvisionnement : {item.delai_approvisionnement} jours</p>
                </div>
                <div className="w-2/12 h-fit !aspect-square relative rounded-md overflow-hidden">
                  <Image fill alt={item.nom_piece} src={item.image_piece} />
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
      <div className="flex flex-col gap-2 w-full">
        <Card>
          <div className="flex flex-col gap-2 p-2 w-full">
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="piece">Pièce</Label>
              <Select onValueChange={(value) => handleSelectPiece(value)} value={newPiece?.id_piece}>
                <SelectTrigger>
                  <SelectValue placeholder="Piece" />
                </SelectTrigger>
                <SelectContent className="z-[500000000]">
                  {pieces &&
                    pieces.length > 0 &&
                    pieces
                      .filter((piece: any) => !newCatalogue?.find((item) => item.id_piece === piece.id_piece))
                      .map((piece: any) => (
                        <SelectItem key={piece.id_piece} value={piece.id_piece} className="px-2">
                          <div className="flex flex-row items-center gap-2">
                            <div className="w-[30px] h-[30px] aspect-square relative rounded-md overflow-hidden">
                              <Image fill src={piece.image} alt={piece.nom} />
                            </div>
                            <p>{piece.nom}</p>
                          </div>
                        </SelectItem>
                      ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="nom">Numéro du catalogue</Label>
              <Input
                placeholder="Numéro catalogue"
                id="numero_catalogue"
                type="number"
                value={newNumeroCatalogue}
                onChange={(e) => setNewNumeroCatalogue(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="prix_fournisseur">Prix du fournisseur</Label>
              <Input
                placeholder="Prix du fournisseur"
                id="prix_fournisseur"
                type="number"
                value={newPrixFournisseur}
                onChange={(e) => setNewPrixFournisseur(parseInt(e.target.value))}
              />
            </div>
            <div className="flex flex-col gap-1 w-full">
              <Label htmlFor="delai_approvisionnement">Délais d'approsionnement</Label>
              <Input
                placeholder="Délais d'approsionnement"
                id="delai_approvisionnement"
                type="number"
                value={newDelaiApprovisionnement}
                onChange={(e) => setNewDelaiApprovisionnement(parseInt(e.target.value))}
              />
            </div>
            <div className="flex justify-around mt-2">
              <Button
                disabled={!newDelaiApprovisionnement || !newNumeroCatalogue || !newPrixFournisseur || !newPiece}
                variant={'outline'}
                className="w-full bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white"
                onClick={() => triggerAjouter()}
              >
                Ajouter
              </Button>
            </div>
          </div>
        </Card>
        <Button
          disabled={
            !newNomEntreprise ||
            !newNomContact ||
            !newAdresse ||
            !newVille ||
            !newCp ||
            !newSiret ||
            newCatalogue.length === 0
          }
          className="w-full bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white"
          onClick={() => handleCreateFournisseur()}
        >
          Créer le fournisseur
        </Button>
      </div>
    </div>
  );
};

export default CreateFournisseur;
