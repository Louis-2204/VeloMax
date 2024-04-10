import { ReactNode } from 'react';
import Navigation from '@/components/profil/Navigation';
import { getProfileConnected } from '@/utils/getProfileConnected';
const layout = async ({ children }: { children: ReactNode }) => {
  const user = await getProfileConnected();
  console.log(user);
  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col sm:flex-row w-full mt-8 h-auto gap-4">
        <div className="w-3/12">
          <Navigation />
        </div>
        <div className="w-9/12">{children}</div>
      </div>
    </div>
  );
};

export default layout;
