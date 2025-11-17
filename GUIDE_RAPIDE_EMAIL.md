# ⚡ GUIDE RAPIDE - ACTIVER LES NOTIFICATIONS EMAIL

## 🎯 **OBJECTIF**

Recevoir un email automatique à `compresseursba@gmail.com` chaque fois qu'un client remplit le formulaire de contact.

---

## ✅ **DÉJÀ FAIT**

✅ Code Firebase Functions créé  
✅ Configuration Firebase mise à jour  
✅ Dépendances installées  
✅ Email template HTML magnifique créé  

**IL RESTE SEULEMENT 3 ÉTAPES !**

---

## 🚀 **3 ÉTAPES POUR ACTIVER**

### **ÉTAPE 1 : MOT DE PASSE GMAIL (5 min)**

1. Allez sur : **https://myaccount.google.com/apppasswords**
2. Connectez-vous avec `compresseursba@gmail.com`
3. Créez un mot de passe d'application :
   - Nom : **Compresseurs BA Notifications**
   - **COPIEZ LE MOT DE PASSE** (16 caractères)

### **ÉTAPE 2 : CONFIGURER FIREBASE (2 min)**

Ouvrez votre terminal et exécutez :

```bash
firebase functions:config:set gmail.email="compresseursba@gmail.com"
firebase functions:config:set gmail.password="VOTRE_MOT_DE_PASSE_ICI"
```

**Remplacez** `VOTRE_MOT_DE_PASSE_ICI` par le mot de passe copié à l'étape 1.

### **ÉTAPE 3 : DÉPLOYER (3 min)**

```bash
firebase deploy --only functions
```

Attendez 2-3 minutes que le déploiement se termine.

---

## 🧪 **TESTER**

1. Allez sur votre site : https://compresseurs-ba.web.app
2. Remplissez le formulaire de contact
3. Vérifiez votre boîte email : `compresseursba@gmail.com`

**Vous devriez recevoir un email en moins de 10 secondes !** 🎉

---

## ⚠️ **IMPORTANT : PLAN BLAZE**

Pour que ça fonctionne, vous devez activer le **plan Blaze** (Pay-as-you-go) sur Firebase.

**Pourquoi ?** Le plan gratuit ne permet pas les appels externes (Gmail).

**Coût ?** Pour votre usage (50-100 emails/mois) : **0,00 $ - 0,10 $ / mois**

**Comment activer ?**
1. Allez sur : https://console.firebase.google.com/project/compresseurs-ba/usage
2. Cliquez sur **"Upgrade"** → **"Blaze Plan"**
3. Entrez vos infos de carte
4. Définissez un budget (ex : 10 $/mois pour être tranquille)

---

## 📧 **CE QUE VOUS RECEVREZ**

Email avec :
- 🔔 Notification immédiate
- 👤 Nom, email, téléphone du client
- 💬 Message complet
- 🕒 Date et heure
- 🔘 Bouton "Répondre au client"

**Design noir & rouge** assorti à votre branding !

---

## 🆘 **BESOIN D'AIDE ?**

Consultez le guide détaillé : **`CONFIGURATION_EMAIL_NOTIFICATIONS.md`**

Ou vérifiez les logs :
```bash
firebase functions:log
```

---

**TEMPS TOTAL** : **10-15 minutes**

**Après cela, vous ne manquerez plus jamais un message client ! 📬**

