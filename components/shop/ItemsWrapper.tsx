const ItemsWrapper = () => {
  const items = [] as any[];
  return (
    <div className={`flex w-full  min-h-[299px] lg:min-h-[339px] overflow-hidden gap-2 p-4 flex-wrap `}>
      {items.length > 0 && items.map((item) => <div className="w-[140px] h-[140px] bg-gray-400 rounded-md"></div>)}
      {items.length === 0 && (
        <div className="min-h-full w-full flex justify-center items-center ">
          <p className="text-vm_text_gray dark:text-white">Aucun item trouvé...</p>
        </div>
      )}
    </div>
  );
};

export default ItemsWrapper;
