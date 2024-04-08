import { ReactNode } from 'react';
import Navigation from '@/components/profile/Navigation';
const layout = ({ children }: { children: ReactNode }) => {
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
