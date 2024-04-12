'use client';
import { FournisseurTableau } from '@/types/entities';
import { Drawer } from 'antd';
import UpdateFournisseurCatalogue from './UpdateFournisseurCatalogue';
import CreateFournisseur from './CreateFournisseur';
const DrawerFournisseur = ({
  open,
  onClose,
  fournisseur,
  pieces,
  actionType,
}: {
  open: boolean;
  onClose: () => void;
  fournisseur: FournisseurTableau;
  pieces: any;
  actionType: 'ajout' | 'modification';
}) => {
  return (
    <Drawer
      classNames={{ body: 'bg-white dark:bg-black', header: 'bg-white dark:bg-black' }}
      title={
        actionType === 'modification' ? (
          <h3 className="dark:text-white"> Modifier le catalogue de {fournisseur.nom_entreprise}</h3>
        ) : (
          <h3 className="dark:text-white"> Ajouter un fournisseur</h3>
        )
      }
      closeIcon={
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 dark:invert"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
        </svg>
      }
      width={500}
      onClose={onClose}
      open={open}
    >
      {actionType === 'modification' && <UpdateFournisseurCatalogue fournisseur={fournisseur} pieces={pieces} />}
      {actionType === 'ajout' && <CreateFournisseur pieces={pieces} onClose={onClose} />}
    </Drawer>
  );
};

export default DrawerFournisseur;
