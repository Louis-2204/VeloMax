import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import TopRowShopSection from '@/components/shop/TopRowShopSection';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';

const page = async ({ searchParams }: { searchParams: any }) => {
  console.log(searchParams);

  const items = await getItemsBySearchParams(searchParams);
  console.log(items);

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 sm:flex-row w-full h-auto gap-2">
        <FilterSection />
        <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col">
          <TopRowShopSection />
          <ItemsWrapper items={items} />
        </div>
      </div>
    </div>
  );
};

export default page;
