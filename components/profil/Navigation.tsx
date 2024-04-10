'use client';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
const Navigation = () => {
  const path = usePathname();
  return (
    <Card className="flex flex-col w-full rounded-md overflow-hidden ">
      <CardContent className="p-0">
        <Link href="/profil">
          <div
            className={`flex w-full py-2 px-3 gap-2 text-vm_text_gray dark:text-white font-semibold ${path === '/profil' ? 'bg-[#E4E4E7] dark:bg-[#303030]' : ''
              } hover:bg-[#E4E4E7] hover:dark:bg-[#303030]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
              />
            </svg>
            Mes informations
          </div>
        </Link>

        <Link href="/profil/mes-commandes">
          <div
            className={`flex w-full py-2 px-3 gap-2 text-vm_text_gray dark:text-white font-semibold ${path === '/profil/mes-commandes' ? 'bg-[#E4E4E7] dark:bg-[#303030]' : ''
              } hover:bg-[#E4E4E7] hover:dark:bg-[#303030]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 6.878V6a2.25 2.25 0 0 1 2.25-2.25h7.5A2.25 2.25 0 0 1 18 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 0 0 4.5 9v.878m13.5-3A2.25 2.25 0 0 1 19.5 9v.878m0 0a2.246 2.246 0 0 0-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0 1 21 12v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6c0-.98.626-1.813 1.5-2.122"
              />
            </svg>
            Mes commandes
          </div>
        </Link>

        <Link href="/profil/fidelo">
          <div
            className={`flex w-full py-2 px-3 gap-2 text-vm_text_gray dark:text-white font-semibold ${path === '/profil/fidelo' ? 'bg-[#E4E4E7] dark:bg-[#303030]' : ''
              } hover:bg-[#E4E4E7] hover:dark:bg-[#303030]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 0 1-1.043 3.296 3.745 3.745 0 0 1-3.296 1.043A3.745 3.745 0 0 1 12 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 0 1-3.296-1.043 3.745 3.745 0 0 1-1.043-3.296A3.745 3.745 0 0 1 3 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 0 1 1.043-3.296 3.746 3.746 0 0 1 3.296-1.043A3.746 3.746 0 0 1 12 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 0 1 3.296 1.043 3.746 3.746 0 0 1 1.043 3.296A3.745 3.745 0 0 1 21 12Z"
              />
            </svg>
            Fidélo
          </div>
        </Link>

        <Link href="/profil/remise">
          <div
            className={`flex w-full py-2 px-3 gap-2 text-vm_text_gray dark:text-white font-semibold ${path === '/profil/remise' ? 'bg-[#E4E4E7] dark:bg-[#303030]' : ''
              } hover:bg-[#E4E4E7] hover:dark:bg-[#303030]`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9.568 3H5.25A2.25 2.25 0 0 0 3 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 0 0 5.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 0 0 9.568 3Z"
              />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 6h.008v.008H6V6Z" />
            </svg>
            Remise commerciale
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default Navigation;
