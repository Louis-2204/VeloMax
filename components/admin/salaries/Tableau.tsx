'use client';
import { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Vendeur = {
  id_vendeur: string;
  nom: number;
  prenom: string;
  temps: 'plein' | 'partiel';
};

const columns: ColumnDef<Vendeur>[] = [
  {
    accessorKey: 'nom',
    header: 'Nom',
    id: 'nom',
    cell: ({ row }) => {
      const venteur = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(venteur.id_vendeur)}>
              Copier l'id vendeur
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
  {
    accessorKey: 'prenom',
    header: 'Prenom',
    id: 'prenom',
  },
  {
    accessorKey: 'temps',
    header: 'Temps',
    id: 'temps',
  },
];

const Tableau = ({ data }: { data: any }) => {
  return <DataTable columns={columns} data={data} />;
};

export default Tableau;
