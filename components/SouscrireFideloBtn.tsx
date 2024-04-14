'use client';
import { souscrireFidelo } from '@/utils/souscriteFidelo';
import { Button } from './ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
const SouscrireFideloBtn = ({ id_fidelo, id_user, duree }: { id_fidelo: string; id_user: string; duree: number }) => {
  const router = useRouter();
  const handleSouscrire = async () => {
    const is_updated = await souscrireFidelo(id_fidelo, id_user, duree);
    if (is_updated) {
      toast.success('Vous avez souscrit avec succès');
      router.refresh();
    } else {
      toast.error('Erreur lors de la souscription');
    }
  };
  return (
    <Button
      onClick={() => handleSouscrire()}
      variant={'outline'}
      className="bg-vm_secondary hover:bg-vm_secondary_2 text-white hover:text-white text-xs mt-2"
    >
      Souscrire
    </Button>
  );
};

export default SouscrireFideloBtn;
