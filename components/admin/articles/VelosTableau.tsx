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
import { Piece, Velo } from '@/types/entities';
import dynamic from 'next/dynamic';
import moment from 'moment';
import Image from 'next/image';

const AlertVelo = dynamic(() => import('./AlertVelo'));
const DialogVelo = dynamic(() => import('./DialogVelo'));

const VelosTableau = ({ velos, pieces }: { velos: Velo[]; pieces: Piece[] }) => {
  const [alertOpen, setAlertOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedVelo, setSelectedVelo] = useState({} as Velo);
  const [typeDialog, setTypeDialog] = useState<'ajout' | 'modification'>('modification');

  const columns: ColumnDef<Velo>[] = [
    {
      accessorKey: 'image',
      header: 'Image',
      id: 'Image',
      cell: ({ row }) => {
        const piece = row.original;
        return (
          <Image
            src={piece.image}
            alt={piece.nom}
            width={100}
            height={100}
            className="min-h-12 min-w-12 h-12 w-12 object-scale-down rounded "
          />
        );
      },
    },
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
      accessorKey: 'description',
      header: 'Description',
      id: 'Description',
    },
    {
      accessorKey: 'grandeur',
      header: 'Grandeur',
      id: 'Grandeur',
    },
    {
      accessorKey: 'prix_unitaire',
      header: 'Prix unitaire',
      id: 'Prix unitaire',
      cell: ({ row }) => {
        const piece = row.original;
        return `${piece.prix_unitaire} €`;
      },
    },
    {
      accessorKey: 'type',
      header: 'Type',
      id: 'Type',
    },
    {
      accessorKey: 'date_introduction_marche',
      header: 'Date introduction marché',
      id: 'Date introduction marché',
      cell: ({ row }) => {
        const piece = row.original;
        return moment(piece.date_introduction_marche).format('DD/MM/YYYY');
      },
    },
    {
      accessorKey: 'date_discontinuation_production',
      header: 'Date discontinuation production',
      id: 'Date discontinuation production',
      cell: ({ row }) => {
        const piece = row.original;
        if (piece.date_discontinuation_production) {
          return moment(piece.date_discontinuation_production).format('DD/MM/YYYY');
        } else {
          return 'Non discontinué';
        }
      },
    },
    {
      id: 'actions',
      enableHiding: false,
      header: '',
      cell: ({ row }) => {
        const VeloRow = row.original;

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
                  setSelectedVelo(VeloRow);
                  setTypeDialog('modification');
                  setDialogOpen(true);
                }}
              >
                Modifier le vélo
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setSelectedVelo(VeloRow);
                  setAlertOpen(true);
                }}
              >
                Supprimer le vélo
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
        data={velos}
        column_filter="Nom"
        placeholder_filtre="Rechercher un vélo (nom)"
        additionalButton={
          <Button
            variant={'outline'}
            onClick={() => {
              setSelectedVelo({} as Velo);
              setTypeDialog('ajout');
              setDialogOpen(true);
            }}
          >
            Ajouter un vélo
          </Button>
        }
      />
      {alertOpen && <AlertVelo alertOpen={alertOpen} setAlertOpen={setAlertOpen} selectedVelo={selectedVelo} />}
      {dialogOpen && (
        <DialogVelo
          dialogOpen={dialogOpen}
          setDialogOpen={setDialogOpen}
          selectedVelo={selectedVelo}
          typeAction={typeDialog}
          pieces={pieces}
        />
      )}
    </div>
  );
};

export default VelosTableau;
