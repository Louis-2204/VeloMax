'use client';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useRouter } from 'next/navigation';
const TopRowShopSection = () => {
  const router = useRouter();
  const handleSubmit = (formData: FormData) => {
    const url = new URL(window.location.href);
    url.searchParams.set('nom', formData.get('nom') as string);
    router.push(url.toString());
  };

  return (
    <div className="w-full p-4 flex flex-col gap-2 md:gap-0 lg:flex-row items-center justify-between">
      <form className="w-full" action={handleSubmit}>
        <Input name="nom" className="w-full lg:w-7/12 !min-h-10 !h-10 bg-background transition-colors duration-500" placeholder="Rechercher un item" />
      </form>
      <div className="flex items-center w-full lg:w-4/12">
        <label htmlFor="select-filter-by" className="flex text-xs text-vm_text_gray dark:text-white w-[80px] transition-colors duration-500">
          Trier par:
        </label>
        <Select>
          <SelectTrigger id="select-filter-by" className="w-full bg-background transition-colors duration-500">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="pasc"> Prix (croissant)</SelectItem>
            <SelectItem value="pdesc"> Prix (décroissant)</SelectItem>
            <SelectItem value="az"> A-Z</SelectItem>
            <SelectItem value="za"> Z-A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default TopRowShopSection;
