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

const components: { title: string; href: string; description: string }[] = [
  {
    title: 'Alert Dialog',
    href: '/docs/primitives/alert-dialog',
    description: 'A modal dialog that interrupts the user with important content and expects a response.',
  },
  {
    title: 'Hover Card',
    href: '/docs/primitives/hover-card',
    description: 'For sighted users to preview content available behind a link.',
  },
  {
    title: 'Progress',
    href: '/docs/primitives/progress',
    description:
      'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
  },
  {
    title: 'Scroll-area',
    href: '/docs/primitives/scroll-area',
    description: 'Visually or semantically separates content.',
  },
  {
    title: 'Tabs',
    href: '/docs/primitives/tabs',
    description: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
  },
  {
    title: 'Tooltip',
    href: '/docs/primitives/tooltip',
    description:
      'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
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
      setTheme('dark');
    } else {
      document.querySelector('html')?.classList.remove('dark');
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
                  <div
                    className="pl-4 md:pl-0 text-4xl h-full font-bold text-vm_text_gray dark:text-white transition-all duration-500 flex items-center"
                  >
                    VeloMax
                  </div>
                </SheetTitle>
                <SheetDescription>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="Vélos">
                      <AccordionTrigger className="font-semibold text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                        Vélos
                      </AccordionTrigger>
                      <AccordionContent className='text-start flex flex-col gap-2'>
                        <Link href="/shop" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          BMX
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Classique
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          VTT
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Course
                        </Link>
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="Pièces détachés" className='mb-4'>
                      <AccordionTrigger className="font-semibold text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500">
                        Pièces détachés
                      </AccordionTrigger>
                      <AccordionContent className='text-start flex flex-col gap-2'>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Cadre
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Guidon
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Freins
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Selle
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Dérailleur avant
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Dérailleur arrière
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Roue avant
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Roue arrière
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Réflecteurs
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Pédalier
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Ordinateur
                        </Link>
                        <Link href="/contact" className="hover:underline text-vm_secondary hover:text-vm_secondary bg-transparent transition-colors duration-500" onClick={() => { closeSheet() }}>
                          Panier
                        </Link>
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
              <NavigationMenuContent className="flex flex-col items-center">
                <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <div className="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Beautifully designed components that you can copy and paste into your apps. Accessible.
                          Customizable. Open Source.
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/docs" title="Introduction">
                    Re-usable components built using Radix UI and Tailwind CSS.
                  </ListItem>
                  <ListItem href="/docs/installation" title="Installation">
                    How to install dependencies and structure your app.
                  </ListItem>
                  <ListItem href="/docs/primitives/typography" title="Typography">
                    Styles for headings, paragraphs, lists...etc
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
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
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
                    <div className="absolute right-[-30%] top-[-30%] rounded-full bg-red-600 w-5 h-5 text-xs text-white flex justify-center items-center">
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
      <li>
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
      </li>
    );
  }
);
ListItem.displayName = 'ListItem';
