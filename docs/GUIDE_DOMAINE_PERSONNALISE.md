# 🌐 GUIDE COMPLET : DOMAINE PERSONNALISÉ POUR COMPRESSEURS BA

**Objectif** : Passer de `https://crm2-5a4ac.web.app/` à `https://compresseursba.com`

---

## 📋 **ÉTAPE 1 : ACHETER LE DOMAINE (15-25$ CAD/AN)**

### **Vérifier la disponibilité** :
1. Allez sur https://www.namecheap.com/domains/registration/results/?domain=compresseursba.com
2. Ou : https://domains.google.com/registrar/search?searchTerm=compresseursba.com

### **Registraires recommandés** :

| Registraire | Prix/an | Avantages | Lien |
|-------------|---------|-----------|------|
| **Google Domains** | 15-20 CAD | Intégration facile Firebase | https://domains.google.com |
| **Namecheap** | 12-18 CAD | Interface simple, pas cher | https://www.namecheap.com |
| **GoDaddy** | 15-25 CAD | Support FR, interface FR | https://www.godaddy.com/fr-ca |
| **OVH Canada** | 15-20 CAD | Serveurs QC, Support FR | https://www.ovhcloud.com/fr-ca/ |

### **Ce qu'il faut acheter** :
- ✅ `compresseursba.com` (recommandé)
- 🔄 `compresseursba.ca` (optionnel, mais bon pour le Québec)
- 🔄 `www.compresseursba.com` (inclus automatiquement)

**💡 CONSEIL** : Achetez pour 2-5 ans pour économiser et éviter de renouveler chaque année.

---

## 📋 **ÉTAPE 2 : CONNECTER À FIREBASE HOSTING**

### **A) Dans Firebase Console** :

1. **Allez sur Firebase Console** :
   ```
   https://console.firebase.google.com/project/crm2-5a4ac/hosting
   ```

2. **Cliquez sur "Ajouter un domaine personnalisé"** :
   - En haut à droite, cliquez sur le bouton **"Add custom domain"**
   - Ou : Dans le menu **Hosting** → **Add custom domain**

3. **Entrez votre domaine** :
   ```
   compresseursba.com
   ```

4. **Firebase va vous donner des enregistrements DNS à configurer**.

---

### **B) Enregistrements DNS à configurer** :

Firebase va vous demander de créer **2 types d'enregistrements** :

#### **1. Enregistrement de VÉRIFICATION (TXT)** :
Pour prouver que vous possédez le domaine.

**Exemple** :
```
Type: TXT
Nom: @ (ou vide)
Valeur: google-site-verification=aBcD1234eFgH5678...
TTL: 3600 (ou Auto)
```

#### **2. Enregistrement A (Pointage)** :
Pour diriger le domaine vers Firebase.

**Enregistrements A Firebase** (valeurs standards) :
```
Type: A
Nom: @
Valeur: 151.101.1.195
TTL: 3600

Type: A
Nom: @
Valeur: 151.101.65.195
TTL: 3600
```

**⚠️ IMPORTANT** : Firebase va vous donner les valeurs EXACTES à utiliser. Utilisez celles-ci, pas les exemples ci-dessus.

---

## 📋 **ÉTAPE 3 : CONFIGURER LE DNS CHEZ VOTRE REGISTRAIRE**

### **A) Si vous utilisez NAMECHEAP** :

1. **Connectez-vous** : https://www.namecheap.com/myaccount/login/
2. **Allez dans "Domain List"**
3. **Cliquez sur "Manage"** à côté de `compresseursba.com`
4. **Allez dans l'onglet "Advanced DNS"**
5. **Ajoutez les enregistrements** :

**Enregistrement TXT (Vérification)** :
```
Type: TXT Record
Host: @
Value: google-site-verification=... (copié depuis Firebase)
TTL: Automatic
```

**Enregistrements A (Firebase)** :
```
Type: A Record
Host: @
Value: 151.101.1.195
TTL: Automatic

Type: A Record
Host: @
Value: 151.101.65.195
TTL: Automatic
```

**Enregistrement pour www** :
```
Type: CNAME Record
Host: www
Value: crm2-5a4ac.web.app
TTL: Automatic
```

6. **Sauvegardez** et attendez 5-10 minutes.

---

### **B) Si vous utilisez GOOGLE DOMAINS** :

1. **Connectez-vous** : https://domains.google.com
2. **Cliquez sur votre domaine** `compresseursba.com`
3. **Allez dans "DNS"** (menu de gauche)
4. **Descendez jusqu'à "Custom records"**
5. **Ajoutez les enregistrements** :

**Enregistrement TXT** :
```
Host name: @ (ou laissez vide)
Type: TXT
TTL: 3600
Data: google-site-verification=... (copié depuis Firebase)
```

**Enregistrements A** :
```
Host name: @
Type: A
TTL: 3600
Data: 151.101.1.195

Host name: @
Type: A
TTL: 3600
Data: 151.101.65.195
```

**Enregistrement CNAME pour www** :
```
Host name: www
Type: CNAME
TTL: 3600
Data: crm2-5a4ac.web.app
```

6. **Sauvegardez**.

---

### **C) Si vous utilisez GODADDY** :

1. **Connectez-vous** : https://sso.godaddy.com
2. **Allez dans "My Products"** → **"Domains"**
3. **Cliquez sur les 3 points** à côté de `compresseursba.com` → **"Manage DNS"**
4. **Ajoutez les enregistrements** :

**Enregistrement TXT** :
```
Type: TXT
Name: @
Value: google-site-verification=... (copié depuis Firebase)
TTL: 1 Hour (ou Default)
```

**Enregistrements A** :
```
Type: A
Name: @
Value: 151.101.1.195
TTL: 1 Hour

Type: A
Name: @
Value: 151.101.65.195
TTL: 1 Hour
```

**Enregistrement CNAME** :
```
Type: CNAME
Name: www
Value: crm2-5a4ac.web.app
TTL: 1 Hour
```

5. **Sauvegardez**.

---

### **D) Si vous utilisez OVH** :

1. **Connectez-vous** : https://ca.ovh.com/auth/
2. **Allez dans "Noms de domaine"**
3. **Cliquez sur** `compresseursba.com`
4. **Allez dans l'onglet "Zone DNS"**
5. **Cliquez sur "Ajouter une entrée"**

**Enregistrement TXT** :
```
Type: TXT
Sous-domaine: (vide)
Cible: google-site-verification=... (copié depuis Firebase)
```

**Enregistrements A** :
```
Type: A
Sous-domaine: (vide)
Cible: 151.101.1.195

Type: A
Sous-domaine: (vide)
Cible: 151.101.65.195
```

**Enregistrement CNAME** :
```
Type: CNAME
Sous-domaine: www
Cible: crm2-5a4ac.web.app.
```

6. **Sauvegardez** et attendez.

---

## 📋 **ÉTAPE 4 : VÉRIFICATION ET ACTIVATION**

### **A) Retournez dans Firebase Console** :

1. **Allez sur** : https://console.firebase.google.com/project/crm2-5a4ac/hosting
2. **Vous devriez voir** : "Vérification en cours..."
3. **Attendez 5-60 minutes** (propagation DNS)

### **B) États possibles** :

#### **État 1 : "Vérification en cours"** ⏳
- Firebase vérifie l'enregistrement TXT
- **Action** : Attendez 5-10 minutes, puis rafraîchissez

#### **État 2 : "En attente"** ⏳
- Firebase vérifie les enregistrements A
- **Action** : Attendez jusqu'à 24h (généralement 1-2h)

#### **État 3 : "Connecté"** ✅
- Votre domaine est actif !
- Firebase génère automatiquement un certificat SSL (HTTPS)

#### **État 4 : "Erreur"** ❌
- Vérifiez que les enregistrements DNS sont corrects
- Attendez encore (parfois ça prend jusqu'à 48h)

---

## 📋 **ÉTAPE 5 : CERTIFICAT SSL (HTTPS)**

### **Automatique avec Firebase** ✅

Une fois le domaine vérifié, Firebase génère **automatiquement** un certificat SSL **gratuit** de Let's Encrypt.

**Résultat** :
- ✅ `http://compresseursba.com` → redirigé vers HTTPS
- ✅ `https://compresseursba.com` → Fonctionne avec cadenas vert
- ✅ `https://www.compresseursba.com` → Fonctionne aussi

**Durée** : 10-30 minutes après la vérification du domaine.

---

## 📋 **ÉTAPE 6 : REDIRECTION WWW (OPTIONNEL)**

### **Configurer la redirection www → sans www (ou inverse)** :

Firebase gère ça automatiquement, mais vous pouvez choisir :

1. **Dans Firebase Console** → **Hosting**
2. **Cliquez sur votre domaine** `compresseursba.com`
3. **Configurez la redirection** :
   - `www.compresseursba.com` → `compresseursba.com` (recommandé)
   - Ou inverse

**💡 RECOMMANDATION** : Utilisez `compresseursba.com` (sans www) comme domaine principal.

---

## 🧪 **ÉTAPE 7 : TESTER**

### **A) Vérifier la propagation DNS** :

**Outil 1 : WhatsMyDNS**
```
https://www.whatsmydns.net/#A/compresseursba.com
```
Vérifiez que les IP Firebase (151.101.x.195) apparaissent partout dans le monde.

**Outil 2 : DNS Checker**
```
https://dnschecker.org/#A/compresseursba.com
```

**Outil 3 : Commande Terminal** :
```bash
nslookup compresseursba.com
```
Devrait retourner les IP Firebase.

---

### **B) Tester le site** :

1. **Ouvrez un navigateur en mode incognito**
2. **Allez sur** : `https://compresseursba.com`
3. **Vérifiez** :
   - ✅ Site s'affiche correctement
   - ✅ Cadenas vert HTTPS dans la barre d'adresse
   - ✅ Certificat SSL valide (cliquez sur le cadenas)
   - ✅ Formulaire de contact fonctionne

4. **Testez aussi** :
   - `http://compresseursba.com` → devrait rediriger vers HTTPS
   - `www.compresseursba.com` → devrait fonctionner ou rediriger

---

## 📊 **RÉSUMÉ DES ENREGISTREMENTS DNS**

### **Configuration finale** :

| Type | Nom | Valeur | Fonction |
|------|-----|--------|----------|
| **TXT** | @ | google-site-verification=... | Vérification propriété |
| **A** | @ | 151.101.1.195 | Pointage Firebase #1 |
| **A** | @ | 151.101.65.195 | Pointage Firebase #2 |
| **CNAME** | www | crm2-5a4ac.web.app | Sous-domaine www |

**⚠️ IMPORTANT** : Les IP peuvent varier. Utilisez TOUJOURS celles fournies par Firebase dans votre console.

---

## ⏱️ **DÉLAIS DE PROPAGATION**

| Étape | Délai typique | Délai max |
|-------|---------------|-----------|
| **Enregistrement TXT** | 5-10 min | 1 heure |
| **Enregistrements A** | 10-30 min | 24 heures |
| **Certificat SSL** | 10-30 min | 24 heures |
| **Propagation mondiale** | 1-2 heures | 48 heures |

**💡 CONSEIL** : Si ça ne fonctionne pas après 2 heures, vérifiez vos enregistrements DNS. S'ils sont corrects, attendez encore 24h.

---

## 🔧 **TROUBLESHOOTING**

### **Problème 1 : "Domaine non vérifié"** ❌

**Cause** : L'enregistrement TXT n'est pas détecté.

**Solutions** :
1. Vérifiez que l'enregistrement TXT est bien créé chez votre registraire
2. Vérifiez la valeur (copier-coller exactement depuis Firebase)
3. Attendez 10-30 minutes supplémentaires
4. Testez avec : `nslookup -type=TXT compresseursba.com`

---

### **Problème 2 : "Erreur de connexion"** ❌

**Cause** : Les enregistrements A ne pointent pas vers Firebase.

**Solutions** :
1. Vérifiez que les 2 enregistrements A sont créés
2. Vérifiez les IP (151.101.x.195)
3. Supprimez les anciens enregistrements A s'il y en a
4. Attendez 1-2 heures pour la propagation
5. Testez avec : `nslookup compresseursba.com`

---

### **Problème 3 : "Certificat SSL en attente"** ⏳

**Cause** : Firebase génère le certificat, ça prend du temps.

**Solutions** :
1. Attendez 30-60 minutes
2. Le site peut être accessible en HTTP en attendant
3. Ne paniquez pas, c'est normal

---

### **Problème 4 : "ERR_SSL_VERSION_OR_CIPHER_MISMATCH"** ❌

**Cause** : Certificat SSL pas encore généré ou invalide.

**Solutions** :
1. Attendez 1-2 heures supplémentaires
2. Videz le cache du navigateur (CTRL + SHIFT + DEL)
3. Testez en mode incognito
4. Si ça persiste après 24h, contactez le support Firebase

---

### **Problème 5 : "Propagation lente"** 🐌

**Cause** : Certains serveurs DNS sont plus lents.

**Solutions** :
1. Utilisez Google DNS (8.8.8.8) temporairement
2. Videz le cache DNS local :
   ```bash
   ipconfig /flushdns  # Windows
   ```
3. Testez depuis un autre réseau (mobile 4G/5G)
4. Attendez 24-48h pour une propagation mondiale complète

---

## 💰 **COÛTS**

| Service | Coût | Fréquence |
|---------|------|-----------|
| **Domaine .com** | 15-25 CAD | /an |
| **Firebase Hosting** | GRATUIT | - |
| **Certificat SSL** | GRATUIT | - |
| **Bande passante** | GRATUIT* | - |

*Gratuit jusqu'à 10 GB/mois, puis ~0,15 USD/GB (largement suffisant pour un site PME).

---

## 📧 **MISE À JOUR DES EMAILS**

### **Après avoir configuré le domaine** :

Si vous voulez aussi avoir des emails `@compresseursba.com` :

#### **Option 1 : Google Workspace (Recommandé pour pro)**
- Prix : ~7-10 CAD/mois/utilisateur
- Vous aurez : `info@compresseursba.com`, `contact@compresseursba.com`
- Lien : https://workspace.google.com

#### **Option 2 : Zoho Mail (Gratuit pour 1 utilisateur)**
- Prix : GRATUIT (1 user, 5 GB) ou 1,50 USD/mois
- Lien : https://www.zoho.com/mail/

#### **Option 3 : Redirection email**
- Configurez une redirection chez votre registraire
- Ex : `info@compresseursba.com` → `compresseursba@gmail.com`
- Gratuit, mais moins professionnel pour l'envoi

---

## 🎯 **CHECKLIST COMPLÈTE**

### **Avant de commencer** :
- [ ] Vérifier que `compresseursba.com` est disponible
- [ ] Budget prévu (15-25 CAD/an)
- [ ] Choisir un registraire

### **Achat du domaine** :
- [ ] Acheter `compresseursba.com`
- [ ] Activer le domaine
- [ ] Accéder au panneau DNS

### **Configuration Firebase** :
- [ ] Aller sur Firebase Console → Hosting
- [ ] Cliquer sur "Add custom domain"
- [ ] Entrer `compresseursba.com`
- [ ] Noter les enregistrements DNS fournis

### **Configuration DNS** :
- [ ] Ajouter l'enregistrement TXT (vérification)
- [ ] Ajouter les 2 enregistrements A (pointage Firebase)
- [ ] Ajouter l'enregistrement CNAME pour www
- [ ] Sauvegarder les modifications

### **Vérification** :
- [ ] Attendre 5-60 minutes
- [ ] Vérifier l'état dans Firebase Console
- [ ] Tester avec https://www.whatsmydns.net
- [ ] Attendre le certificat SSL (10-30 min supplémentaires)

### **Tests finaux** :
- [ ] `https://compresseursba.com` fonctionne
- [ ] `https://www.compresseursba.com` fonctionne
- [ ] Certificat SSL valide (cadenas vert)
- [ ] Formulaire de contact fonctionne
- [ ] Redirection HTTP → HTTPS automatique

---

## 📞 **SUPPORT**

### **Si vous avez besoin d'aide** :

#### **Support Firebase** :
- Documentation : https://firebase.google.com/docs/hosting/custom-domain
- Forum : https://stackoverflow.com/questions/tagged/firebase-hosting

#### **Support Registraire** :
- **Namecheap** : https://www.namecheap.com/support/
- **GoDaddy** : https://www.godaddy.com/help
- **Google Domains** : https://support.google.com/domains/
- **OVH** : https://help.ovhcloud.com/

---

## 🎉 **APRÈS LA CONFIGURATION**

### **Votre site sera accessible sur** :
- ✅ `https://compresseursba.com`
- ✅ `https://www.compresseursba.com`
- ✅ `https://crm2-5a4ac.web.app` (ancien domaine reste actif)

### **Avantages** :
- ✅ Plus professionnel
- ✅ Plus facile à retenir
- ✅ Meilleur pour le SEO
- ✅ Meilleur pour la marque

### **Prochaines étapes** :
- 📧 Configurer les emails `@compresseursba.com`
- 📊 Mettre à jour Google Analytics / Search Console
- 🔗 Mettre à jour vos cartes de visite / documents
- 📱 Partager le nouveau domaine

---

## 📝 **NOTES IMPORTANTES**

1. **L'ancien domaine Firebase restera actif** → Pas de perte de trafic
2. **Le certificat SSL est automatique** → Pas besoin de l'acheter
3. **La propagation peut prendre 24-48h** → Soyez patient
4. **Testez depuis plusieurs appareils** → Mobile, desktop, différents réseaux
5. **Conservez les enregistrements DNS** → Ne les supprimez jamais

---

**🎉 Une fois configuré, votre site professionnel sera accessible sur `https://compresseursba.com` !**

**Durée totale estimée** : 15-30 minutes de configuration + 1-24h d'attente pour la propagation.

---

**Date de création du guide** : ${new Date().toLocaleDateString('fr-CA')}
**Projet** : Compresseurs BA
**Site actuel** : https://crm2-5a4ac.web.app
**Site futur** : https://compresseursba.com

