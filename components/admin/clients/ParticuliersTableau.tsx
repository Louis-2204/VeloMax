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
import { ParticulierTableau } from '@/types/entities';
import { Badge } from '@/components/ui/badge';
import dynamic from 'next/dynamic';
const AlertDeleteUser = dynamic(() => import('../AlertDeleteUser'));
const DialogUpdateParticulier = dynamic(() => import('./DialogUpdateParticulier'));

const ParticuliersTableau = ({ particuliers }: { particuliers: ParticulierTableau[] }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedParticulier, setSelectedParticulier] = useState({} as ParticulierTableau);

  const columns: ColumnDef<ParticulierTableau>[] = [
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
      accessorKey: 'adresse',
      header: 'Adresse',
      id: 'adresse',
    },
    {
      accessorKey: 'ville',
      header: 'Ville',
      id: 'ville',
    },
    {
      accessorKey: 'cp',
      header: 'Code postal',
      id: 'cp',
    },
    {
      accessorKey: 'province',
      header: 'Province',
      id: 'province',
    },
    {
      accessorKey: 'telephone',
      header: 'Téléphone',
      id: 'telephone',
    },
    {
      accessorKey: 'fidelo.nom',
      header: 'Fidelo',
      id: 'fidelo.nom',
      cell: ({ row }) => {
        const particulier = row.original;
        if (!particulier.fidelo) return <Badge className="bg-gray-400 hover:bg-gray-400">Aucun</Badge>;
        let color;
        switch (particulier.fidelo.nom) {
          case 'Fidélo Or':
            color = 'bg-yellow-500';
            break;
          case 'Fidélo Platine':
            color = 'bg-blue-500';
            break;
          case 'Fidélo Max':
            color = 'bg-red-500';
            break;
          default:
            color = 'bg-primary';
            break;
        }
        return <Badge className={`${color} hover:${color}`}>{particulier.fidelo.nom}</Badge>;
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
                  setSelectedParticulier(particulierRow);
                  setDialogOpen(true);
                }}
              >
                Modifier le client
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedParticulier(particulierRow);
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
        data={particuliers}
        column_filter="nom"
        placeholder_filtre="Rechercher un client (nom)"
      />
      {alertOpen && (
        <AlertDeleteUser
          alertOpen={alertOpen}
          setAlertOpen={setAlertOpen}
          selectedUser={selectedParticulier}
          label="client"
        />
      )}
      {dialogOpen && (
        <DialogUpdateParticulier
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedParticulier={selectedParticulier}
        />
      )}
    </div>
  );
};

export default ParticuliersTableau;
