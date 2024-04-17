import FilterSection from '@/components/shop/FilterSection';
import ItemsWrapper from '@/components/shop/ItemsWrapper';
import TopRowShopSection from '@/components/shop/TopRowShopSection';
import { getFournisseursForStockFilter } from '@/utils/getFournisseursForStockFilter';
import { getProfileConnected } from '@/utils/getProfileConnected';
import { getStockBySearchParams } from '@/utils/getStockBySearchParams';

const page = async ({
  searchParams,
  params,
}: {
  searchParams: { prix?: string; pieces?: string; velos?: string; fournisseur: string };
  params: { id_boutique: string };
}) => {
  const user = await getProfileConnected();
  const items = await getStockBySearchParams(searchParams, params.id_boutique);
  const fournisseurs = await getFournisseursForStockFilter();

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 pb-2 px-2 sm:flex-row w-full h-auto gap-2">
        <FilterSection
          user={user}
          key={JSON.stringify(searchParams)}
          searchParams={searchParams}
          content="stock"
          fournisseurs={fournisseurs}
          id_boutique={params.id_boutique}
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
