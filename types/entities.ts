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

export type Piece = {
  id_piece: string;
  nom: string;
  description: string;
  type:
    | 'Cadre'
    | 'Guidon'
    | 'Freins'
    | 'Selle'
    | 'Dérailleur Avant'
    | 'Dérailleur Arrière'
    | 'Roue avant'
    | 'Roue arrière'
    | 'Réflecteurs'
    | 'Pédalier'
    | 'Ordinateur'
    | 'Panier';
  prix_unitaire: number;
  date_introduction_marche: string;
  date_discontinuation_production: string;
  image: string;
};

export type Velo = {
  id_velo: string;
  nom: string;
  type: 'VTT' | 'Vélo de course' | 'Classique' | 'BMX';
  grandeur: string;
  description: string;
  prix_unitaire: number;
  date_introduction_marche: string;
  date_discontinuation_production?: string;
  image: string;
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

export type FournisseurTableau = {
  id_fournisseur: string;
  nom_entreprise: string;
  nom_contact: string;
  siret: string;
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
export type CommandesTableauType = {
  id_commande: string;
  created_at: string;
  adresse: string;
  ville: string;
  cp: string;
  id_boutique?: string;
  id_vendeur?: string;
  id_client: string;
  status: 'En attente de traitement' | 'En attente de restockage' | 'En traitement' | 'Envoyée';
  nom?: string;
  prenom?: string;
  avis: { note: number }[] | [];
  items: any[];
};

export type PieceStock = {
  id_piece: string;
  nom: string;
  type: string;
  image: string;
  description: string;
  prix_unitaire: number;
  date_introduction_marche: string;
  date_discontinuation_production: string;
  fournisseurs: { nom_fournisseur: string; quantite: number }[];
};

export type VeloStock = {
  id_velo: string;
  nom: string;
  type: string;
  image: string;
  grandeur: string;
  description: string;
  prix_unitaire: number;
  date_introduction_marche: string;
  date_discontinuation_production: string;
  quantite: number;
};
