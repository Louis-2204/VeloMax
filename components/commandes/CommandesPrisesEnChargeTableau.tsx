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
import moment from 'moment';
import AlertDeleteCommande from './AlertDeleteCommande';
import DialogUpdateCommande from './DialogUpdateCommande';
import DialogCommande from './DialogCommande';

const CommandesPrisesEnChargeTableau = ({ user, clients, commandes, produits, vendeurs, id_boutique }: { user: any, clients: any[], commandes: any[], produits: any[], vendeurs: Vendeur[], id_boutique: string }) => {
    const [alertOpen, setAlertOpen] = useState(false);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogUpdateOpen, setDialogUpdateOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState({} as any);
    const [typeDialog, setTypeDialog] = useState<'ajout' | 'modification'>('modification');

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
            accessorKey: 'fullnameVendeur',
            header: "Vendeur",
            id: 'Vendeur',
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
                                    setTypeDialog('modification');
                                    setDialogOpen(true);
                                }}
                            >
                                Afficher la commande
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedCommande(commandeRow);
                                    setTypeDialog('modification');
                                    setDialogUpdateOpen(true);
                                }}
                            >
                                Modifier la commande
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => {
                                    setSelectedCommande(commandeRow);
                                    setAlertOpen(true);
                                }}
                            >
                                Supprimer la commande
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
                column_filter="Numéro de commande"
                placeholder_filtre="Rechercher une commande (numéro)"
                additionalButton={
                    <Button
                        variant={'outline'}
                        onClick={() => {
                            setSelectedCommande({} as any);
                            setTypeDialog('ajout');
                            setDialogUpdateOpen(true);
                        }}
                    >
                        Ajouter une commande
                    </Button>
                }
            />
            {alertOpen && (
                <AlertDeleteCommande
                    alertOpen={alertOpen}
                    setAlertOpen={setAlertOpen}
                    selectedCommande={selectedCommande}
                />
            )}
            {dialogOpen && (
                <DialogCommande
                    user={user}
                    type='detailCommande'
                    commande={selectedCommande}
                    vendeurs={vendeurs}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            )}
            {dialogUpdateOpen && (
                <DialogUpdateCommande
                    produits={produits}
                    clients={clients}
                    id_boutique={id_boutique}
                    dialogOpen={dialogUpdateOpen}
                    setDialogOpen={setDialogUpdateOpen}
                    selectedCommande={selectedCommande}
                    typeAction={typeDialog}
                    vendeurs={vendeurs}
                />
            )}
        </div>
    );
};

export default CommandesPrisesEnChargeTableau;
