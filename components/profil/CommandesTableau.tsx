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
import { Badge } from '../ui/badge';
import { useRouter } from 'next/navigation';
import { Icons } from '../icons/icons';
import { noterCommande } from '@/utils/commandes/noterCommande';
import { useToast } from '../ui/use-toast';
import DialogCommande from '../commandes/DialogCommande';

const CommandesTableau = ({ commandes }: { commandes: CommandesTableauType[] }) => {
    const [dialogOpen, setDialogOpen] = useState(false);
    const [selectedCommande, setSelectedCommande] = useState({} as CommandesTableauType);
    const [hoveredStars, setHoveredStars] = useState(0);

    const router = useRouter();
    const { toast } = useToast();

    useLayoutEffect(() => {
        router.refresh();
    }, []);


    const NoterCommande = async (commande: CommandesTableauType, note: number) => {
        const res = await noterCommande(commande, note);
        if (res) {
            router.refresh();
        }
    };

    const columns: ColumnDef<CommandesTableauType>[] = [
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
            accessorKey: 'livraison',
            header: ({ column }) => {
                return (
                    <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                        Livraison
                        <ArrowUpDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
            id: 'Livraison',
            cell: ({ row }) => {
                const commande = row.original;
                return moment(commande.livraison).format('DD/MM/YYYY');
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
            id: 'note',
            header: "Note",
            cell: ({ row }) => {
                const commande = row.original;

                const handleStarHover = (star: number) => {
                    setHoveredStars(star);
                };

                const handleStarClick = async (star: number) => {
                    (commande.avis as { note: number }[]).push({ note: star });
                    await NoterCommande(commande, star);
                    toast({
                        title: 'Commande notée',
                        description: `Merci d'avoir noté votre commande !`,
                    });
                };

                return commande.status === 'Envoyée' ? (
                    <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Icons.star
                                key={`star-${star}-${commande.id_commande}`}
                                onClick={() => {
                                    if (commande.avis.length === 0) {
                                        handleStarClick(star)
                                    }
                                }
                                }
                                onMouseEnter={() => {
                                    if (commande.avis.length === 0) {
                                        handleStarHover(star);
                                    }
                                }
                                }
                                onMouseLeave={() => setHoveredStars(0)}
                                className={`h-4 w-4 transition-all duration-500 hover:duration-0 ${star <= ((commande.avis.length > 0 && commande.avis[0].note) || hoveredStars || 0) ? 'fill-yellow-500 text-yellow-500' : 'fill-background text-vm_text_gray'} ${commande.avis.length > 0 ? 'cursor-default' : 'cursor-pointer'}`}
                            />
                        ))}
                    </div>
                ) : <span className="text-vm_text_gray">Pas encore reçu</span>
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
                emptyMessage='Aucune commande'
            />

            {dialogOpen && (
                <DialogCommande
                    type='detailCommande'
                    commande={selectedCommande}
                    dialogOpen={dialogOpen}
                    setDialogOpen={setDialogOpen}
                />
            )}
        </div>
    );
};

export default CommandesTableau;
