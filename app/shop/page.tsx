import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import TopRowShopSection from '@/components/shop/TopRowShopSection';

const page = () => {
  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 sm:flex-row w-full h-auto gap-2">
        <FilterSection />
        <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col">
          <TopRowShopSection />
          <ItemsWrapper />
        </div>
      </div>
    </div>
  );
};

export default page;
