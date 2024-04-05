import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { Navbar } from "@/components/NavBar";
import { createClient } from "@/utils/supabase/server";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "VéloMax"
};


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const supabase = createClient();

  const userConnected = await supabase.auth.getUser();


  let user = null;
  let role = null;

  if (userConnected !== null && userConnected.data.user !== null) {
    user = await supabase
      .from("profiles")
      .select("* , vendeurs(*), particuliers(*), professionnels(*), gerants_magasin(*), admins(*)")
      .eq("id_user", userConnected.data.user.id)
      .single();

    // Check the relations and assign role
    if (user.data.vendeurs) {
      role = 'vendeur';
    } else if (user.data.particuliers) {
      role = 'particulier';
    } else if (user.data.professionnels) {
      role = 'professionnel';
    } else if (user.data.gerants_magasin) {
      role = 'gerant_magasin';
    } else if (user.data.admins) {
      role = 'admin';
    }

  }

  if (user === null) {
    user = null;
  } else {
    user = {
      ...user?.data,
      role,
    };
  }

  return (
    <html lang="fr" className={`${GeistSans.className} ${user ? user.theme : "dark"}`}>
      <body className="flex flex-col h-screen w-screen bg-background text-foreground antialiased transition-colors duration-500">
        <Navbar user={user} />
        <main className="h-full w-full flex flex-col items-center overflow-y-auto">
          {children}
        </main>
      </body>
    </html>
  );
}
