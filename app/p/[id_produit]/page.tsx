import { Button } from '@/components/ui/button';

const page = () => {
  const infos = [
    {
      label: 'Grandeur',
      value: 'Adulte',
    },
    {
      label: 'Cadre',
      value: 'C32',
    },
    {
      label: 'Guidon',
      value: 'G7',
    },
    {
      label: 'Freins',
      value: 'F8',
    },
    {
      label: 'Selle',
      value: 'S88',
    },
    {
      label: 'Pédalier',
      value: 'P12',
    },
    {
      label: 'Dérailleur AV',
      value: 'DV113',
    },
    {
      label: 'Dérailleur AR',
      value: 'DR12',
    },
    {
      label: 'Roue AV',
      value: 'R45',
    },
    {
      label: 'Roue AR',
      value: 'R46',
    },
    {
      label: 'Ordinateur',
      value: 'O2',
    },
  ];

  return (
    <div className="flex flex-col w-full h-full max-w-8xl">
      <div className="flex flex-col mt-8 px-4 xl:px-0 gap-10 w-full">
        {/* article image, prix, nom, btn */}
        <div className="flex w-full gap-8">
          <div className="w-5/12">
            <div className="w-full aspect-square rounded-md bg-vm_text_gray"></div>
          </div>
          <div className="w-7/12 flex flex-col gap-4">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-vm_text_gray dark:text-white break-words">
              Nom du produit
            </h1>
            <h2 className="text-2xl lg:text-3xl font-semibold text-vm_secondary">1200€</h2>
            <Button className="w-fit bg-vm_secondary text-white">Ajouter au panier</Button>
          </div>
        </div>

        {/* article infos */}
        <div className="flex flex-col w-full gap-4">
          <h2 className="text-2xl font-semibold text-vm_text_gray dark:text-white">Informations :</h2>
          <div className="flex flex-col gap-2">
            {infos.map((info, index) => (
              <div key={index} className="flex gap-4">
                <h3 className="text-lg font-semibold text-vm_text_gray dark:text-white">{info.label} :</h3>
                <p className="text-lg text-vm_text_gray dark:text-white">{info.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
