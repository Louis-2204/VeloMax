import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { Navbar } from '@/components/NavBar';
import { createClient } from '@/utils/supabase/server';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { ShoppingCartProvider } from '@/context/ShoppingCartContext';
import { getUserConnected } from '@/utils/getUserConnected';
import { Toaster } from '@/components/ui/sonner';
const defaultUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'VéloMax',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const supabase = createClient();
  const user = await getUserConnected();
  const profileConnected = await getProfileConnected(user);

  return (
    <html lang="fr" className={`${GeistSans.className} ${user ? user.user_metadata.theme : 'dark'}`}>
      <ShoppingCartProvider>
        <body className="flex flex-col h-screen w-screen bg-background text-foreground antialiased transition-colors duration-500 overflow-hidden">
          <Navbar user={profileConnected} />
          <main className="h-full w-full flex flex-col items-center overflow-y-auto">{children}</main>
        </body>
        <Toaster />
      </ShoppingCartProvider>
    </html>
  );
}
