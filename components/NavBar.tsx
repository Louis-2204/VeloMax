'use client';

import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons/icons';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { ShoppingCartContext } from '@/context/ShoppingCartContext';
import { Button } from './ui/button';

const pieces: { title: string; href: string }[] = [
  {
    title: 'Cadre',
    href: '/shop?pieces=Cadre',
  },
  {
    title: 'Guidon',
    href: '/shop?pieces=Guidon',
  },
  {
    title: 'Freins',
    href: '/shop?pieces=Freins',
  },
  {
    title: 'Selle',
    href: '/shop?pieces=Selle',
  },
  {
    title: 'Dérailleur Avant',
    href: '/shop?pieces=Dérailleur+Avant',
  },
  {
    title: 'Dérailleur Arrière',
    href: '/shop?pieces=Dérailleur+Arrière',
  },
  {
    title: 'Roue avant',
    href: '/shop?pieces=Roue+avant',
  },
  {
    title: 'Roue arrière',
    href: '/shop?pieces=Roue+arrière',
  },
  {
    title: 'Réflecteurs',
    href: '/shop?pieces=Réflecteurs',
  },
  {
    title: 'Pédalier',
    href: '/shop?pieces=Pédalier',
  },
  {
    title: 'Ordinateur',
    href: '/shop?pieces=Ordinateur',
  },
  {
    title: 'Panier',
    href: '/shop?pieces=Panier',
  },
];

const velos: { title: string; href: string }[] = [
  {
    title: 'BMX',
    href: '/shop?velos=BMX',
  },
  {
    title: 'Classique',
    href: '/shop?velos=Classique',
  },
  {
    title: 'VTT',
    href: '/shop?velos=VTT',
  },
  {
    title: 'Vélo de course',
    href: '/shop?velos=Vélo+de+course',
  },
];

export function Navbar({ user }: { user: any }) {
  const [background, setBackground] = useState('bg-transparent');
  const [theme, setTheme] = useState('');
  const { getCart } = useContext(ShoppingCartContext);
  const cart = getCart();

  const pahtname = usePathname();

  useEffect(() => {
    setTheme(document.querySelector('html')?.classList.contains('dark') ? 'dark' : 'light');
    const mainDiv = document.querySelector('main');
    mainDiv &&
      mainDiv.addEventListener('scroll', () => {
        if (mainDiv.scrollTop > 10) {
          setBackground('bg-background');
        } else {
          setBackground('bg-transparent');
        }
      });
  }, []);

  const ToggleTheme = () => {
    if (theme === 'light') {
      document.querySelector('html')?.classList.add('dark');
      document.querySelector('html')?.classList.remove('light');
      setTheme('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
      document.querySelector('html')?.classList.add('light');
      setTheme('light');
    }
  };

  const closeSheet = () => {
    (document.getElementsByClassName('closeSheetButton')[0] as HTMLElement)?.click();
  }

  return pahtname !== '/login' ? (
    <div
      className={`flex sticky w-full min-h-20 py-4 px-2 sm:px-4 md:px-8 lg:px-16 top-0 z-50 ${background} justify-center transition-all duration-500`}
    >
      <div className="w-full max-w-8xl flex divide-x-0 md:divide-x-4 divide-[#505050]">
        <div className="flex items-center justify-center px-4 divide-x-4 md:divide-x-0 divide-[#505050]">
          <Sheet>
            <SheetTrigger>
              <Icons.menubar className="mr-4 h-7 w-7 cursor-pointer text-vm_text_gray dark:text-white transition-colors duration-500 flex md:hidden" />
            </SheetTrigger>
            <SheetContent side={'left'} className="w-[300px] !max-w-[100vw] sm:w-[300px] md:w-[400px] transition-all duration-500">
              <SheetHeader>
                <SheetTitle>
                  <Link
                    href={'/'}
                    className="pl-4 md:pl-0 text-4xl h-full font-bold text-vm_text_gray dark:text-white transition-all duration-500 flex items-center"
                  >
                    VeloMax
                  </Link>
                </SheetTitle>
                <SheetDescription>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="Vélos">
                      <AccordionTrigger className="font-semibold text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                        Vélos
                      </AccordionTrigger>
                      <AccordionContent className='text-start flex flex-col gap-2'>
                        {velos.map((velo) => (
                          <Link key={velo.title} href={velo.href} className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                            {velo.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Pièces détachés" className='mb-4'>
                      <AccordionTrigger className="font-semibold text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                        Pièces détachés
                      </AccordionTrigger>
                      <AccordionContent className='text-start flex flex-col gap-2'>
                        {pieces.map((piece) => (
                          <Link key={piece.title} href={piece.href} className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                            {piece.title}
                          </Link>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                  <div className="w-full text-start">
                    <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                      Contact
                    </Link>
                  </div>
                </SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
          <Link
            href={'/'}
            className="pl-4 md:pl-0 text-xl sm:text-2xl md:text-3xl lg:text-4xl h-full font-bold text-vm_text_gray dark:text-white transition-all duration-500 flex items-center"
          >
            VeloMax
          </Link>
        </div>

        <NavigationMenu className="max-w-full flex items-center justify-between w-full">
          <NavigationMenuList className='hidden md:flex'>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                <Link href="/shop?velos=VTT%2CVélo+de+course%2CClassique%2CBMX">Vélos</Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="hidden md:flex flex-col items-center">
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <ListItem title="VTT" href="/shop?velos=VTT" className='w-full h-full'>
                    VTT - Pour les terrains accidentés
                  </ListItem>
                  <ListItem title="BMX" href="/shop?velos=BMX" className='w-full h-full'>
                    BMX - Pour les sauts et les acrobaties
                  </ListItem>
                  <ListItem title="Vélo de course" href="/shop?velos=Vélo+de+course" className='w-full h-full'>
                    Vélo de course - Pour la vitesse sur route
                  </ListItem>
                  <ListItem title="Classique" href="/shop?velos=Classique" className='w-full h-full'>
                    Vélo Classique - Pour les trajets quotidiens et le loisir
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="text-lg text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                <Link href="/shop?pieces=Cadre%2CGuidon%2CFreins%2CSelle%2CDérailleur+Avant%2CDérailleur+Arrière%2CRoue+avant%2CRoue+arrière%2CRéflecteurs%2CPédalier%2COrdinateur%2CPanier&prix=">
                  Pièces détachés
                </Link>
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[650px] gap-3 p-4 md:grid-cols-4">
                  {pieces.map((piece) => (
                    <ListItem key={piece.title} title={`• ${piece.title}`} href={piece.href} />
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/docs" legacyBehavior passHref>
                <NavigationMenuLink className="text-lg text-vm_secondary hover:text-vm_secondary transition-colors duration-500">
                  Contact
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>

          <NavigationMenuList>
            <NavigationMenuItem
              className="px-1 cursor-pointer"
              onClick={() => {
                ToggleTheme();
              }}
            >
              {theme === 'dark' ? (
                <Icons.sun className="h-6 w-6 text-black dark:text-white transition-colors duration-500" />
              ) : (
                <Icons.moon className="h-6 w-6 text-black dark:text-white transition-colors duration-500" />
              )}
            </NavigationMenuItem>
            {user && (user.role === 'particulier' || user.role === 'professionnel') && (
              <NavigationMenuItem className="px-1">
                <div className="relative">
                  {cart.length > 0 && (
                    <div className="absolute right-[-30%] top-[-30%] rounded-full bg-red-600 px-1 w-fit min-w-5 h-5 text-xs text-white flex justify-center items-center">
                      {cart.map((item) => item.quantite).reduce((a, b) => a + b)}
                    </div>
                  )}
                  <Link href="/panier">
                    <Icons.cart className="h-6 w-6 text-black dark:text-white transition-colors duration-500" />
                  </Link>
                </div>
              </NavigationMenuItem>
            )}
            {user && (user.role === 'vendeur' || user.role === 'gerant' || user.role === 'admin') && (
              <NavigationMenuItem className="px-1">
                <Link href="/admin">
                  <Icons.squares className="h-6 w-6 text-black dark:text-white transition-colors duration-500" />
                </Link>
              </NavigationMenuItem>
            )}
            <NavigationMenuItem className="px-1">
              {user ? (
                <Link href="/profil">
                  <Icons.profil className="h-6 w-6 text-black dark:text-white transition-colors duration-500" />
                </Link>
              ) : (
                <Link href="/login">
                  <Button className="text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                    Se connecter
                  </Button>
                </Link>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </div >
  ) : null;
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    );
  }
);
ListItem.displayName = 'ListItem';
