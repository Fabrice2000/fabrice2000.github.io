# 🔐 Guide de Configuration Sécurisée

## Configuration des Clés API

Ce projet utilise EmailJS pour le formulaire de contact. Pour des raisons de sécurité, les clés API ne sont **pas** incluses dans le repository.

### Étapes de Configuration :

1. **Créez un compte EmailJS** : https://www.emailjs.com/

2. **Obtenez vos clés** :
   - Service ID
   - Template ID
   - Public Key

3. **Créez un fichier `.env.local`** à la racine du projet :
   ```bash
   cp .env.example .env.local
   ```

4. **Remplissez vos clés dans `.env.local`** :
   ```env
   REACT_APP_EMAILJS_SERVICE_ID=votre_service_id
   REACT_APP_EMAILJS_TEMPLATE_ID=votre_template_id
   REACT_APP_EMAILJS_PUBLIC_KEY=votre_public_key
   ```

5. **Ne commitez JAMAIS le fichier `.env.local`** - il est déjà dans `.gitignore`

### Configuration du Template EmailJS

Créez un template avec ces champs :
- `{{from_name}}` - Nom de l'expéditeur
- `{{user_email}}` - Email de l'expéditeur
- `{{subject}}` - Sujet du message
- `{{message}}` - Contenu du message

### Déploiement

Pour déployer sur Netlify, Vercel ou GitHub Pages, ajoutez vos variables d'environnement dans les paramètres du service :

**Netlify/Vercel** :
- Allez dans Settings → Environment Variables
- Ajoutez vos trois variables

**GitHub Pages** :
- Utilisez GitHub Secrets pour les Actions
- Ou configurez directement dans le build

## Sécurité

✅ Le fichier `.gitignore` empêche la publication des clés
✅ Utilisez `.env.local` pour le développement local
✅ Configurez les variables d'environnement sur la plateforme de déploiement

## Support

Si vous avez des questions, consultez la documentation :
- [EmailJS Docs](https://www.emailjs.com/docs/)
- [Create React App - Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
