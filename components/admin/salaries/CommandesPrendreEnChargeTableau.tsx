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
import { useLayoutEffect, useState } from 'react';
import { CommandesTableauType } from '@/types/entities';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import DialogCommande from '@/components/commandes/DialogCommande';

const CommandesPrendreEnChargeTableau = ({ user, commandes, vendeurs }: { user: any, commandes: CommandesTableauType[]; vendeurs: any }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState({} as CommandesTableauType);

    const router = useRouter();

    useLayoutEffect(() => {
        router.refresh();
    }, []);

    const columns: ColumnDef<any>[] = [
        {
            accessorKey: 'id_commande',
            header: "Numéro de commande",
            id: 'Numéro de commande',
            cell: ({ row }) => {
                const commande = row.original;
                return <span className="break-all font-semibold">{commande.id_commande}</span>

            }
        },
        {
            accessorKey: 'created_at',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Date
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            id: 'Date',
            cell: ({ row }) => {
                const commande = row.original;
                return moment(commande.created_at).format('DD/MM/YYYY');
            }
        },
        {
            accessorKey: 'prix_total',
            header: "Prix",
            id: 'Prix',
            cell: ({ row }) => {
                const commande = row.original;
                return <span>{commande.prix_total} €</span>
            }
        },
        {
            accessorKey: 'livraison',
            header: "Livraison",
            id: "Livraison",
            cell: ({ row }) => {
                const commande = row.original;
                return <span>{moment(commande.livraison).format('DD/MM/YYYY')}</span>
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
        <div className="w-full">
            <DataTable
                columns={columns}
                data={commandes}
                column_filter="Livraison"
                placeholder_filtre="Rechercher une commande (Livraison)"
                emptyMessage='Aucune commande'
            />

            {dialogOpen && (
                <DialogCommande
                    user={user}
                    type='commandeAprendreEnCharge'
                    commande={selectedCommande}
                    vendeurs={vendeurs}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            )}
        </div>
    );
};

export default CommandesPrendreEnChargeTableau;