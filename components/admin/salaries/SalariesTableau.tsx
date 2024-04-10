'use client';
import { ColumnDef } from '@tanstack/react-table';
import { ArrowUpDown, MoreHorizontal } from 'lucide-react';
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
import { Vendeur } from '@/types/entities';
import dynamic from 'next/dynamic';

const AlertDeleteVendeur = dynamic(() => import('./AlertDeleteVendeur'));
const DialogUpdateVendeur = dynamic(() => import('./DialogUpdateVendeur'));

const SalariesTableau = ({ salaries }: { salaries: Vendeur[] }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVendeur, setSelectedVendeur] = useState({} as Vendeur);

  const columns: ColumnDef<Vendeur>[] = [
    {
      accessorKey: 'nom',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'nom',
    },
    {
      accessorKey: 'prenom',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Prénom
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'prenom',
    },
    {
      accessorKey: 'temps',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Temps
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'temps',
    },
    {
      accessorKey: 'date_embauche',
      header: "Date d'embauche",
      id: 'date_embauche',
      cell: ({ row }) => {
        const vendeur = row.original;
        return new Date(vendeur.date_embauche).toLocaleDateString();
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: '',
      cell: ({ row }) => {
        const vendeurRow = row.original;

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
                  setSelectedVendeur(vendeurRow);
                  setDialogOpen(true);
                }}
              >
                Modifier le vendeur
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedVendeur(vendeurRow);
                  setAlertOpen(true);
                }}
              >
                Supprimer le vendeur
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
        data={salaries}
        column_filter="nom"
        placeholder_filtre="Rechercher un vendeur (nom)"
      />
      {alertOpen && (
        <AlertDeleteVendeur alertOpen={alertOpen} setAlertOpen={setAlertOpen} selectedVendeur={selectedVendeur} />
      )}
      {dialogOpen && (
        <DialogUpdateVendeur dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} selectedVendeur={selectedVendeur} />
      )}
    </div>
  );
};

export default SalariesTableau;
