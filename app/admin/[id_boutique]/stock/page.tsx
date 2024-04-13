import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import TopRowShopSection from '@/components/shop/TopRowShopSection';
import { getFournisseursForStockFilter } from '@/utils/getFournisseursForStockFilter';
import { getItemsBySearchParams } from '@/utils/getItemsBySearchParams';
import { getStockBySearchParams } from '@/utils/getStockBySearchParams';

const page = async ({
  searchParams,
  params,
}: {
  searchParams: { prix?: string; pieces?: string; velos?: string; fournisseur: string };
  params: { id_boutique: string };
}) => {
  const items = await getStockBySearchParams(searchParams, params.id_boutique);
  const fournisseurs = await getFournisseursForStockFilter();

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 sm:flex-row w-full h-auto gap-2">
        <FilterSection
          key={JSON.stringify(searchParams)}
          searchParams={searchParams}
          content="stock"
          fournisseurs={fournisseurs}
        />
        <div className="rounded-md bg-tempBgLightSecondary dark:bg-tempBgDark border border-tempLightBorder dark:border-tempDarkBorder w-full h-fit flex flex-col">
          <TopRowShopSection />
          <ItemsWrapper items={items} content="stock" />
        </div>
      </div>
    </div>
  );
};

export default page;