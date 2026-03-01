# ✅ MISE À JOUR DES COORDONNÉES – COMPRESSEUR BA

**Date de mise à jour** : ${new Date().toLocaleDateString('fr-CA')}

---

## 📍 COORDONNÉES OFFICIELLES

### Adresse
```
709 7e Rang S
East Broughton, QC G0N 1G0
Canada
```

### Téléphone
```
(418) 281-9780
```

### Email
```
info@compresseursba.ca
```

---

## ✅ FICHIERS MIS À JOUR

### 1. **`lib/constants.js`** (NOUVEAU - Fichier central) ✅
Ce fichier contient maintenant toutes les coordonnées de l'entreprise dans un seul endroit.

**Coordonnées mises à jour** :
- ✅ Téléphone : `(418) 281-9780`
- ✅ Adresse : `709 7e Rang S, East Broughton, QC G0N 1G0`
- ✅ Email : `info@compresseursba.ca`
- ⚠️ Coordonnées GPS : Estimées (à vérifier)

**Ce qui reste à faire dans ce fichier** :
```javascript
// Ligne 23-27 : Heures d'ouverture
// ⚠️ TODO: Confirmer les heures réelles d'ouverture
hours: {
  weekdays: 'Lundi-Vendredi : 8h00 - 17h00',  // À confirmer
  saturday: 'Samedi : Fermé',                  // À confirmer
  sunday: 'Dimanche : Fermé',                  // À confirmer
  emergency: 'Urgences : Appelez-nous',
}

// Ligne 31-34 : Coordonnées GPS
// ⚠️ TODO: Obtenir les coordonnées GPS EXACTES
geo: {
  latitude: 46.2127,   // Estimation - À VÉRIFIER
  longitude: -71.1947, // Estimation - À VÉRIFIER
}
```

**Comment obtenir les coordonnées GPS exactes** :
1. Aller sur [Google Maps](https://maps.google.com)
2. Rechercher : `709 7e Rang S, East Broughton, QC G0N 1G0`
3. Clic droit sur le marker rouge → "Plus d'infos sur cet endroit"
4. Les coordonnées s'affichent en bas (format : 46.2127, -71.1947)
5. Copier ces coordonnées dans `lib/constants.js`

---

### 2. **`public/index.html`** (Fichier existant) ✅
Ce fichier HTML contenait déjà le bon numéro de téléphone, mais l'adresse était incomplète.

**Mises à jour effectuées** :
- ✅ Adresse complète ajoutée (ligne 291-293)
- ✅ Email corrigé de `.fr` à `.ca` (ligne 315-316)
- ✅ Téléphone déjà correct : `418 281 9780`

**Avant** :
```html
<p class="text-slate-600 leading-relaxed">
    Québec, Canada
</p>
```

**Après** :
```html
<p class="text-slate-600 leading-relaxed">
    709 7e Rang S<br>
    East Broughton, QC G0N 1G0<br>
    Canada
</p>
```

---

## 🔄 FICHIERS À CRÉER (FRAMEWORK NEXT.JS)

Les fichiers suivants doivent être créés et **utiliseront automatiquement** les constantes de `lib/constants.js` :

### Pages principales
- `app/contact/page.js` → Import `COMPANY_INFO` depuis `@/lib/constants`
- `app/a-propos/page.js` → Import `COMPANY_INFO`
- `app/zone-desservie/page.js` → Import `COMPANY_INFO`
- `app/merci/page.js` → Import `COMPANY_INFO`
- `app/not-found.js` → Import `COMPANY_INFO`
- `app/politique-confidentialite/page.js` → Import `COMPANY_INFO`

### Composants
- `components/layout/Header.jsx` → Import `COMPANY_INFO` (bouton téléphone)
- `components/layout/Footer.jsx` → Import `COMPANY_INFO` (toutes coordonnées)
- `components/forms/ContactForm.jsx` → Import `COMPANY_INFO` (bandeau urgence)
- `components/ui/CTAButton.jsx` → Import `COMPANY_INFO` (bouton téléphone)

**Avantage** : En utilisant `lib/constants.js`, vous n'aurez jamais à changer les coordonnées à plusieurs endroits. Un seul fichier à modifier !

---

## 📋 TODO : CE QUI RESTE À FAIRE

### 🔴 PRIORITÉ HAUTE

1. **Confirmer l'adresse email**
   - Vérifier que `info@compresseursba.ca` est le bon email
   - Si différent, modifier dans `lib/constants.js` ligne 12

2. **Obtenir les coordonnées GPS exactes**
   - Suivre les instructions ci-dessus (section Google Maps)
   - Modifier dans `lib/constants.js` lignes 31-34

3. **Confirmer les heures d'ouverture**
   - Modifier dans `lib/constants.js` lignes 23-27
   - Exemples de formats possibles :
     - `"Lundi-Vendredi : 7h30 - 16h30"`
     - `"Lundi-Jeudi : 8h-17h, Vendredi : 8h-16h"`
     - `"Du lundi au vendredi de 8h à 17h"`

### 🟠 PRIORITÉ MOYENNE

4. **Configurer Firebase**
   - Créer le fichier `.env.local` avec les clés Firebase
   - Ajouter les vraies clés de votre projet Firebase

5. **Ajouter les images**
   - Logo : `public/images/logo.png`
   - Images hero : `public/images/hero-*.jpg`

6. **Vérifier les coordonnées dans Firebase Console**
   - Si vous avez déjà des données dans Firestore
   - S'assurer qu'elles utilisent le même format de téléphone

---

## 🔍 VÉRIFICATION RAPIDE

### Téléphone - Formats corrects utilisés
- ✅ Format affiché : `(418) 281-9780`
- ✅ Format pour lien `tel:` : `4182819780` (sans espaces, tirets ou parenthèses)
- ✅ Format dans HTML : `418 281 9780` (avec espaces)

### Email
- ✅ `info@compresseursba.ca`

### Adresse
- ✅ Ligne 1 : `709 7e Rang S`
- ✅ Ligne 2 : `East Broughton, QC G0N 1G0`
- ✅ Ligne 3 : `Canada`

---

## 🧪 TESTS À EFFECTUER

Après avoir lancé le site en local (`npm run dev`) :

1. **Vérifier l'affichage des coordonnées**
   - [ ] Page Contact : adresse complète visible
   - [ ] Footer : adresse complète visible
   - [ ] Numéro de téléphone cliquable (ouvre l'app téléphone sur mobile)

2. **Tester les liens**
   - [ ] Cliquer sur le numéro de téléphone → Doit ouvrir `tel:4182819780`
   - [ ] Cliquer sur l'email → Doit ouvrir `mailto:info@compresseursba.ca`

3. **Vérifier Google Maps** (si intégré)
   - [ ] La carte est centrée sur East Broughton
   - [ ] Le marker est au bon endroit (709 7e Rang S)

---

## 📞 RÉSUMÉ DES COORDONNÉES

| Élément | Valeur | Statut |
|---------|--------|--------|
| **Adresse** | 709 7e Rang S, East Broughton, QC G0N 1G0 | ✅ Confirmé |
| **Téléphone** | (418) 281-9780 | ✅ Confirmé |
| **Email** | info@compresseursba.ca | ⚠️ À confirmer |
| **GPS Latitude** | 46.2127 | ⚠️ Estimation - À vérifier |
| **GPS Longitude** | -71.1947 | ⚠️ Estimation - À vérifier |
| **Heures** | Lun-Ven 8h-17h | ⚠️ À confirmer |

---

## 🚀 PROCHAINES ÉTAPES

1. ✅ **FAIT** : Coordonnées ajoutées dans `lib/constants.js`
2. ✅ **FAIT** : Adresse mise à jour dans `public/index.html`
3. ⚠️ **TODO** : Confirmer l'email
4. ⚠️ **TODO** : Obtenir coordonnées GPS exactes
5. ⚠️ **TODO** : Confirmer heures d'ouverture
6. ⏳ **ENSUITE** : Créer les composants Next.js (Header, Footer, etc.)
7. ⏳ **ENSUITE** : Intégrer Firebase
8. ⏳ **ENSUITE** : Tester le formulaire de contact
9. ⏳ **ENSUITE** : Déployer sur Firebase Hosting

---

**Besoin d'aide ?** 
- Pour modifier les coordonnées : Éditez `lib/constants.js`
- Pour les coordonnées GPS : Utilisez Google Maps
- Pour les heures : Pensez au format québécois (ex: "8h à 17h")

