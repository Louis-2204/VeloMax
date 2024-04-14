import AdminForm from '@/components/profil/AdminForm';
import ParticulierForm from '@/components/profil/ParticulierForm';
import ProfessionnelForm from '@/components/profil/ProfessionnelForm';
import SignOutBtn from '@/components/profil/SignOutBtn';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getProfileConnected } from '@/utils/getProfileConnected';

const page = async () => {
  const profileConnected = await getProfileConnected();
  const is_admin = ['admin', 'vendeur', 'gerant'].includes(profileConnected?.role);

  return (
    <div className="flex flex-col gap-2 max-w-xl">
      {is_admin && <AdminForm profileConnected={profileConnected} />}
      {profileConnected.role === 'particulier' && <ParticulierForm profileConnected={profileConnected} />}

      {profileConnected.role === 'professionnel' && <ProfessionnelForm profileConnected={profileConnected} />}
      <SignOutBtn />
    </div>
  );
};

export default page;
