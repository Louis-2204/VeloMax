'use client';
import { signOut } from '@/utils/signOut';
import { Button } from '../ui/button';

const SignOutBtn = () => {
  return (
    <Button onClick={() => signOut()} className="w-full md:max-w-xs bg-red-800 hover:bg-red-900 text-white">
      {' '}
      Déconnexion
    </Button>
  );
};

export default SignOutBtn;
