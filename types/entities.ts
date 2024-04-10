export type Particulier = {
  role: 'particulier';
  id_particulier: string;
  nom: string;
  prenom: string;
  adresse: string;
  ville: string;
  cp: string;
  province: string;
  telephone: string;
};

export type Vendeur = {
  id_vendeur: string;
  nom: string;
  prenom: string;
  temps: 'partiel' | 'plein';
  date_embauche: string;
};

export type VendeurUser = Vendeur & { role: 'vendeur' };

export type Professionnel = {
  role: 'professionnel';
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
  role: 'gerant';
  id_gerant: string;
  nom: string;
  prenom: string;
  id_boutique: string;
};

export type Admin = {
  role: 'admin';
  id_admin: string;
  nom: string;
  prenom: string;
};
