'use client';
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ItemStatsDrawer from './ItemStatsDrawer';

const StatsItemsWrapper = ({ articles, magasins, vendeurs }: { articles: any[]; magasins: any; vendeurs: any }) => {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [selectedItem, setSelectedItem] = React.useState({} as any);

  const openDrawer = () => setDrawerOpen(true);
  const closeDrawer = () => setDrawerOpen(false);

  return (
    <div className="flex flex-wrap gap-4">
      {articles && articles.length > 0 ? (
        articles.map((item: any) => (
          <div className="w-[140px] bg-white dark:bg-black border rounded-md flex flex-col items-center shadow p-2 transition-colors duration-500">
            <div className="w-[90%] aspect-square relative">
              <Image src={item.image} alt={item.nom} fill sizes="299px" className="rounded-md" />
            </div>
            <div className="flex flex-col w-full items-center gap-1">
              <p className="text-black dark:text-white transition-colors duration-500">{item.nom}</p>
              <Button
                onClick={() => [setSelectedItem(item), openDrawer()]}
                className="w-full py-2 h-fit gap-1 bg-black dark:bg-white text-white dark:text-black transition-colors duration-500"
              >
                Infos
              </Button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-vm_text_gray dark:text-white">Aucun item trouvé...</p>
      )}
      <ItemStatsDrawer
        key={JSON.stringify(selectedItem)}
        open={drawerOpen}
        onClose={closeDrawer}
        magasins={magasins}
        vendeurs={vendeurs}
        selectedPiece={selectedItem}
      />
    </div>
  );
};

export default StatsItemsWrapper;
