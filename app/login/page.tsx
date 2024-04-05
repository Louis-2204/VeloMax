'use client';

import Link from 'next/link';
import { headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { SubmitButton } from './submit-button';
import Image from 'next/image';
import loginImage from '@/public/login.png';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  // const signIn = async (formData: FormData) => {
  //   "use server";

  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signInWithPassword({
  //     email,
  //     password,
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/protected");
  // };

  // const signUp = async (formData: FormData) => {
  //   "use server";

  //   const origin = headers().get("origin");
  //   const email = formData.get("email") as string;
  //   const password = formData.get("password") as string;
  //   const supabase = createClient();

  //   const { error } = await supabase.auth.signUp({
  //     email,
  //     password,
  //     options: {
  //       emailRedirectTo: `${origin}/auth/callback`,
  //     },
  //   });

  //   if (error) {
  //     return redirect("/login?message=Could not authenticate user");
  //   }

  //   return redirect("/login?message=Check email to continue sign in process");
  // };

  const [isProfessionnel, setIsProfessionnel] = useState(false);
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex w-full h-full">
      <div className="relative w-1/2 h-full">
        <div className="absolute top-10 left-20 z-20 text-5xl font-bold text-white">VeloMax</div>
        <Image
          src={loginImage}
          alt="Login"
          className="absolute w-full h-full object-cover"
          width={1000}
          height={1000}
        />
        <div className="absolute z-10 bg-black/50 w-full h-full"></div>
      </div>

      <div className="flex flex-col w-1/2 h-full bg-background py-10 px-32 gap-6">
        <div className="w-full text-end mb-6">
          <Button variant={'ghost'} className="text-2xl" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "S'inscrire" : 'Se connecter'}
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-8 h-full">
          <div className="">
            <h1 className="text-5xl font-bold text-center text-vm_text_gray dark:text-white mb-3">
              {isLogin ? 'Se connecter' : "S'inscrire"}
            </h1>
            <h3 className="text-xl font-bold text-center text-vm_text_gray dark:text-white">
              {isLogin
                ? 'Veuillez remplir le formulaire ci-dessous pour vous connecter.'
                : 'Veuillez remplir le formulaire ci-dessous pour créer un compte.'}
            </h3>
          </div>

          {!isLogin && !isProfessionnel && (
            <form className="animate-in  flex flex-col w-full justify-center gap-6 text-foreground max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="nom">
                  Nom
                </Label>
                <Input
                  type="text"
                  id="nom"
                  placeholder="Entrez votre nom"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="prenom">
                  Prénom
                </Label>
                <Input
                  type="text"
                  id="prenom"
                  placeholder="Entrez votre prénom"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Entrez votre email"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="telephone">
                  Téléphone
                </Label>
                <Input
                  type="text"
                  id="telephone"
                  placeholder="Entrez votre numéro de téléphone"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="adresse">
                  Adresse
                </Label>
                <Input
                  type="text"
                  id="adresse"
                  placeholder="Entrez votre adresse"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="flex gap-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-lg font-semibold" htmlFor="ville">
                    Ville
                  </Label>
                  <Input
                    type="text"
                    id="ville"
                    placeholder="Entrez votre ville"
                    className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-lg font-semibold" htmlFor="codePostal">
                    Code Postal
                  </Label>
                  <Input
                    type="text"
                    id="codePostal"
                    placeholder="Entrez votre code postal"
                    className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="province">
                  Province
                </Label>
                <Input
                  type="text"
                  id="province"
                  placeholder="Entrez votre province"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                // formAction={signUp}
                className="text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText="Signing Up..."
              >
                Créer son compte
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
              )}
            </form>
          )}

          {!isLogin && isProfessionnel && (
            <form className="animate-in  flex flex-col w-full justify-center gap-6 text-foreground max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="nomDeLaSociete">
                  Nom de la société
                </Label>
                <Input
                  type="text"
                  id="nomDeLaSociete"
                  placeholder="Entrez le nom de la société"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="nomDeLaPersonneDeContact">
                  Nom de la personne de contact
                </Label>
                <Input
                  type="text"
                  id="nomDeLaPersonneDeContact"
                  placeholder="Entrez le nom de la personne de contact"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Entrez votre email"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="telephone">
                  Téléphone
                </Label>
                <Input
                  type="text"
                  id="telephone"
                  placeholder="Entrez votre numéro de téléphone"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="adresse">
                  Adresse
                </Label>
                <Input
                  type="text"
                  id="adresse"
                  placeholder="Entrez votre adresse"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="flex gap-6">
                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-lg font-semibold" htmlFor="ville">
                    Ville
                  </Label>
                  <Input
                    type="text"
                    id="ville"
                    placeholder="Entrez votre ville"
                    className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                  />
                </div>

                <div className="grid w-full items-center gap-1.5">
                  <Label className="text-lg font-semibold" htmlFor="codePostal">
                    Code Postal
                  </Label>
                  <Input
                    type="text"
                    id="codePostal"
                    placeholder="Entrez votre code postal"
                    className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                  />
                </div>
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="province">
                  Province
                </Label>
                <Input
                  type="text"
                  id="province"
                  placeholder="Entrez votre province"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                // formAction={signUp}
                className="text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText="Signing Up..."
              >
                Créer son compte
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
              )}
            </form>
          )}

          {isLogin && (
            <form className="animate-in  flex flex-col w-full justify-center gap-6 text-foreground max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="email">
                  Email
                </Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="Entrez votre email"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="password">
                  Mot de passe
                </Label>
                <Input
                  type="password"
                  id="password"
                  placeholder="Entrez votre mot de passe"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                // formAction={signIn}
                className="text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText="Signing In..."
              >
                Se Connecter
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
              )}
            </form>
          )}

          {!isLogin && (
            <div className="flex items-center justify-center gap-6">
              Vous êtes un {isProfessionnel ? 'particulier' : 'professionnel'} ?{' '}
              <span
                className="text-vm_text_gray dark:text-white cursor-pointer underline"
                onClick={() => setIsProfessionnel(!isProfessionnel)}
              >
                Créer un compte {isProfessionnel ? 'particulier' : 'professionnel'}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>

    // <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
    //   <Link
    //     href="/"
    //     className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm"
    //   >
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       width="24"
    //       height="24"
    //       viewBox="0 0 24 24"
    //       fill="none"
    //       stroke="currentColor"
    //       strokeWidth="2"
    //       strokeLinecap="round"
    //       strokeLinejoin="round"
    //       className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1"
    //     >
    //       <polyline points="15 18 9 12 15 6" />
    //     </svg>{" "}
    //     Back
    //   </Link>

    //   <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
    //     <label className="text-md" htmlFor="email">
    //       Email
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       name="email"
    //       placeholder="you@example.com"
    //       required
    //     />
    //     <label className="text-md" htmlFor="password">
    //       Password
    //     </label>
    //     <input
    //       className="rounded-md px-4 py-2 bg-inherit border mb-6"
    //       type="password"
    //       name="password"
    //       placeholder="••••••••"
    //       required
    //     />
    //     <SubmitButton
    //       formAction={signIn}
    //       className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
    //       pendingText="Signing In..."
    //     >
    //       Sign In
    //     </SubmitButton>
    //     <SubmitButton
    //       formAction={signUp}
    //       className="border border-foreground/20 rounded-md px-4 py-2 text-foreground mb-2"
    //       pendingText="Signing Up..."
    //     >
    //       Sign Up
    //     </SubmitButton>
    //     {searchParams?.message && (
    //       <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
    //         {searchParams.message}
    //       </p>
    //     )}
    //   </form>
    // </div>
  );
}
