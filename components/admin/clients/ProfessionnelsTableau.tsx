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
import { Professionnel } from '@/types/entities';
import dynamic from 'next/dynamic';
import { Badge } from '@/components/ui/badge';
const AlertDeleteUser = dynamic(() => import('../AlertDeleteUser'));
const DialogUpdateProfessionnel = dynamic(() => import('./DialogUpdateProfessionnel'));

const ProfessionnelsTableau = ({ professionnels }: { professionnels: Professionnel[] }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedProfessionnel, setSelectedProfessionnel] = useState({} as Professionnel);

  const columns: ColumnDef<Professionnel>[] = [
    {
      accessorKey: 'nom_compagnie',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Nom de la compagnie
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Nom de la compagnie',
    },
    {
      accessorKey: 'nom_contact',
      header: 'Nom du contact',
      id: 'Nom du contact',
    },
    {
      accessorKey: 'adresse',
      header: 'Adresse',
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
      id: 'Code postal',
    },
    {
      accessorKey: 'province',
      header: 'Province',
      id: 'Province',
    },
    {
      accessorKey: 'telephone',
      header: 'Téléphone',
      id: 'Téléphone',
    },
    {
      accessorKey: 'remise_commerciale',
      header: 'Remise (en %)',
      id: 'Remise',
      cell: ({ row }) => {
        const professionnel = row.original;
        return <Badge>{professionnel.remise_commerciale ? professionnel.remise_commerciale : 'Aucune'}</Badge>;
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: '',
      cell: ({ row }) => {
        const particulierRow = row.original;

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
                  setSelectedProfessionnel(particulierRow);
                  setDialogOpen(true);
                }}
              >
                Modifier le client
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedProfessionnel(particulierRow);
                  setAlertOpen(true);
                }}
              >
                Supprimer le client
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
        data={professionnels}
        column_filter="nom"
        placeholder_filtre="Rechercher un client (nom compagnie)"
      />
      {alertOpen && (
        <AlertDeleteUser
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          selectedUser={selectedProfessionnel}
          label="client"
        />
      )}
      {dialogOpen && (
        <DialogUpdateProfessionnel
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedProfessionnel={selectedProfessionnel}
        />
      )}
    </div>
  );
};

export default ProfessionnelsTableau;
