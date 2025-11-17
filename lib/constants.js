// Constantes centralisées pour Compresseur BA
// ✅ Coordonnées mises à jour le ${new Date().toLocaleDateString('fr-CA')}

export const COMPANY_INFO = {
  name: 'Compresseur BA',
  legalName: 'Compresseur BA Inc.',
  
  // ✅ COORDONNÉES RÉELLES
  phone: '418-281-9780',
  phoneFormatted: '(418) 281-9780',
  phoneRaw: '4182819780', // Format pour tel:
  
  // ⚠️ TODO: Confirmer l'adresse email
  email: 'info@compresseursba.ca',
  
  // ✅ ADRESSE RÉELLE
  address: {
    street: '709 7e Rang S',
    city: 'East Broughton',
    province: 'QC',
    postalCode: 'G0N 1G0',
    country: 'Canada',
    full: '709 7e Rang S, East Broughton, QC G0N 1G0, Canada',
    short: '709 7e Rang S, East Broughton, QC G0N 1G0',
  },
  
  // ⚠️ TODO: Ajuster selon les heures réelles d'ouverture
  hours: {
    weekdays: 'Lundi-Vendredi : 8h00 - 17h00',
    saturday: 'Samedi : Fermé',
    sunday: 'Dimanche : Fermé',
    emergency: 'Urgences : Appelez-nous',
  },
  
  // ⚠️ TODO: Obtenir les coordonnées GPS exactes de l'adresse
  // Utilisez Google Maps pour obtenir les coordonnées précises
  geo: {
    latitude: 46.2127,
    longitude: -71.1947,
  },
  
  // ⚠️ TODO: Ajouter les liens de médias sociaux si applicable
  social: {
    facebook: '',
    linkedin: '',
  },
};

export const ROUTES = {
  home: '/',
  services: {
    base: '/services',
    reparationUrgence: '/services/reparation-urgence',
    reparationAtelier: '/services/reparation-atelier',
    remontes: '/services/remontes',
    entretien: '/services/entretien',
  },
  produits: {
    base: '/produits',
    neufs: '/produits/neufs',
    occasion: '/produits/occasion',
  },
  about: '/a-propos',
  zone: '/zone-desservie',
  faq: '/faq',
  blog: '/blog',
  contact: '/contact',
  merci: '/merci',
  politique: '/politique-confidentialite',
};

export const FIRESTORE_COLLECTIONS = {
  contacts: 'contacts',
  produitsOccasion: 'produits_occasion',
  blogArticles: 'articles_blog',
};

