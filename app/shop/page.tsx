import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import TopRowShopSection from '@/components/shop/TopRowShopSection';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { getProfileConnected } from '@/utils/getProfileConnected';

const page = async ({ searchParams }: { searchParams: { prix?: string; pieces?: string; velos?: string } }) => {
  const items = await getItemsBySearchParams(searchParams);
  const user = await getProfileConnected();

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 sm:flex-row w-full h-auto gap-2">
        <FilterSection user={user} key={JSON.stringify(searchParams)} searchParams={searchParams} content="shop" />
        <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col transition-colors duration-500">
          <TopRowShopSection />
          <ItemsWrapper items={items} content="shop" />
        </div>
      </div>
    </div>
  );
};

export default page;
