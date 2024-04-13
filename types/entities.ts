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
export type CommandesTableau = {
  id_commande: string;
  adresse: string;
  ville: string;
  cp: string;
  created_at: string;
  status: 'En attente de traitement' | 'En attente de restockage' | 'En traitement' | 'Envoyée';
};
