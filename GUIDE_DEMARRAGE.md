# 🚀 Guide de Démarrage Rapide - Compresseurs BA

Ce guide vous aidera à démarrer rapidement avec le projet.

## ✅ Prérequis

Avant de commencer, assurez-vous d'avoir installé :

1. **Node.js** (version 16 ou supérieure)
   - Téléchargez sur : https://nodejs.org/
   - Vérifiez l'installation : `node --version`

2. **npm** (inclus avec Node.js)
   - Vérifiez l'installation : `npm --version`

3. **Git** (optionnel, pour le versioning)
   - Téléchargez sur : https://git-scm.com/

## 📦 Installation - Première fois

### Étape 1 : Ouvrir le terminal

Ouvrez PowerShell ou le terminal dans le dossier du projet :

```powershell
cd "C:\Users\guilb\Desktop\Projet WEB\Compresseurs BA"
```

### Étape 2 : Installer les dépendances

```bash
npm install
```

Cette commande va installer :
- Tailwind CSS
- PostCSS
- Autoprefixer
- Firebase Tools

⏱️ Cela peut prendre 1-2 minutes.

### Étape 3 : Compiler le CSS

```bash
npm run build:css
```

Cela va créer le fichier `public/css/style.css` à partir de `src/css/input.css`.

## 🎨 Développement

### Démarrer le mode développement

```bash
npm run dev
```

Cette commande :
- ✅ Lance Tailwind en mode watch
- ✅ Recompile automatiquement le CSS à chaque modification
- ✅ Surveille les fichiers HTML et CSS

**Laissez cette commande tourner pendant que vous développez !**

### Ouvrir le site

Ouvrez le fichier `public/index.html` dans votre navigateur :
- Double-cliquez sur le fichier
- Ou faites un clic droit → "Ouvrir avec" → Votre navigateur

### Modifier le site

1. **Pour modifier le contenu** : Éditez `public/index.html`
2. **Pour modifier les styles** : Éditez `src/css/input.css`
3. **Pour modifier le JavaScript** : Éditez `public/js/script.js`

Le CSS sera automatiquement recompilé ! 🎉

## 🔥 Firebase Hosting

### Configuration initiale (à faire une seule fois)

1. **Installer Firebase CLI globalement** :

```bash
npm install -g firebase-tools
```

2. **Se connecter à Firebase** :

```bash
firebase login
```

Cela ouvrira votre navigateur pour vous connecter avec votre compte Google.

3. **Créer un projet Firebase** :

- Allez sur https://console.firebase.google.com/
- Cliquez sur "Ajouter un projet"
- Nommez-le "compresseurs-ba" (ou autre nom)
- Suivez les étapes

4. **Lier le projet local à Firebase** :

```bash
firebase use --add
```

Sélectionnez votre projet Firebase.

### Déployer le site

```bash
npm run firebase:deploy
```

Ou :

```bash
firebase deploy --only hosting
```

Votre site sera disponible sur : `https://votre-projet.web.app`

### Tester localement avec Firebase

```bash
npm run firebase:serve
```

Ouvrez : http://localhost:5000

## 📝 Workflow de développement typique

```bash
# 1. Ouvrir le terminal dans le dossier du projet
cd "C:\Users\guilb\Desktop\Projet WEB\Compresseurs BA"

# 2. Lancer le mode développement
npm run dev

# 3. Ouvrir public/index.html dans le navigateur

# 4. Modifier les fichiers
# - HTML : public/index.html
# - CSS : src/css/input.css
# - JS : public/js/script.js

# 5. Rafraîchir le navigateur pour voir les changements

# 6. Quand vous avez terminé, arrêter le serveur : Ctrl+C

# 7. Build pour production
npm run build

# 8. Déployer sur Firebase
npm run firebase:deploy
```

## 🎨 Utiliser Tailwind CSS

### Classes de base

```html
<!-- Couleurs -->
<div class="bg-primary-600 text-white">Contenu</div>

<!-- Espacement -->
<div class="p-4 m-2">Padding 4, Margin 2</div>
<div class="px-8 py-4">Padding horizontal 8, vertical 4</div>

<!-- Flexbox -->
<div class="flex items-center justify-between">...</div>

<!-- Grid -->
<div class="grid grid-cols-3 gap-4">...</div>

<!-- Responsive -->
<div class="text-sm md:text-base lg:text-lg">Texte responsive</div>

<!-- Hover -->
<button class="bg-blue-500 hover:bg-blue-700">Bouton</button>
```

### Documentation Tailwind

- 📚 Documentation officielle : https://tailwindcss.com/docs
- 🎨 Cheat sheet : https://nerdcave.com/tailwind-cheat-sheet

## 🐛 Problèmes courants

### Le CSS ne se charge pas

**Solution :**
```bash
npm run build:css
```

### Les modifications CSS ne s'appliquent pas

**Solution :**
1. Vérifiez que `npm run dev` est en cours d'exécution
2. Rafraîchissez le navigateur (Ctrl+F5 pour forcer)
3. Videz le cache du navigateur

### Erreur "npm not found"

**Solution :**
- Installez Node.js : https://nodejs.org/
- Redémarrez le terminal après l'installation

### Erreur Firebase

**Solution :**
```bash
firebase login
firebase use --add
```

## 📚 Ressources utiles

- **Tailwind CSS** : https://tailwindcss.com/
- **Firebase Hosting** : https://firebase.google.com/docs/hosting
- **MDN Web Docs** : https://developer.mozilla.org/

## 💡 Conseils

1. **Utilisez toujours `npm run dev` pendant le développement** pour que Tailwind recompile automatiquement
2. **Testez sur plusieurs navigateurs** (Chrome, Firefox, Safari)
3. **Testez sur mobile** (mode responsive du navigateur : F12 → icône mobile)
4. **Faites des commits Git réguliers** pour sauvegarder votre travail
5. **Lisez la documentation Tailwind** pour découvrir toutes les possibilités

## 🎯 Prochaines étapes

1. ✅ Personnalisez le contenu dans `public/index.html`
2. ✅ Ajoutez vos vraies informations (adresse, téléphone, email)
3. ✅ Ajoutez vos images dans un dossier `public/images/`
4. ✅ Modifiez les couleurs dans `tailwind.config.js`
5. ✅ Configurez Firebase et déployez le site
6. ✅ Ajoutez Google Analytics (optionnel)
7. ✅ Configurez un nom de domaine personnalisé

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes, vérifiez :
1. Les messages d'erreur dans le terminal
2. La console du navigateur (F12 → Console)
3. La documentation officielle
4. Stack Overflow pour des problèmes spécifiques

---

**Bon développement ! 🚀**

