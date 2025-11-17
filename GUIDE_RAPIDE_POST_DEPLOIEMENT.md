# 📱 GUIDE RAPIDE POST-DÉPLOIEMENT

**Votre site est EN LIGNE !** 🎉

---

## 🌐 VOTRE SITE WEB

```
https://crm2-5a4ac.web.app
```

**👉 Ouvrez ce lien maintenant dans votre navigateur !**

---

## ✅ ACTIONS IMMÉDIATES (5 minutes)

### 1. Tester le site
```
□ Ouvrir https://crm2-5a4ac.web.app
□ Vérifier que tout s'affiche correctement
□ Tester sur mobile (téléphone)
□ Cliquer sur le numéro de téléphone
□ Cliquer sur l'email
```

### 2. Tester le formulaire de contact
```
□ Aller dans la section "Contact"
□ Remplir le formulaire avec vos infos
□ Cliquer "Envoyer"
□ Vérifier dans Firebase Console que le message est arrivé :
  → https://console.firebase.google.com/project/crm2-5a4ac/firestore
  → Aller dans "contacts"
  → Votre message doit apparaître
```

### 3. Partager avec votre équipe
```
□ Envoyer l'URL à vos collègues
□ Demander leur feedback
□ Noter les problèmes ou suggestions
```

---

## 🔧 MODIFICATIONS RAPIDES

### Changer un texte sur la page
1. Ouvrir `public/index.html`
2. Modifier le texte
3. Sauvegarder
4. Dans le terminal : `firebase deploy --only hosting`
5. Attendre 1-2 minutes → Changement en ligne !

### Changer les coordonnées
1. Ouvrir `lib/constants.js`
2. Modifier téléphone/adresse/email
3. Sauvegarder
4. Dans le terminal : `firebase deploy --only hosting`

### Ajouter/Changer une image
1. Placer l'image dans `public/images/`
2. Modifier le code HTML pour pointer vers la nouvelle image
3. Dans le terminal : `firebase deploy --only hosting`

---

## 📋 À FAIRE CETTE SEMAINE

### Priorité 1 : Contenu
- [ ] Confirmer l'email : `info@compresseursba.ca` est-il correct ?
- [ ] Confirmer les heures d'ouverture
- [ ] Vérifier tous les textes (pas de fautes)

### Priorité 2 : SEO & Marketing
- [ ] Créer/revendiquer Google My Business
- [ ] Ajouter le site à Google Search Console
- [ ] Mettre à jour réseaux sociaux avec le lien

### Priorité 3 : Fonctionnalités
- [ ] Ajouter quelques produits d'occasion dans Firestore
- [ ] Tester la réception des emails de contact
- [ ] Configurer Google Analytics (optionnel)

---

## 💡 ASTUCES

### Voir le site avant de déployer
```bash
firebase serve
```
Puis ouvrir http://localhost:5000

### Revenir à une version précédente
Dans Firebase Console > Hosting > Historique
Vous pouvez restaurer une version antérieure

### Voir qui visite votre site
Dans Firebase Console > Analytics
(si configuré)

---

## 🆘 PROBLÈMES COURANTS

### "Le site ne s'affiche pas"
→ Vider le cache : Ctrl+Shift+R
→ Tester dans navigation privée

### "Le formulaire ne marche pas"
→ Vérifier Firestore dans Firebase Console
→ Vérifier que les règles sont déployées

### "Je ne sais pas comment modifier X"
→ Chercher dans `public/index.html`
→ Utiliser Ctrl+F pour trouver le texte

---

## 📞 LIENS UTILES

- **Votre site** : https://crm2-5a4ac.web.app
- **Firebase Console** : https://console.firebase.google.com/project/crm2-5a4ac
- **Documentation** : Voir les fichiers `.md` dans le projet

---

## ✨ PROCHAINE ÉTAPE

**Configurer un domaine personnalisé** (ex: compresseursba.ca)

1. Dans Firebase Console > Hosting
2. Cliquer "Add custom domain"
3. Suivre les instructions pour les DNS
4. Attendre 24-48h pour propagation

---

**Félicitations ! Votre site est en ligne ! 🎉**

Pour toute question, consultez `DEPLOIEMENT_REUSSI.md` pour les détails complets.

