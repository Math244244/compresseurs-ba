/**
 * Firebase Cloud Functions pour Compresseurs BA
 * Envoie un email de notification quand un nouveau message de contact est reçu
 */

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');

// Initialiser Firebase Admin
admin.initializeApp();

// ========================================
// CONFIGURATION EMAIL
// ========================================

/**
 * Configuration du transporteur Nodemailer
 * 
 * IMPORTANT : Pour utiliser Gmail, vous devez :
 * 1. Activer "l'accès aux applications moins sécurisées" OU
 * 2. Créer un "mot de passe d'application" (recommandé)
 * 
 * Pour créer un mot de passe d'application :
 * - Allez sur https://myaccount.google.com/apppasswords
 * - Sélectionnez "Autre (nom personnalisé)"
 * - Nommez-le "Compresseurs BA Notifications"
 * - Utilisez le mot de passe généré dans GMAIL_APP_PASSWORD ci-dessous
 */

// Configuration avec variables d'environnement (sécurisé)
// Exécutez ces commandes pour les définir :
// firebase functions:config:set gmail.email="compresseursba@gmail.com"
// firebase functions:config:set gmail.password="votre_mot_de_passe_application"

const gmailEmail = functions.config().gmail?.email || 'compresseursba@gmail.com';
const gmailPassword = functions.config().gmail?.password || 'VOTRE_MOT_DE_PASSE_ICI';

// Créer le transporteur Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword
  }
});

// ========================================
// FONCTION : NOTIFICATION EMAIL
// ========================================

/**
 * Fonction déclenchée quand un nouveau document est créé dans /contacts
 * Envoie un email de notification à compresseursba@gmail.com
 */
exports.sendContactNotification = functions.firestore
  .document('contacts/{contactId}')
  .onCreate(async (snap, context) => {
    try {
      // Récupérer les données du nouveau contact
      const contactData = snap.data();
      const contactId = context.params.contactId;

      console.log('📧 Nouveau message de contact reçu:', contactId);
      console.log('Données:', contactData);

      // Vérifier que les données essentielles existent
      if (!contactData.name || !contactData.email || !contactData.message) {
        console.error('❌ Données de contact incomplètes');
        return null;
      }

      // Formater la date
      const timestamp = contactData.timestamp 
        ? contactData.timestamp.toDate().toLocaleString('fr-CA', { 
            timeZone: 'America/New_York',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        : 'Date non disponible';

      // ========================================
      // EMAIL À ENVOYER À COMPRESSEURS BA
      // ========================================
      
      const mailOptions = {
        from: `"Site Web Compresseurs BA" <${gmailEmail}>`,
        to: gmailEmail, // Vous recevez l'email
        replyTo: contactData.email, // Le client
        subject: `🔔 Nouveau message de ${contactData.name} - Site Web`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
                background-color: #f5f5f5;
              }
              .container {
                background-color: white;
                border-radius: 10px;
                padding: 30px;
                box-shadow: 0 2px 10px rgba(0,0,0,0.1);
              }
              .header {
                background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
                color: white;
                padding: 20px;
                border-radius: 10px 10px 0 0;
                margin: -30px -30px 20px -30px;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
                color: #FF4500;
              }
              .header p {
                margin: 5px 0 0 0;
                font-size: 14px;
                opacity: 0.9;
              }
              .info-section {
                background-color: #f8f9fa;
                border-left: 4px solid #FF4500;
                padding: 15px;
                margin: 20px 0;
                border-radius: 5px;
              }
              .info-label {
                font-weight: bold;
                color: #FF4500;
                display: inline-block;
                min-width: 100px;
              }
              .message-box {
                background-color: #ffffff;
                border: 2px solid #e9ecef;
                border-radius: 8px;
                padding: 20px;
                margin: 20px 0;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .footer {
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px solid #e9ecef;
                font-size: 12px;
                color: #6c757d;
                text-align: center;
              }
              .btn {
                display: inline-block;
                padding: 12px 24px;
                background: linear-gradient(135deg, #FF4500 0%, #FF6347 100%);
                color: white;
                text-decoration: none;
                border-radius: 5px;
                margin-top: 15px;
                font-weight: bold;
              }
              .urgent {
                background-color: #fff3cd;
                border-left-color: #ffc107;
                padding: 10px 15px;
                margin: 15px 0;
                border-radius: 5px;
              }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>🔔 Nouveau Message</h1>
                <p>Formulaire de contact - Site Web Compresseurs BA</p>
              </div>

              <div class="info-section">
                <p><span class="info-label">👤 Nom :</span> ${contactData.name}</p>
                <p><span class="info-label">📧 Email :</span> <a href="mailto:${contactData.email}">${contactData.email}</a></p>
                ${contactData.phone ? `<p><span class="info-label">📞 Téléphone :</span> <a href="tel:${contactData.phone}">${contactData.phone}</a></p>` : ''}
                <p><span class="info-label">🕒 Date :</span> ${timestamp}</p>
                <p><span class="info-label">🆔 ID :</span> ${contactId}</p>
              </div>

              <h3 style="color: #FF4500; margin-bottom: 10px;">💬 Message du client :</h3>
              <div class="message-box">
                ${contactData.message}
              </div>

              <div class="urgent">
                <strong>⚡ Action recommandée :</strong> Répondez dans les 24 heures pour maintenir un excellent service client.
              </div>

              <center>
                <a href="mailto:${contactData.email}" class="btn">📧 Répondre au Client</a>
              </center>

              <div class="footer">
                <p><strong>Compresseurs BA</strong></p>
                <p>709 7e Rang S, East Broughton, QC G0N 1G0</p>
                <p>📞 418 281 9780 | 📧 compresseursba@gmail.com</p>
                <p style="margin-top: 15px; font-size: 11px; opacity: 0.7;">
                  Cet email a été généré automatiquement par votre site web.<br>
                  Pour consulter tous les messages, connectez-vous à la console Firebase.
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
        text: `
🔔 NOUVEAU MESSAGE - COMPRESSEURS BA

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

INFORMATIONS CLIENT

Nom : ${contactData.name}
Email : ${contactData.email}
${contactData.phone ? `Téléphone : ${contactData.phone}` : ''}
Date : ${timestamp}
ID : ${contactId}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

MESSAGE :

${contactData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

⚡ Action recommandée : Répondez dans les 24 heures.

Pour répondre, envoyez un email à : ${contactData.email}

---
Compresseurs BA
709 7e Rang S, East Broughton, QC G0N 1G0
📞 418 281 9780 | 📧 compresseursba@gmail.com
        `
      };

      // Envoyer l'email
      console.log('📤 Envoi de l\'email de notification...');
      const info = await transporter.sendMail(mailOptions);
      
      console.log('✅ Email envoyé avec succès !');
      console.log('Message ID:', info.messageId);

      // Optionnel : Mettre à jour le document pour indiquer que l'email a été envoyé
      await snap.ref.update({
        emailSent: true,
        emailSentAt: admin.firestore.FieldValue.serverTimestamp()
      });

      return { success: true, messageId: info.messageId };

    } catch (error) {
      console.error('❌ Erreur lors de l\'envoi de l\'email:', error);
      
      // Enregistrer l'erreur dans le document
      try {
        await snap.ref.update({
          emailSent: false,
          emailError: error.message
        });
      } catch (updateError) {
        console.error('❌ Erreur lors de la mise à jour du statut:', updateError);
      }

      // Ne pas lancer d'erreur pour éviter de bloquer d'autres fonctions
      return { success: false, error: error.message };
    }
  });

// ========================================
// FONCTION TEST (OPTIONNELLE)
// ========================================

/**
 * Fonction HTTP pour tester l'envoi d'email manuellement
 * URL : https://us-central1-compresseurs-ba.cloudfunctions.net/testEmail
 */
exports.testEmail = functions.https.onRequest(async (req, res) => {
  try {
    const testMailOptions = {
      from: `"Test Compresseurs BA" <${gmailEmail}>`,
      to: gmailEmail,
      subject: '🧪 Test d\'Email - Compresseurs BA',
      html: `
        <h1>✅ Test d'Email Réussi !</h1>
        <p>Si vous voyez cet email, la configuration fonctionne correctement.</p>
        <p><strong>Date :</strong> ${new Date().toLocaleString('fr-CA')}</p>
      `,
      text: 'Test d\'email - Compresseurs BA - Configuration OK'
    };

    const info = await transporter.sendMail(testMailOptions);
    
    res.status(200).send({
      success: true,
      message: 'Email de test envoyé avec succès !',
      messageId: info.messageId
    });
  } catch (error) {
    console.error('Erreur test email:', error);
    res.status(500).send({
      success: false,
      error: error.message
    });
  }
});

