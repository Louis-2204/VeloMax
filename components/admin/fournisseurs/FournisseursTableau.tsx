'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal, Sheet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTable } from '@/components/DataTable';
import { useState } from 'react';
import { FournisseurTableau, Vendeur } from '@/types/entities';
import dynamic from 'next/dynamic';
import DialogUpdateFournisseur from './DialogUpdateFournisseur';
import SheetFournisseur from './DrawerFournisseur';

// const AlertDeleteUser = dynamic(() => import('../AlertDeleteUser'));
// const DialogUpdateVendeur = dynamic(() => import('./DialogUpdateVendeur'));

const FournisseursTableau = ({
  fournisseurs,
  is_admin,
  pieces,
}: {
  fournisseurs: FournisseurTableau[];
  is_admin: boolean;
  pieces: any;
}) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [drawerUpdateOpen, setDrawerUpdateOpen] = useState(false);
  const [drawerType, setDrawerType] = useState<'ajout' | 'modification'>('ajout');
  const [selectedFournisseur, setSelectedFournisseur] = useState({} as FournisseurTableau);

  const showDrawerUpdate = () => {
    setDrawerUpdateOpen(true);
  };

  const onCloseDrawerUpdate = () => {
    setDrawerUpdateOpen(false);
  };

  const columns: ColumnDef<FournisseurTableau>[] = [
    {
      accessorKey: 'nom_entreprise',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nom de l'entreprise
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: "Nom de l'entreprise",
    },
    {
      accessorKey: 'nom_contact',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nom du contact
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Nom du contact',
    },
    {
      accessorKey: 'adresse',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Adresse
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Adresse',
    },
    {
      accessorKey: 'ville',
      header: 'Ville',
      id: 'Ville',
    },
    {
      accessorKey: 'cp',
      header: 'Code postal',
      id: 'cp',
    },
    {
      accessorKey: 'libelle',
      header: 'Libelle',
      id: 'libelle',
    },
    {
      id: 'actions',
      enableHiding: false,
      header: '',
      cell: ({ row }) => {
        const fournisseurRow = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedFournisseur(fournisseurRow);
                  setDialogOpen(true);
                }}
              >
                Modifier le fournisseur
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedFournisseur(fournisseurRow);
                  setDrawerType('modification');
                  showDrawerUpdate();
                }}
              >
                Modifier le catalogue
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedFournisseur(fournisseurRow);
                  setAlertOpen(true);
                }}
              >
                Supprimer le fournisseur
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return (
    <div className="w-full max-w-[1200px]">
      <DataTable
        columns={columns}
        data={fournisseurs}
        column_filter="Nom de l'entreprise"
        placeholder_filtre="Rechercher un fournisseur (nom)"
        additionalButton={
          <Button
            variant={'outline'}
            onClick={() => {
              setSelectedFournisseur({} as FournisseurTableau);
              setDrawerType('ajout');
              showDrawerUpdate();
            }}
          >
            Ajouter un fournisseur
          </Button>
        }
      />
      {/* {alertOpen && (
        <AlertDeleteUser
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          selectedUser={selectedVendeur}
          label="vendeur"
        />
      )} */}

      {drawerUpdateOpen && (
        <SheetFournisseur
          open={drawerUpdateOpen}
          onClose={onCloseDrawerUpdate}
          fournisseur={selectedFournisseur}
          pieces={pieces}
          actionType={drawerType}
        />
      )}

      {dialogOpen && (
        <DialogUpdateFournisseur
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedFournisseur={selectedFournisseur}
          is_admin={is_admin}
        />
      )}
    </div>
  );
};

export default FournisseursTableau;
