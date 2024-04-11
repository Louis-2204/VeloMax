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
import moment from 'moment';
const AlertDeleteUser = dynamic(() => import('../AlertDeleteUser'));
const DialogUpdateParticulier = dynamic(() => import('./DialogUpdateParticulier'));

const ParticuliersTableau = ({ particuliers }: { particuliers: ParticulierTableau[] }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedParticulier, setSelectedParticulier] = useState({} as ParticulierTableau);
  const [typeDialog, setTypeDialog] = useState<'ajout' | 'modification'>('modification');

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
      id: 'Nom',
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
      id: 'Prénom',
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
      accessorKey: 'fidelo_nom',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Fidélo
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Fidélo',
      cell: ({ row }) => {
        const particulier = row.original;
        if (!particulier.fidelo_nom) return <Badge className="bg-gray-400 hover:bg-gray-400">Aucun</Badge>;
        let color;
        switch (particulier.fidelo_nom) {
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
        return (
          <Badge
            title={`${moment(particulier.date_souscription).format('L')} - ${moment(
              particulier.date_fin_souscription
            ).format('L')}`}
            className={`${color} hover:${color} gap-2`}
          >
            {particulier.fidelo_nom}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
              />
            </svg>
          </Badge>
        );
      },
    },
    {
      accessorKey: 'total_articles',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Total articles
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Total articles',
    },
    {
      accessorKey: 'total_prix',
      header: ({ column }) => {
        return (
          <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
            Total prix
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      id: 'Total prix',
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
                  setTypeDialog('modification');
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
        additionalButton={
          <Button
            variant={'outline'}
            onClick={() => {
              setSelectedParticulier({} as ParticulierTableau);
              setTypeDialog('ajout');
              setDialogOpen(true);
            }}
          >
            Ajouter un client
          </Button>
        }
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
          typeAction={typeDialog}
        />
      )}
    </div>
  );
};

export default ParticuliersTableau;
