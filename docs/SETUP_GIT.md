# 🔧 Configuration Git et GitHub pour Compresseurs BA

## ⚠️ Situation actuelle

Un dépôt Git existe déjà au niveau de votre dossier utilisateur (`C:/Users/guilb`). Cela n'est pas recommandé car cela peut causer des problèmes de gestion de versions.

## ✅ Solution recommandée

### Option 1: Créer un dépôt Git local pour ce projet uniquement

1. **Exclure ce projet du dépôt parent**

Ajoutez cette ligne au fichier `.gitignore` dans `C:/Users/guilb/.gitignore`:

```
Desktop/Projet WEB/
```

2. **Initialiser Git dans le projet Compresseurs BA**

```powershell
cd "C:\Users\guilb\Desktop\Projet WEB\Compresseurs BA"
git init
```

3. **Configurer votre identité Git** (si ce n'est pas déjà fait)

```powershell
git config --global user.name "Votre Nom"
git config --global user.email "votre.email@example.com"
```

4. **Ajouter tous les fichiers**

```powershell
git add .
```

5. **Créer le premier commit**

```powershell
git commit -m "🚀 Initial commit - Compresseurs BA website with Firebase integration"
```

### Option 2: Utiliser le dépôt existant (non recommandé)

Si vous voulez utiliser le dépôt Git existant au niveau utilisateur, assurez-vous que le fichier `.gitignore` à la racine (`C:/Users/guilb/.gitignore`) exclut tous les fichiers système et personnels.

## 🌐 Connexion avec GitHub

### 1. Créer un nouveau dépôt sur GitHub

1. Allez sur [GitHub](https://github.com)
2. Cliquez sur le bouton `+` en haut à droite
3. Sélectionnez "New repository"
4. Nommez-le `Compresseur-BA` ou `compresseurs-ba`
5. **N'ajoutez PAS** de README, .gitignore ou licence (ils existent déjà)
6. Cliquez sur "Create repository"

### 2. Connecter votre dépôt local à GitHub

```powershell
# Ajouter l'origine GitHub
git remote add origin https://github.com/VOTRE-USERNAME/compresseurs-ba.git

# Renommer la branche principale en 'main' (recommandé)
git branch -M main

# Pousser le code sur GitHub
git push -u origin main
```

### 3. Pour les commits futurs

```powershell
# Ajouter les fichiers modifiés
git add .

# Créer un commit avec un message descriptif
git commit -m "Description des changements"

# Pousser sur GitHub
git push
```

## 📝 Bonnes pratiques Git

### Messages de commit

Utilisez des messages clairs et descriptifs:

```
✅ Bon exemples:
- "🎨 Amélioration du design de la section hero"
- "✨ Ajout de la fonctionnalité de contact avec Firestore"
- "🐛 Correction du bug de validation email"
- "📝 Mise à jour de la documentation"
- "🚀 Déploiement de la version 1.0"

❌ Mauvais exemples:
- "update"
- "fix"
- "changes"
```

### Emojis pour commits (optionnel)

- 🎨 `:art:` - Amélioration du style/design
- ✨ `:sparkles:` - Nouvelle fonctionnalité
- 🐛 `:bug:` - Correction de bug
- 📝 `:memo:` - Documentation
- 🚀 `:rocket:` - Déploiement
- ♻️ `:recycle:` - Refactoring
- ⚡️ `:zap:` - Performance
- 🔒 `:lock:` - Sécurité
- 🔧 `:wrench:` - Configuration

### Branches

Pour les fonctionnalités importantes:

```powershell
# Créer une nouvelle branche
git checkout -b feature/nom-fonctionnalite

# Travailler sur la branche...

# Fusionner avec main
git checkout main
git merge feature/nom-fonctionnalite

# Supprimer la branche
git branch -d feature/nom-fonctionnalite
```

## 🔄 Workflow recommandé

1. **Avant de commencer à travailler**: `git pull`
2. **Développer et tester** vos modifications
3. **Ajouter les fichiers**: `git add .`
4. **Commit**: `git commit -m "Message descriptif"`
5. **Pousser**: `git push`

## 🚫 Fichiers à ne JAMAIS commiter

Le `.gitignore` est configuré pour exclure automatiquement:

- ❌ `node_modules/` - Dépendances npm
- ❌ `.env` - Variables d'environnement
- ❌ `.firebase/` - Cache Firebase
- ❌ `*.log` - Fichiers de log
- ❌ `.DS_Store`, `Thumbs.db` - Fichiers système

## 🔐 Gestion des secrets

⚠️ **Important**: Les clés API Firebase dans `firebase-config.js` sont **publiques** et sécurisées par les règles Firebase. Il est normal de les commiter.

Cependant, si vous avez des clés **privées** (clés serveur, tokens, etc.), utilisez des variables d'environnement:

```javascript
// ❌ Ne JAMAIS faire
const privateKey = "ma-cle-secrete-123";

// ✅ Utiliser des variables d'environnement
const privateKey = process.env.PRIVATE_KEY;
```

## 🎯 Configuration GitHub Actions (optionnel)

Pour déployer automatiquement sur Firebase à chaque push:

Créez `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Firebase Hosting

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: FirebaseExtended/action-hosting-deploy@v0
        with:
          repoToken: '${{ secrets.GITHUB_TOKEN }}'
          firebaseServiceAccount: '${{ secrets.FIREBASE_SERVICE_ACCOUNT }}'
          channelId: live
          projectId: compresseurs-ba
```

## 📊 Voir l'historique

```powershell
# Historique des commits
git log --oneline --graph --all

# Voir les différences
git diff

# Voir le statut
git status
```

## 🆘 Commandes utiles

```powershell
# Annuler les modifications locales
git checkout -- fichier.js

# Annuler le dernier commit (garder les modifications)
git reset --soft HEAD~1

# Voir les branches
git branch -a

# Changer de branche
git checkout nom-branche

# Mettre à jour depuis GitHub
git pull
```

## 📌 Notes importantes

1. **Sauvegarder régulièrement** : Commitez et pushez souvent
2. **Messages clairs** : Décrivez ce que vous avez fait
3. **Tester avant de commit** : Assurez-vous que le code fonctionne
4. **Ne jamais forcer** : Évitez `git push --force` sur main
5. **Backup** : GitHub sert aussi de backup de votre code

---

**Pour toute question, consultez la [documentation Git](https://git-scm.com/doc) ou [GitHub Docs](https://docs.github.com)**

