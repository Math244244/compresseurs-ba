# 🔧 Compresseurs BA - Site Web Professionnel

Site web moderne et professionnel pour Compresseurs BA, spécialiste des solutions de compression d'air industrielle.

## 🚀 Technologies Utilisées

- **HTML5** - Structure sémantique moderne
- **Tailwind CSS 3.4** - Framework CSS utility-first
- **JavaScript ES6+ Modules** - Interactivité moderne
- **Firebase Hosting** - Hébergement rapide et sécurisé
- **Firebase Firestore** - Base de données en temps réel
- **Firebase Analytics** - Suivi et analyse du trafic
- **Node.js & npm** - Gestion des dépendances

## 📁 Structure du Projet

```
Compresseurs-BA/
│
├── public/                 # Fichiers publics (déployés sur Firebase)
│   ├── index.html         # Page d'accueil
│   ├── favicon.svg        # Icône du site
│   ├── css/
│   │   └── style.css      # CSS compilé (généré automatiquement)
│   └── js/
│       ├── script.js      # JavaScript principal
│       └── firebase-config.js  # Configuration Firebase
│
├── src/                   # Fichiers source
│   └── css/
│       └── input.css      # Styles Tailwind (source)
│
├── node_modules/          # Dépendances npm (auto-généré)
├── package.json           # Configuration npm
├── tailwind.config.js     # Configuration Tailwind CSS
├── postcss.config.js      # Configuration PostCSS
├── firebase.json          # Configuration Firebase
├── .firebaserc           # Projet Firebase
├── .gitignore            # Fichiers à ignorer par Git
└── README.md             # Documentation
```

## ⚡ Installation et Démarrage

### 1. Installer les dépendances

```bash
npm install
```

### 2. Développement local

Lancer le serveur de développement avec watch mode pour Tailwind :

```bash
npm run dev
```

Ou servir avec Firebase :

```bash
npm run firebase:serve
```

### 3. Build pour production

Compiler le CSS optimisé :

```bash
npm run build
```

## 📋 Scripts Disponibles

| Script | Description |
|--------|-------------|
| `npm run dev` | Lance le mode développement avec watch CSS |
| `npm run watch:css` | Surveille les changements CSS et compile automatiquement |
| `npm run build:css` | Compile et minifie le CSS pour production |
| `npm run build` | Build complet du projet |
| `npm run firebase:serve` | Lance le serveur local Firebase |
| `npm run firebase:deploy` | Déploie le site sur Firebase |

## 🎨 Fonctionnalités

### ✅ Design & UX
- Design moderne et professionnel avec Tailwind CSS
- Responsive (mobile, tablette, desktop)
- Animations fluides et transitions
- Navigation sticky avec highlight automatique
- Menu hamburger pour mobile

### ✅ Sections
1. **Hero Section** - Présentation impactante avec CTA
2. **Produits** - 3 types de compresseurs
3. **Services** - 4 services principaux
4. **À propos** - Présentation de l'entreprise avec statistiques
5. **Contact** - Formulaire avec validation et informations
6. **Footer** - Navigation et mentions légales

### ✅ Performance
- CSS minifié en production
- Lazy loading des images
- Cache headers configurés
- Code optimisé

## 🔥 Configuration Firebase

### Première configuration

1. Installer Firebase CLI globalement (si ce n'est pas déjà fait) :

```bash
npm install -g firebase-tools
```

2. Se connecter à Firebase :

```bash
firebase login
```

3. Initialiser Firebase (déjà configuré dans ce projet) :

```bash
firebase init
```

Choisir :
- ✅ Hosting
- ✅ Firestore
- ✅ Use existing project: `compresseurs-ba`
- ✅ Public directory: `public`
- ✅ Configure as single-page app: Yes
- ✅ Overwrite index.html: No

### Configuration Firestore

Le projet utilise Firestore pour enregistrer les messages de contact. Vous devez configurer les règles de sécurité :

1. Dans la console Firebase (https://console.firebase.google.com), allez dans **Firestore Database**
2. Cliquez sur **Règles** et utilisez ces règles :

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Collection des contacts - écriture publique, lecture admin uniquement
    match /contacts/{contactId} {
      allow create: if request.auth == null || request.auth != null;
      allow read, update, delete: if request.auth != null;
    }
  }
}
```

3. Créez l'index Firestore si nécessaire (Firebase vous le suggèrera automatiquement)

### Configuration de la base de données

La collection `contacts` stocke automatiquement :
- `name` (string) - Nom du contact
- `email` (string) - Email du contact
- `phone` (string) - Téléphone (optionnel)
- `message` (string) - Message
- `timestamp` (timestamp) - Date de soumission
- `status` (string) - Statut du message ('nouveau' par défaut)

### Déploiement

Déployer sur Firebase Hosting :

```bash
npm run firebase:deploy
```

Ou manuellement :

```bash
firebase deploy --only hosting
```

Pour déployer les règles Firestore :

```bash
firebase deploy --only firestore:rules
```

## 🎨 Personnalisation

### Modifier les couleurs

Éditez `tailwind.config.js` :

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        600: '#2563eb',  // Couleur principale
        // ...
      },
    },
  },
}
```

### Ajouter des composants Tailwind

Modifiez `src/css/input.css` :

```css
@layer components {
  .mon-composant {
    @apply bg-primary-600 text-white p-4 rounded;
  }
}
```

### Modifier le contenu

Éditez `public/index.html` directement.

## 📧 Formulaire de Contact

Le formulaire inclut :
- ✅ Validation des champs côté client
- ✅ Validation email avec regex
- ✅ Messages de notification (succès/erreur)
- ✅ Design responsive
- ✅ Sauvegarde dans Firebase Firestore

### Fonctionnement

Le formulaire enregistre automatiquement les messages dans Firestore. Pour consulter les messages :

1. Allez sur la [Console Firebase](https://console.firebase.google.com)
2. Sélectionnez votre projet `compresseurs-ba`
3. Cliquez sur **Firestore Database**
4. Vous verrez la collection `contacts` avec tous les messages

### Notifications par email (optionnel)

Pour recevoir des emails lors des soumissions, vous pouvez utiliser Firebase Functions :

```javascript
// functions/index.js
const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

exports.sendContactEmail = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    const data = snap.data();
    // Configurer nodemailer et envoyer l'email
  });
```

## 🔜 Améliorations Possibles

- [x] ~~Ajouter Firebase Firestore pour les contacts~~
- [x] ~~Ajouter Firebase Analytics~~
- [ ] Implémenter Firebase Functions pour les notifications email
- [ ] Ajouter une galerie d'images
- [ ] Intégrer un blog avec Firestore
- [ ] Ajouter des témoignages clients
- [ ] Intégrer Google Maps
- [ ] Ajouter une FAQ interactive
- [ ] Implémenter un système de devis en ligne
- [ ] Optimiser les images avec Sharp ou Imagemin
- [ ] Ajouter des tests automatisés
- [ ] Créer un panneau d'administration pour gérer les contacts

## 🌐 SEO

Le site inclut :
- ✅ Balises meta optimisées
- ✅ Structure HTML sémantique
- ✅ URLs propres
- ✅ Performance optimale

Pour améliorer le SEO :
- Ajoutez un sitemap.xml
- Configurez robots.txt
- Ajoutez des données structurées (JSON-LD)
- Optimisez les images (alt text, compression)

## 📱 Support Navigateurs

Le site est compatible avec :
- ✅ Chrome (dernières versions)
- ✅ Firefox (dernières versions)
- ✅ Safari (dernières versions)
- ✅ Edge (dernières versions)
- ✅ Navigateurs mobiles

## 🤝 Contribution

Pour contribuer au projet :

1. Créez une branche pour votre fonctionnalité
2. Committez vos changements
3. Poussez vers la branche
4. Ouvrez une Pull Request

## 📄 Licence

Tous droits réservés - Compresseurs BA © 2024

## 📞 Support

Pour toute question ou assistance :
- 📧 Email: contact@compresseursba.fr
- 📞 Téléphone: +33 1 23 45 67 89

---

**Développé avec ❤️ et Tailwind CSS**

Bon développement ! 🚀
