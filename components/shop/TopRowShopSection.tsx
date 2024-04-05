import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const TopRowShopSection = () => {
  return (
    <div className="w-full p-4 flex flex-col gap-2 md:gap-0 lg:flex-row items-center justify-between">
      <Input className="w-full lg:w-7/12 !min-h-10 !h-10" placeholder="Rechercher un item" />
      <div className="flex items-center w-full lg:w-4/12">
        <label htmlFor="select-filter-by" className="flex text-xs text-vm_text_gray dark:text-white w-[80px]">
          Trier par:
        </label>
        <Select>
          <SelectTrigger id="select-filter-by" className="w-full">
            <SelectValue placeholder="Theme" />
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
