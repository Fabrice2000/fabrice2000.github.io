# 📧 GUIDE : Créer un Template EmailJS Personnalisé

## 🎯 Objectif

Créer un template EmailJS professionnel pour recevoir les messages de contact de votre portfolio.

## 📋 Étapes à suivre

### 1. **Accéder à votre Dashboard EmailJS**

- Allez sur https://emailjs.com/
- Connectez-vous à votre compte

### 2. **Créer un nouveau Template**

- Cliquez sur **"Email Templates"** dans le menu
- Cliquez sur **"Create New Template"**
- Choisissez **"Blank Template"**

### 3. **Configuration du Template**

#### **Template Name** :

```
Portfolio Contact - Fabrice Kouadjeu
```

#### **Template ID** (important !) :

```
template_portfolio_contact
```

#### **Subject** :

```
🚀 Nouveau message depuis votre portfolio - {{from_name}}
```

#### **Content (HTML)** :

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <style>
      body {
        font-family: Arial, sans-serif;
        color: #333;
        line-height: 1.6;
      }
      .header {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
        background: #f9f9f9;
      }
      .info-section {
        background: white;
        padding: 15px;
        margin: 10px 0;
        border-radius: 8px;
        border-left: 4px solid #667eea;
      }
      .message-section {
        background: white;
        padding: 20px;
        margin: 15px 0;
        border-radius: 8px;
      }
      .footer {
        background: #333;
        color: white;
        padding: 15px;
        text-align: center;
        font-size: 12px;
      }
      .highlight {
        color: #667eea;
        font-weight: bold;
      }
    </style>
  </head>
  <body>
    <div class="header">
      <h1>📬 Nouveau Message Portfolio</h1>
      <p>Un visiteur a utilisé votre formulaire de contact</p>
    </div>

    <div class="content">
      <div class="info-section">
        <h3>👤 Informations du Contact</h3>
        <p>
          <strong>Nom :</strong> <span class="highlight">{{from_name}}</span>
        </p>
        <p>
          <strong>Email :</strong> <span class="highlight">{{from_email}}</span>
        </p>
        <p><strong>Date :</strong> {{date}}</p>
      </div>

      <div class="info-section">
        <h3>📋 Détails du Projet</h3>
        <p><strong>Type de projet :</strong> {{project_type}}</p>
        <p><strong>Budget estimé :</strong> {{budget}}</p>
      </div>

      <div class="message-section">
        <h3>💬 Message</h3>
        <div
          style="background: #f8f9fa; padding: 15px; border-radius: 5px; font-style: italic;"
        >
          {{message}}
        </div>
      </div>

      <div class="info-section">
        <h3>🔗 Actions Rapides</h3>
        <p>
          <a
            href="mailto:{{from_email}}?subject=Re: Votre demande de contact"
            style="background: #667eea; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;"
          >
            📧 Répondre directement
          </a>
        </p>
      </div>
    </div>

    <div class="footer">
      <p>🚀 Message reçu via le portfolio de Fabrice Kouadjeu</p>
      <p>📧 Envoyé depuis https://Fabrice2000.github.io/portfolio-3d</p>
    </div>
  </body>
</html>
```

### 4. **Variables utilisées dans le template** :

- `{{from_name}}` - Nom du visiteur
- `{{from_email}}` - Email du visiteur
- `{{project_type}}` - Type de projet
- `{{budget}}` - Budget estimé
- `{{message}}` - Message principal
- `{{date}}` - Date d'envoi automatique

### 5. **Settings Template** :

- **From Email** : Laissez vide (sera rempli automatiquement)
- **To Email** : `kouadjeungatchou@gmail.com`
- **Reply To** : `{{from_email}}`

### 6. **Sauvegarde**

- Cliquez sur **"Save"**
- Notez bien le **Template ID** : `template_portfolio_contact`

## ✅ Validation

Une fois créé, votre template aura l'ID : `template_portfolio_contact`

Cette ID est déjà configurée dans votre `.env.local` !

## 🚀 Prochaine étape

Une fois le template créé, revenez me dire "template créé" et je configurerai le formulaire pour l'utiliser.
