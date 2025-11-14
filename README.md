# Portfolio 3D - Fabrice KOUADJEU

Portfolio interactif avec avatar 3D créé avec React et Three.js.



## �🚀 Fonctionnalités

- **Avatar 3D interactif** avec animations de marche
- **Page d'introduction** avec animation fluide
- **Navigation moderne** avec transitions
- **Sections complètes** : Accueil, Projets, Contact
- **Design responsive** et optimisé

## 🛠️ Technologies utilisées

- **React 18** - Framework JavaScript
- **Three.js** - Rendu 3D
- **@react-three/fiber** - Integration React/Three.js
- **@react-three/drei** - Utilitaires Three.js
- **CSS3** - Animations et styles modernes

## 📦 Installation

```bash
# Cloner le repository
git clone https://github.com/fabrice2000.github.io
cd portfolio-3d

# Installer les dépendances
npm install

# Configurer les variables d'environnement
cp .env.example .env
# Éditer .env avec vos clés EmailJS

# Vérifier la sécurité (recommandé)
./security-check.sh

# Lancer en mode développement
npm start

# Build pour la production
npm run build
```

## ⚙️ Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
REACT_APP_EMAILJS_SERVICE_ID=votre_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=votre_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=votre_public_key
```

> ⚠️ **Important** : Ne JAMAIS commiter le fichier `.env` dans git !

### EmailJS Configuration

1. Créer un compte sur [EmailJS](https://www.emailjs.com/)
2. Créer un nouveau service email
3. Créer un template de contact
4. Copier vos clés dans `.env`

📖 [Guide complet EmailJS](TEMPLATE_EMAILJS_GUIDE.md)

## 🌐 Déploiement

Le site est déployé automatiquement sur GitHub Pages :
**https://Fabrice2000.github.io**

### Déployer manuellement

```bash
# Vérifier la sécurité avant le déploiement
./security-check.sh

# Build et déployer
npm run deploy
```

## 🛡️ Sécurité et Maintenance

### Vérification de sécurité

```bash
# Script de vérification automatique
./security-check.sh

# Audit npm
npm audit
npm audit fix
```

### Documentation de sécurité

- 📊 [Rapport de sécurité complet](SECURITY_REPORT.md) - Analyse détaillée avec visuels
- 📋 [Résumé exécutif](SECURITY_SUMMARY.md) - Vue d'ensemble rapide
- ⚡ [Guide rapide](SECURITY_QUICK_START.md) - Démarrage rapide
- 📖 [Guide détaillé](SECURITY.md) - Documentation complète
- 📄 [Lisez-moi](LISEZ-MOI-SECURITE.txt) - Résumé texte simple

### Maintenance régulière

- **Mensuelle** : Exécuter `./security-check.sh`
- **Trimestrielle** : Mettre à jour les dépendances
- **Semestrielle** : Régénérer les clés API

## 👨‍💻 Développeur

**Fabrice KOUADJEU NGATCHOU**

- Développeur Full-Stack
- Spécialisé en React, Three.js, et IA
- 📍 Paris, France

## 📄 Licence

© 2025 Fabrice KOUADJEU NGATCHOU - Tous droits réservés
