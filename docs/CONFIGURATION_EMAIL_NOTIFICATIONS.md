# 📧 CONFIGURATION DES NOTIFICATIONS EMAIL

**Projet** : Compresseurs BA  
**Date** : Novembre 2024  
**Objectif** : Recevoir un email automatique à chaque nouveau message du formulaire de contact

---

## ✅ **CE QUI A ÉTÉ FAIT**

J'ai configuré **Firebase Cloud Functions** pour envoyer un email automatique à `compresseursba@gmail.com` chaque fois qu'un client remplit le formulaire de contact.

### **Fichiers créés** :
- ✅ `functions/package.json` - Dépendances Node.js
- ✅ `functions/index.js` - Code de la fonction d'envoi d'email
- ✅ `functions/.gitignore` - Exclure node_modules de Git
- ✅ `firebase.json` - Configuration Functions ajoutée

---

## 🔐 **ÉTAPE 1 : CRÉER UN MOT DE PASSE D'APPLICATION GMAIL**

Pour que la fonction puisse envoyer des emails depuis `compresseursba@gmail.com`, vous devez créer un **mot de passe d'application**.

### **Instructions détaillées** :

#### **A) Vérifier que la validation en 2 étapes est activée**

1. Allez sur : https://myaccount.google.com/security
2. Connectez-vous avec **compresseursba@gmail.com**
3. Cherchez **"Validation en deux étapes"**
4. Si **NON activée** :
   - Cliquez sur "Validation en deux étapes"
   - Suivez les instructions pour l'activer
   - Utilisez votre numéro de téléphone
5. Si **DÉJÀ activée** : Passez à l'étape B

#### **B) Créer le mot de passe d'application**

1. Allez sur : **https://myaccount.google.com/apppasswords**
2. Connectez-vous avec **compresseursba@gmail.com**
3. Dans **"Sélectionner l'application"** :
   - Choisissez **"Autre (nom personnalisé)"**
   - Nommez-le : **Compresseurs BA Notifications**
   - Cliquez sur **"Générer"**
4. Google va afficher un **mot de passe de 16 caractères** (ex : `abcd efgh ijkl mnop`)
5. **COPIEZ CE MOT DE PASSE** (vous ne le reverrez plus jamais !)
6. **GARDEZ-LE EN LIEU SÛR** (notez-le dans un fichier ou gestionnaire de mots de passe)

### **Format du mot de passe** :
```
Avec espaces : abcd efgh ijkl mnop
Sans espaces : abcdefghijklmnop

Les deux fonctionnent, mais SANS ESPACES est recommandé.
```

---

## ⚙️ **ÉTAPE 2 : CONFIGURER LE MOT DE PASSE DANS FIREBASE**

Maintenant, nous devons stocker ce mot de passe de manière sécurisée dans Firebase.

### **Option A : Via la ligne de commande (Recommandé)**

Ouvrez votre terminal et exécutez ces **2 commandes** :

```bash
firebase functions:config:set gmail.email="compresseursba@gmail.com"
```

Puis :

```bash
firebase functions:config:set gmail.password="VOTRE_MOT_DE_PASSE_ICI"
```

**Remplacez `VOTRE_MOT_DE_PASSE_ICI`** par le mot de passe de 16 caractères généré à l'étape 1.

**Exemple** :
```bash
firebase functions:config:set gmail.password="abcdefghijklmnop"
```

### **Option B : Via la console Firebase**

Si la ligne de commande ne fonctionne pas :

1. Allez sur : https://console.firebase.google.com/project/compresseurs-ba
2. Dans le menu de gauche, cliquez sur **"Functions"**
3. Allez dans l'onglet **"Configuration"** (ou "Environment variables")
4. Ajoutez deux variables :
   - **Clé** : `gmail.email` | **Valeur** : `compresseursba@gmail.com`
   - **Clé** : `gmail.password` | **Valeur** : Votre mot de passe d'application

---

## 🚀 **ÉTAPE 3 : DÉPLOYER LA FONCTION**

Maintenant, déployons la fonction sur Firebase !

### **Commande à exécuter** :

```bash
firebase deploy --only functions
```

**Ce qui va se passer** :
1. Firebase va compiler le code
2. Uploader la fonction sur le cloud
3. La fonction sera active et prête à envoyer des emails !

**Temps estimé** : 2-5 minutes

### **Résultat attendu** :

```
✔  functions: Finished running predeploy script.
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
✔  functions: required API cloudfunctions.googleapis.com is enabled
✔  functions: required API cloudbuild.googleapis.com is enabled
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (X.XX MB) for uploading
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 function sendContactNotification(us-central1)...
✔  functions[sendContactNotification(us-central1)] Successful create operation.
Function URL (sendContactNotification): https://us-central1-compresseurs-ba.cloudfunctions.net/sendContactNotification

✔  Deploy complete!
```

---

## 🧪 **ÉTAPE 4 : TESTER LA FONCTION**

### **Test 1 : Fonction de Test HTTP**

J'ai créé une fonction de test que vous pouvez appeler directement dans votre navigateur :

1. Déployez d'abord (étape 3)
2. Ouvrez cette URL dans votre navigateur :

```
https://us-central1-compresseurs-ba.cloudfunctions.net/testEmail
```

**Si ça fonctionne** : Vous devriez recevoir un email de test à `compresseursba@gmail.com` !

### **Test 2 : Remplir le Formulaire du Site**

1. Allez sur : https://compresseurs-ba.web.app/#contact
2. Remplissez le formulaire de contact
3. Cliquez sur "Envoyer le message"
4. **Attendez 5-10 secondes**
5. **Vérifiez votre boîte de réception** : `compresseursba@gmail.com`

Vous devriez recevoir un email magnifique avec toutes les informations du client !

---

## 📊 **COMMENT ÇA FONCTIONNE**

### **Flux complet** :

```
1. Client remplit le formulaire sur le site
         ↓
2. Formulaire enregistre dans Firestore (collection "contacts")
         ↓
3. Firebase Functions détecte le nouveau document
         ↓
4. La fonction "sendContactNotification" s'exécute
         ↓
5. Nodemailer envoie un email via Gmail
         ↓
6. Vous recevez l'email à compresseursba@gmail.com
         ↓
7. Le document Firestore est mis à jour (emailSent: true)
```

---

## 📧 **FORMAT DE L'EMAIL QUE VOUS RECEVREZ**

### **Objet** :
```
🔔 Nouveau message de [Nom du Client] - Site Web
```

### **Contenu** :
- 📧 **Header stylé** noir et rouge (branding Compresseurs BA)
- 👤 **Informations du client** (nom, email, téléphone)
- 🕒 **Date et heure** du message
- 💬 **Message complet** du client
- ⚡ **Rappel d'action** : Répondre dans les 24h
- 🔘 **Bouton "Répondre au Client"** qui ouvre votre client email

### **Exemple** :

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
🔔 Nouveau Message
Formulaire de contact - Site Web Compresseurs BA
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

👤 Nom : Jean Tremblay
📧 Email : jean.tremblay@example.com
📞 Téléphone : 418 555 1234
🕒 Date : 17 novembre 2024, 21:30
🆔 ID : fhjs4TkUU5frAKjDUQ1q

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💬 Message du client :

Bonjour, mon compresseur Atlas Copco 50HP 
fait un bruit anormal depuis ce matin. 
Pouvez-vous venir vérifier rapidement ?

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ Action recommandée : Répondez dans les 24h

[📧 Répondre au Client]
```

**Design** : Email HTML responsive avec couleurs noir/rouge de votre branding !

---

## 🔍 **VÉRIFIER LES LOGS**

Si vous voulez voir les logs de la fonction (debug) :

```bash
firebase functions:log
```

Ou allez sur :
https://console.firebase.google.com/project/compresseurs-ba/functions

Cliquez sur **"Logs"** pour voir l'historique d'exécution.

---

## 💰 **COÛTS**

### **Firebase Functions (Plan Gratuit - Spark)** :

- ❌ **Le plan gratuit NE PERMET PAS les appels externes (Gmail)**
- 🚨 **Vous devez passer au plan Blaze (Pay-as-you-go)**

### **Firebase Functions (Plan Blaze)** :

- ✅ **2 millions d'invocations / mois** : GRATUIT
- ✅ **400 000 GB-secondes / mois** : GRATUIT
- ✅ **200 000 CPU-secondes / mois** : GRATUIT

**Pour votre usage (emails de formulaire)** :
- Estimation : 50-100 messages / mois
- **Coût mensuel estimé** : **0,00 $ - 0,10 $**

**Pourquoi si peu ?** Chaque exécution prend ~0.5 secondes, vous êtes TRÈS loin des limites gratuites.

---

## ⚠️ **IMPORTANT : PASSER AU PLAN BLAZE**

Pour que les emails fonctionnent, vous DEVEZ activer le plan Blaze :

### **Comment faire** :

1. Allez sur : https://console.firebase.google.com/project/compresseurs-ba/usage
2. Cliquez sur **"Upgrade"** ou **"Modifier le forfait"**
3. Sélectionnez **"Blaze - Pay as you go"**
4. Entrez vos informations de carte de crédit
5. Définissez un **budget mensuel** (ex : 10 $ pour être tranquille)

**Rassurant** :
- ✅ Pas de frais surprises
- ✅ Vous définissez un budget maximum
- ✅ Notification par email si vous approchez la limite
- ✅ Pour votre usage, ça restera gratuit (dans les limites gratuites)

---

## 📋 **CHECKLIST COMPLÈTE**

### **Avant le déploiement** :

- [ ] Validation en 2 étapes activée sur compresseursba@gmail.com
- [ ] Mot de passe d'application Gmail créé (16 caractères)
- [ ] Mot de passe configuré dans Firebase (`firebase functions:config:set`)
- [ ] Plan Blaze activé sur Firebase
- [ ] Dépendances installées (`npm install` dans `/functions`)

### **Déploiement** :

- [ ] Exécuter : `firebase deploy --only functions`
- [ ] Vérifier le déploiement réussi (message de confirmation)
- [ ] Tester avec la fonction HTTP : `/testEmail`

### **Test final** :

- [ ] Remplir le formulaire sur le site web
- [ ] Vérifier Firestore : nouveau document créé
- [ ] Vérifier email reçu à compresseursba@gmail.com
- [ ] Vérifier que le champ `emailSent: true` dans Firestore

---

## 🆘 **DÉPANNAGE**

### **Problème 1 : "Error: Missing or insufficient permissions"**

**Cause** : Plan Firebase gratuit (Spark)  
**Solution** : Passer au plan Blaze (voir section ci-dessus)

### **Problème 2 : "Invalid login: 535-5.7.8 Username and Password not accepted"**

**Cause** : Mot de passe d'application incorrect  
**Solution** :
1. Recréez un mot de passe d'application
2. Reconfigurez : `firebase functions:config:set gmail.password="NOUVEAU_MDP"`
3. Redéployez : `firebase deploy --only functions`

### **Problème 3 : Email non reçu, mais Firestore OK**

**Causes possibles** :
1. Email dans les spams → Vérifiez le dossier spam
2. Fonction n'a pas démarré → Vérifiez les logs (`firebase functions:log`)
3. Configuration email incorrecte → Vérifiez `firebase functions:config:get`

**Solution** :
```bash
# Voir la configuration actuelle
firebase functions:config:get

# Devrait afficher :
{
  "gmail": {
    "email": "compresseursba@gmail.com",
    "password": "abcdefghijklmnop"
  }
}
```

### **Problème 4 : Fonction déployée mais ne se déclenche pas**

**Solution** :
1. Vérifiez les logs : `firebase functions:log`
2. Testez avec `/testEmail`
3. Vérifiez que le document Firestore est bien créé
4. Vérifiez les permissions Firestore

---

## 📞 **BESOIN D'AIDE ?**

Si vous rencontrez des problèmes :

1. **Vérifiez les logs** : `firebase functions:log`
2. **Testez la fonction HTTP** : `/testEmail`
3. **Vérifiez Firestore** : Les documents sont-ils créés ?
4. **Vérifiez la config** : `firebase functions:config:get`

---

## 🎯 **COMMANDES UTILES**

### **Configuration** :
```bash
# Voir la configuration
firebase functions:config:get

# Définir l'email
firebase functions:config:set gmail.email="compresseursba@gmail.com"

# Définir le mot de passe
firebase functions:config:set gmail.password="VOTRE_MOT_DE_PASSE"

# Supprimer la configuration (si besoin de recommencer)
firebase functions:config:unset gmail
```

### **Déploiement** :
```bash
# Déployer seulement les functions
firebase deploy --only functions

# Déployer une fonction spécifique
firebase deploy --only functions:sendContactNotification

# Déployer tout (hosting + functions + firestore)
firebase deploy
```

### **Logs & Debug** :
```bash
# Voir les logs en temps réel
firebase functions:log --only sendContactNotification

# Voir les 100 derniers logs
firebase functions:log --limit 100

# Filtrer par date
firebase functions:log --since 2024-11-17
```

### **Tests** :
```bash
# Tester localement (émulateur)
firebase emulators:start --only functions

# Appeler la fonction de test
curl https://us-central1-compresseurs-ba.cloudfunctions.net/testEmail
```

---

## ✅ **RÉSUMÉ**

Une fois configuré, voici ce qui se passera **automatiquement** :

1. ✉️ **Client remplit le formulaire** sur votre site
2. 💾 **Message enregistré** dans Firestore
3. 🔔 **Firebase Function détecte** le nouveau message
4. 📧 **Email envoyé automatiquement** à compresseursba@gmail.com
5. ✅ **Vous êtes notifié** en quelques secondes
6. 📱 **Vous pouvez répondre** directement depuis votre boîte email

**Zéro intervention manuelle requise !** 🎉

---

## 📊 **PROCHAINES ÉTAPES**

1. **Créer le mot de passe d'application Gmail** (5 min)
2. **Configurer Firebase** (`firebase functions:config:set`) (2 min)
3. **Activer le plan Blaze** (5 min)
4. **Déployer** (`firebase deploy --only functions`) (3 min)
5. **Tester** (remplir le formulaire) (2 min)

**TEMPS TOTAL** : **15-20 minutes**

---

**Après cela, vous recevrez un email automatique pour chaque message du site ! 🚀**

---

**Document créé le** : 17 novembre 2024  
**Projet** : Compresseurs BA  
**Email de destination** : compresseursba@gmail.com

