import { BackgroundBeams } from '@/components/ui/background-beams';
import { BentoGrid, BentoGridItem } from '@/components/ui/bento-grid';
import BMX from '@/public/BMX.png';
import Course from '@/public/Course.png';
import Classique from '@/public/Classique.png';
import VTT from '@/public/VTT.png';
import Pieces_detachees from '@/public/Pièces détachées.png';
import Image from 'next/image';
import { InfiniteMovingCards } from '@/components/ui/infinite-moving-cards';

export default async function Index() {
  return (
    <div className="flex flex-col w-full h-full">
      <div className="flex relative min-h-[calc(100svh-5rem)] w-full justify-center bg-background transition-colors duration-500">
        <div className="absolute w-full h-full">
          <BackgroundBeams />
        </div>

        <div className="w-full flex flex-col items-center justify-center max-w-8xl z-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-center text-vm_text_gray dark:text-white transition-all duration-500">
            Votre route vers la perfection.
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-5xl text-center text-vm_secondary transition-all duration-500">
            Chez VeloMax, qualité et confiance sont notre devise. Découvrez notre sélection minutieuse de vélos et
            pièces détachées pour une expérience de cyclisme incomparable.
          </p>
        </div>
      </div>

      <div className="flex flex-col bg-vm_lightgreen items-center py-10 mb-80 px-10 transition-colors duration-500">
        <h3 className="text-4xl font-semibold text-center text-vm_text_gray dark:text-white transition-colors duration-500 max-w-8xl">
          Meilleurs ventes
        </h3>

        <div className="w-full flex flex-col md:flex-row justify-between gap-6 md:gap-0  mt-10 max-w-8xl">
          <div className="w-full md:w-1/2 flex justify-center gap-6">
            <div className="w--1/2 md:w-[45%] aspect-square rounded-md overflow-hidden bg-gray-500">
              <Image src="/images/bike1.jpg" width={300} height={300} alt="meilleur vente 1" />
            </div>
            <div className="w--1/2 md:w-[45%] aspect-square rounded-md overflow-hidden bg-gray-500">
              <Image src="/images/bike2.jpg" width={300} height={300} alt="meilleur vente 2" />
            </div>
          </div>
          <div className="w-full md:w-1/2 flex justify-center gap-6">
            <div className="w--1/2 md:w-[45%] aspect-square rounded-md overflow-hidden bg-gray-500">
              <Image src="/images/bike3.jpg" width={300} height={300} alt="meilleur vente 3" />
            </div>
            <div className="w--1/2 md:w-[45%] aspect-square rounded-md overflow-hidden bg-gray-500">
              <Image src="/images/bike4.jpg" width={300} height={300} alt="meilleur vente 4" />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col px-2 sm:px-8 md:px-14 lg:px-20 max-w-8xl mx-auto mb-80">
        <h1 className="text-[40px] sm:text-[60px] md:text-[100px] lg:text-[140px] xl:text-[180px] h-14 sm:h-20 md:h-32 lg:h-44 xl:h-56 font-semibold text-left text-[#DCDCDC] categories-title-xs sm:categories-title transition-all">
          CATÉGORIES
        </h1>
        <BentoGrid className="w-full">
          {items.map((item, i) => (
            <BentoGridItem
              key={i}
              title={item.title}
              image={item.image}
              href={item.href}
              className={i === 0 ? 'col-span-3 lg:col-span-2' : 'col-span-3 lg:col-span-1'}
            />
          ))}
        </BentoGrid>
      </div>

      <div className="w-full flex flex-col px-2 sm:px-8 md:px-14 lg:px-20 max-w-8xl mx-auto">
        <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-left text-vm_text_gray dark:text-white pb-4 transition-all duration-500">
          Rejoignez la <u className="underline-offset-8 decoration-vm_secondary">communauté VeloMax !</u>
        </h1>
        <InfiniteMovingCards
          className="mb-10"
          speed="slow"
          items={[
            {
              quote:
                'VeloMax a dépassé toutes mes attentes en matière de service client. Leur équipe est toujours disponible pour répondre à mes questions et résoudre mes problèmes.',
              name: 'Louis Renault',
              title: 'Client fidèle',
            },
            {
              quote:
                "Je suis impressionné par l'engagement de VeloMax envers la durabilité. Leurs initiatives pour promouvoir le cyclisme écologique sont vraiment inspirantes.",
              name: 'Camille Leclerc',
              title: 'Éco-cycliste',
            },
            {
              quote:
                'En tant que parent, je cherchais des vélos de qualité pour mes enfants. VeloMax propose une excellente sélection pour les jeunes cyclistes.',
              name: 'Émilie Tremblay',
              title: 'Parent satisfait',
            },
            {
              quote:
                "VeloMax est bien plus qu'une boutique de vélos, c'est un lieu où je trouve inspiration et camaraderie. Je suis reconnaissant d'avoir découvert cette communauté.",
              name: 'Antoine Bergeron',
              title: 'Cycliste passionné',
            },
            {
              quote:
                "Je cherchais des pièces détachées pour mon vélo et j'ai trouvé mon bonheur chez VeloMax. Je recommande à tous les amateurs de vélo.",
              name: 'Jane Smith',
              title: 'Amatrice de vélo',
            },
            {
              quote:
                "J'ai été impressionné par la gamme de produits disponibles chez VeloMax. Leur sélection répond vraiment aux besoins de tous les cyclistes, des débutants aux professionnels.",
              name: 'Alexandre Dupont',
              title: 'Cycliste expérimenté',
            },
            {
              quote:
                "En tant que triathlète, la qualité de mon équipement est essentielle. VeloMax propose des articles haut de gamme qui m'ont aidé à améliorer mes performances.",
              name: 'Sophie Martin',
              title: 'Triathlète compétitive',
            },
            {
              quote:
                "VeloMax n'est pas seulement une boutique de vélos, c'est une communauté. Leur équipe est passionnée et toujours prête à partager des conseils précieux.",
              name: 'Thomas Lefebvre',
              title: 'Membre de la communauté VeloMax',
            },
            {
              quote:
                'En tant que cycliste urbain, je recherche des accessoires pratiques et stylés. VeloMax propose une sélection qui correspond parfaitement à mes besoins.',
              name: 'Marie Dubois',
              title: 'Cycliste urbaine',
            },
          ]}
        />
      </div>
    </div>
  );
}

const items = [
  {
    title: 'VTT',
    image: VTT.src,
    href: '/shop?velos=VTT',
  },
  {
    title: 'COURSES',
    image: Course.src,
    href: '/shop?velos=Vélo+de+course',
  },
  {
    title: 'Pièces détachées',
    image: Pieces_detachees.src,
    href: '/shop?pieces=Cadre%2CGuidon%2CFreins%2CSelle%2CDérailleur+Avant%2CDérailleur+Arrière%2CRoue+avant%2CRoue+arrière%2CRéflecteurs%2CPédalier%2COrdinateur%2CPanier',
  },
  {
    title: 'BMX',
    image: BMX.src,
    href: '/shop?velos=BMX',
  },
  {
    title: 'Classique',
    image: Classique.src,
    href: '/shop?velos=Classique',
  },
];
