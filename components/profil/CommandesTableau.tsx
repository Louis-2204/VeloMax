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
import { CommandesTableau, Vendeur } from '@/types/entities';
import moment from 'moment';
import { Badge } from '../ui/badge';

const CommandesTableau = ({ commandes }: { commandes: CommandesTableau[] }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState({} as CommandesTableau);

    const columns: ColumnDef<CommandesTableau>[] = [
        {
            accessorKey: 'id_commande',
            header: "Numéro de commande",
            id: 'Numéro de commande',
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Date de la commande
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            id: 'Date de la commande',
            cell: ({ row }) => {
                const commande = row.original;
                return moment(commande.created_at).format('DD/MM/YYYY');
            }
        },
        {
            accessorKey: 'adresse',
            header: "Adresse",
            id: 'Adresse',
        },
        {
            accessorKey: 'ville',
            header: "Ville",
            id: "Ville"
        },
        {
            accessorKey: 'cp',
            header: "Code postal",
            id: "Code postal"
        },
        {
            accessorKey: 'status',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Statut
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            id: "Statut",
            cell: ({ row }) => {
                const commande = row.original;
                switch (commande.status) {
                    case 'En attente de traitement':
                        return <Badge className="bg-gray-500">En attente de traitement</Badge>;
                    case 'En attente de restockage':
                        return <Badge className="bg-orange-500">En attente de restockage</Badge>;
                    case 'En traitement':
                        return <Badge className="bg-blue-500">En traitement</Badge>;
                    case 'Envoyée':
                        return <Badge className="bg-green-500">Envoyée</Badge>;
                }
            }
        },
        {
            id: 'actions',
            enableHiding: false,
            header: '',
            cell: ({ row }) => {
                const commandeRow = row.original;

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
                                    setSelectedCommande(commandeRow);
                                    setDialogOpen(true);
                                }}
                            >
                                Afficher la commande
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
                data={commandes}
                column_filter="Adresse"
                placeholder_filtre="Rechercher une commande (Adresse)"
            />
        </div>
    );
};

export default CommandesTableau;
