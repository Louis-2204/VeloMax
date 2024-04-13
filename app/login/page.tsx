'use client';

import { SubmitButton } from './submit-button';
import Image from 'next/image';
import loginImage from '@/public/login.png';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { signUp } from '@/utils/signUp';
import { signIn } from '@/utils/signIn';
import { Icons } from '@/components/icons/icons';

export default function Login({ searchParams }: { searchParams: { message: string } }) {
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
            <form className="animate-in flex flex-col w-full justify-center gap-6 text-foreground max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="nom">
                  Nom
                </Label>
                <Input
                  type="text"
                  id="nom"
                  name="nom"
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
                  name="prenom"
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
                  name="email"
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
                  name="password"
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
                  name="telephone"
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
                  name="adresse"
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
                    name="ville"
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
                    name="codePostal"
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
                  name="province"
                  placeholder="Entrez votre province"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                formAction={signUp}
                className="flex items-center justify-center text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText={
                  <Icons.spinner className="animate-spin h-9 w-9 text-white" />
                }
              >
                Créer son compte
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">{searchParams.message}</p>
              )}
            </form>
          )}

          {!isLogin && isProfessionnel && (
            <form className="animate-in flex flex-col w-full justify-center gap-6 text-foreground max-w-xl">
              <div className="grid w-full items-center gap-1.5">
                <Label className="text-lg font-semibold" htmlFor="nomDeLaSociete">
                  Nom de la société
                </Label>
                <Input
                  type="text"
                  id="nomDeLaSociete"
                  name="nomDeLaSociete"
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
                  name="nomDeLaPersonneDeContact"
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
                  name="email"
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
                  name="password"
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
                  name="telephone"
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
                  name="adresse"
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
                    name="ville"
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
                    name="codePostal"
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
                  name="province"
                  placeholder="Entrez votre province"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                formAction={signUp}
                className="flex items-center justify-center text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText={
                  <Icons.spinner className="animate-spin h-9 w-9 text-white" />
                }
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
                  name="email"
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
                  name="password"
                  placeholder="Entrez votre mot de passe"
                  className="placeholder:text-lg placeholder:font-medium placeholder:text-vm_text_gray dark:text-white"
                />
              </div>

              <SubmitButton
                formAction={signIn}
                className="flex items-center justify-center text-3xl text-white w-[75%] mx-auto font-semibold rounded-md px-4 py-2 bg-[#7ca92e] my-4"
                pendingText={
                  <Icons.spinner className="animate-spin h-9 w-9 text-white" />
                }
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
  );
}