// data type in DB

export type Particulier = {
  id_particulier: string;
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  telephone: string;
  id_fidelo: string;
  date_souscription: string;
  date_fin_souscription: string;
};

export type Vendeur = {
  id_vendeur: string;
  nom: string;
  prenom: string;
  temps: 'partiel' | 'plein';
  date_embauche: string;
};

export type Professionnel = {
  id_professionnel: string;
  nom_compagnie: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  nom_contact: string;
  remise_commerciale?: number;
  telephone: string;
};

export type Gerant = {
  id_gerant: string;
  nom: string;
  prenom: string;
  id_boutique: string;
};

export type Admin = {
  id_admin: string;
  nom: string;
  prenom: string;
};

// data type for user

export type ParticulierUser = Particulier & { role: 'particulier' };

export type VendeurUser = Vendeur & { role: 'vendeur' };

export type ProfessionnelUser = Professionnel & { role: 'professionnel' };

export type GerantUser = Gerant & { role: 'gerant' };

export type AdminUser = Admin & { role: 'admin' };

//other data type

export type ParticulierTableau = {
  id_particulier: string;
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  telephone: string;
  date_souscription?: string;
  date_fin_souscription?: string;
  fidelo_nom?: string;
  total_articles: number;
  total_prix: number;
};

export type ProfessionnelsTableau = Professionnel & {
  total_articles: number;
  total_prix: number;
};

// [
//   {
//     id_fournisseur: '529d01d4-45b4-4d7b-98ab-5392f75d4236',
//     nom_entreprise: 'FourniMax',
//     nom_contact: 'Angel',
//     adresse: '42 rue des fournisseurs',
//     ville: 'FourniVille',
//     cp: '97319',
//     libelle: null,
//     catalogue: [
//       {
//         pieces_infos: {
//           nom: 'C76',
//           type: 'Cadre',
//           image:
//             'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/temp.png',
//           id_piece: 'aea0ca71-4435-4b36-ae57-0b20c32ac2c6',
//           description: 'description',
//           prix_unitaire: 152,
//           date_introduction_marche: '2021-12-28T00:00:00+00:00',
//           date_discontinuation_production: null
//         },
//         numero_catalogue: 42,
//         prix_fournisseur: 42,
//         delai_approvisionnement: 2
//       },
//       {
//         pieces_infos: {
//           nom: 'G12',
//           type: 'Guidon',
//           image:
//             'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/temp.png',
//           id_piece: '54f22609-8afc-4fb2-8b07-bb3e4b18ec71',
//           description: 'description',
//           prix_unitaire: 92,
//           date_introduction_marche: '2021-12-28T00:00:00+00:00',
//           date_discontinuation_production: null
//         },
//         numero_catalogue: 231,
//         prix_fournisseur: 50,
//         delai_approvisionnement: 3
//       },
//       {
//         pieces_infos: {
//           nom: 'DR56',
//           type: 'Dérailleur Arrière',
//           image:
//             'https://eyujfwcaudwmevbchncm.supabase.co/storage/v1/object/public/images_pieces/temp.png',
//           id_piece: 'cfb34449-9fc8-4dbd-9ef8-be3eb33773fb',
//           description: 'description',
//           prix_unitaire: 203,
//           date_introduction_marche: '2021-12-28T00:00:00+00:00',
//           date_discontinuation_production: null
//         },
//         numero_catalogue: 314,
//         prix_fournisseur: 140,
//         delai_approvisionnement: 2
//       }
//     ]
//   }
// ]

export type FournisseurTableau = {
  id_fournisseur: string;
  nom_entreprise: string;
  nom_contact: string;
  adresse: string;
  ville: string;
  cp: string;
  libelle?: string;
  catalogue: ItemCatalogue[];
};

export type ItemCatalogue = {
  pieces_infos: {
    nom: string;
    type: string;
    image: string;
    id_piece: string;
    description: string;
    prix_unitaire: number;
    date_introduction_marche: string;
    date_discontinuation_production?: string;
  };
  numero_catalogue: number;
  prix_fournisseur: number;
  delai_approvisionnement: number;
};
