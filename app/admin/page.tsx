const page = () => {
  const tabs = [
    {
      nom: 'Commandes à prendre en charge',
      icon: <svg></svg>,
      path: '/commandes-a-prendre-en-charge',
    },
    {
      nom: 'Commandes prises en charge',
      icon: <svg></svg>,
      path: '/admin/id_boutique/commandes',
    },
    {
      nom: 'Stock',
      icon: <svg></svg>,
      path: '/admin/id_boutique/stock',
    },
    {
      nom: 'Fournisseurs',
      icon: <svg></svg>,
      path: '/admin/fournisseurs',
    },
    {
      nom: 'Clients',
      icon: <svg></svg>,
      path: '/admin/clients',
    },
    {
      nom: 'Salariés',
      icon: <svg></svg>,
      path: '/admin/id_boutique/salaries',
    },
    {
      nom: 'Statistiques',
      icon: <svg></svg>,
      path: '/admin/id_boutique/statistiques',
    },
  ];

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-wrap mt-8 px-4 xl:px-0 gap-10 w-full">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className="bg-gray-400 w-2/12 max-w-[250px] aspect-square rounded-md flex flex-col justify-center items-center"
          >
            {tab.icon}
            <p className="text-center w-full">{tab.nom}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default page;
