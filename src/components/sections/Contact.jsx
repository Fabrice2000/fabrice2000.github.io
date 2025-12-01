import React, { useState, useCallback, useMemo } from 'react';
import emailjs from '@emailjs/browser';
import '../../styles/contact.css';

function Contact({ onNavigate }) {
  // Config EmailJS - j'ai mis mes clés dans le .env
  const EMAILJS_CONFIG = useMemo(() => {
    const config = {
      serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID,
      templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
      publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY
    };

    if (!config.serviceId || !config.templateId || !config.publicKey) {
      console.error('Oups, il manque la config EmailJS. Vérifiez le fichier .env');
    }

    return config;
  }, []);

  // Les states pour gérer le formulaire
  const [formData, setFormData] = useState({
    from_name: '',
    from_email: '',
    phone: '',
    company: '',
    project_type: '',
    budget: '',
    timeline: '',
    website: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });

  const [validationErrors, setValidationErrors] = useState({});

  // Les options pour les select du formulaire
  const projectTypes = [
    { value: '', label: 'Sélectionnez un type' },
    { value: 'Site Web / Application', label: 'Site Web / Application' },
    { value: 'Application Mobile', label: 'Application Mobile' },
    { value: 'E-commerce', label: 'E-commerce' },
    { value: 'Portfolio / Blog', label: 'Portfolio / Blog' },
    { value: 'API / Backend', label: 'API / Backend' },
    { value: 'Consultation / Audit', label: 'Consultation / Audit' },
    { value: 'Maintenance / Support', label: 'Maintenance / Support' },
    { value: 'Formation / Accompagnement', label: 'Formation / Accompagnement' },
    { value: 'Autre', label: 'Autre' }
  ];

  const budgetRanges = [
    { value: '', label: 'Sélectionnez une fourchette' },
    { value: 'Moins de 1 000€', label: 'Moins de 1 000€' },
    { value: '1 000€ - 3 000€', label: '1 000€ - 3 000€' },
    { value: '3 000€ - 5 000€', label: '3 000€ - 5 000€' },
    { value: '5 000€ - 10 000€', label: '5 000€ - 10 000€' },
    { value: '10 000€ - 20 000€', label: '10 000€ - 20 000€' },
    { value: 'Plus de 20 000€', label: 'Plus de 20 000€' },
    { value: 'À discuter', label: 'À discuter' }
  ];

  const timelineOptions = [
    { value: '', label: 'Sélectionnez un délai' },
    { value: 'Urgent (< 1 mois)', label: 'Urgent (< 1 mois)' },
    { value: '1-3 mois', label: '1-3 mois' },
    { value: '3-6 mois', label: '3-6 mois' },
    { value: 'Plus de 6 mois', label: 'Plus de 6 mois' },
    { value: 'Flexible', label: 'Flexible' }
  ];

  // Mes fonctions de validation
  const validateEmail = useCallback((email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }, []);

  const validatePhone = useCallback((phone) => {
    if (!phone) return true; // Le tel est optionnel
    // eslint-disable-next-line no-useless-escape
    const phoneRegex = /^[\d\s\-\+\(\)\.]{8,20}$/;
    return phoneRegex.test(phone);
  }, []);

  const validateForm = useCallback(() => {
    const errors = {};

    // Je vérifie le nom
    if (!formData.from_name?.trim()) {
      errors.from_name = 'Le nom est requis';
    } else if (formData.from_name.trim().length < 2) {
      errors.from_name = 'Le nom doit contenir au moins 2 caractères';
    }

    // Je vérifie l'email
    if (!formData.from_email?.trim()) {
      errors.from_email = 'L\'email est requis';
    } else if (!validateEmail(formData.from_email)) {
      errors.from_email = 'Format d\'email invalide';
    }

    // Validation téléphone
    if (formData.phone && !validatePhone(formData.phone)) {
      errors.phone = 'Format de téléphone invalide';
    }

    // Validation message
    if (!formData.message?.trim()) {
      errors.message = 'Le message est requis';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Le message doit contenir au moins 10 caractères';
    } else if (formData.message.trim().length > 1000) {
      errors.message = 'Le message ne peut pas dépasser 1000 caractères';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  }, [formData, validateEmail, validatePhone]);

  // Handle input changes
  const handleInputChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Nettoyer l'erreur du champ modifié
    if (validationErrors[name]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  }, [validationErrors]);

  // Send email via EmailJS
  const sendEmailViaEmailJS = useCallback(async (data) => {
    const templateParams = {
      from_name: data.from_name,
      from_email: data.from_email,
      from_phone: data.phone || 'Non renseigné',
      from_company: data.company || 'Particulier',
      from_website: data.website || 'Non renseigné',
      project_type: data.project_type || 'Non spécifié',
      project_budget: data.budget || 'Non spécifié',
      project_timeline: data.timeline || 'Flexible',
      project_message: data.message,
      submission_date: new Date().toLocaleDateString('fr-FR', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }),
      reply_to: data.from_email
    };

    console.log('Sending via EmailJS...', templateParams);
    const result = await emailjs.send(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      templateParams,
      EMAILJS_CONFIG.publicKey
    );
    console.log('Email sent successfully', result);
    return result;
  }, [EMAILJS_CONFIG]);

  const sendViaMailto = useCallback((data) => {
    const subject = `Contact Portfolio - ${data.from_name}`;
    const body = `Nouveau message depuis votre portfolio !

CONTACT
Nom: ${data.from_name}
Email: ${data.from_email}
Téléphone: ${data.phone || 'Non renseigné'}
Entreprise: ${data.company || 'Particulier'}
Site web: ${data.website || 'Non renseigné'}

PROJET
Type: ${data.project_type || 'Non spécifié'}
Budget: ${data.budget || 'Non spécifié'}
Délai: ${data.timeline || 'Flexible'}

 MESSAGE
${data.message}

 Date: ${new Date().toLocaleDateString('fr-FR')}`;

    const mailtoLink = `mailto:kouadjeungatchou@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: false,
        error: 'Veuillez corriger les erreurs dans le formulaire.'
      });
      return;
    }

    setSubmitStatus({ isSubmitting: true, isSubmitted: false, error: null });

    try {
      await sendEmailViaEmailJS(formData);
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
      
      // Reset du formulaire après succès
      setFormData({
        from_name: '',
        from_email: '',
        phone: '',
        company: '',
        project_type: '',
        budget: '',
        timeline: '',
        website: '',
        message: ''
      });
      
    } catch (error) {
      console.warn('EmailJS failed, using mailto fallback', error);
      sendViaMailto(formData);
      setSubmitStatus({
        isSubmitting: false,
        isSubmitted: true,
        error: null
      });
    }
  }, [formData, validateForm, sendEmailViaEmailJS, sendViaMailto]);

  const resetForm = useCallback(() => {
    setFormData({
      from_name: '',
      from_email: '',
      phone: '',
      company: '',
      project_type: '',
      budget: '',
      timeline: '',
      website: '',
      message: ''
    });
    setValidationErrors({});
    setSubmitStatus({ isSubmitting: false, isSubmitted: false, error: null });
  }, []);

  // Render contact info
  const renderContactInfo = () => (
    <div className="contact-info">
      <div className="contact-card">
        <div className="contact-icon"></div>
        <div className="contact-details">
          <h4>Email</h4>
          <p>
            <a 
              href="mailto:kouadjeu_fabrice@yahoo.com?subject=Contact%20depuis%20votre%20portfolio"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              kouadjeu_fabrice@yahoo.com
            </a>
          </p>
          <span className="contact-note">Réponse sous 24h</span>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-details">
          <h4>Téléphone</h4>
          <p>07 58 72 58 45</p>
          <span className="contact-note">Disponible 9h-18h</span>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-details">
          <h4>Localisation</h4>
          <p>Paris, France</p>
          <span className="contact-note">Mobile en fonction des missions</span>
        </div>
      </div>
      
      <div className="contact-card">
        <div className="contact-details">
          <h4>Langues</h4>
          <p>Français • English</p>
          <span className="contact-note">Communication fluide</span>
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-details">
          <h4>LinkedIn</h4>
          <p>
            <a 
              href="https://www.linkedin.com/in/fabrice-kouadjeu-ngatchou-9a7477299" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Voir mon profil professionnel
            </a>
          </p>
          <span className="contact-note">Réseau et expériences</span>
        </div>
      </div>

      <div className="contact-card">
        <div className="contact-details">
          <h4>GitHub</h4>
          <p>
            <a 
              href="https://github.com/Fabrice2000" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{color: 'inherit', textDecoration: 'none'}}
            >
              Découvrir mes projets
            </a>
          </p>
          <span className="contact-note">Code source et contributions</span>
        </div>
      </div>
      
      <div className="why-choose-me">
        <h4>Pourquoi travailler avec moi ?</h4>
        <ul className="benefits-list">
          <li> Expertise technique reconnue</li>
          <li> Communication transparente</li>
          <li> Respect des délais</li>
          <li> Code de qualité professionnelle</li>
          <li> Support post-livraison</li>
          <li> Prix compétitifs</li>
        </ul>
      </div>
    </div>
  );

  const renderSuccessMessage = () => (
    <div className="success-message">
      <h4> Message envoyé avec succès !</h4>
      <p>Merci pour votre message ! Je vous répondrai dans les plus brefs délais.</p>
      <p> Une copie de confirmation sera envoyée à votre adresse email.</p>
      <button onClick={resetForm} className="btn-reset">
         Envoyer un autre message
      </button>
    </div>
  );

  const renderFormField = (name, label, type = 'text', options = null, required = false) => (
    <div className="form-group">
      <label htmlFor={name}>
        {label} {required && '*'}
      </label>
      
      {type === 'select' ? (
        <select
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          required={required}
        >
          {options?.map((option, index) => (
            <option key={index} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : type === 'textarea' ? (
        <>
          <textarea
            id={name}
            name={name}
            value={formData[name]}
            onChange={handleInputChange}
            placeholder={name === 'message' ? 'Décrivez-moi votre projet, vos besoins, vos objectifs...' : ''}
            required={required}
            rows="6"
          />
          {name === 'message' && (
            <small className="char-count">
              {formData.message.length}/1000 caractères
            </small>
          )}
        </>
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={formData[name]}
          onChange={handleInputChange}
          placeholder={name === 'from_email' ? 'votre.email@exemple.com' : 
                      name === 'phone' ? '06 12 34 56 78' :
                      name === 'website' ? 'https://www.example.com' : ''}
          required={required}
        />
      )}
      
      {validationErrors[name] && (
        <span className="error-text">{validationErrors[name]}</span>
      )}
    </div>
  );

  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2> Contactez-moi</h2>
          <p>Une idée de projet ? J'aimerais beaucoup en discuter avec vous !</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-form-container">
            <h3> Formulaire de Contact</h3>
            
            {submitStatus.isSubmitted ? renderSuccessMessage() : (
              <form onSubmit={handleSubmit} className="contact-form">
                {submitStatus.error && (
                  <div className="error-message">
                    {submitStatus.error}
                  </div>
                )}
                
                {/* Ligne 1: Nom et Email */}
                <div className="form-row">
                  {renderFormField('from_name', ' Nom complet', 'text', null, true)}
                  {renderFormField('from_email', ' Email', 'email', null, true)}
                </div>
                
                {/* Ligne 2: Téléphone et Entreprise */}
                <div className="form-row">
                  {renderFormField('phone', ' Téléphone', 'tel')}
                  {renderFormField('company', ' Entreprise / Organisation')}
                </div>
                
                {/* Ligne 3: Type de projet et Budget */}
                <div className="form-row">
                  {renderFormField('project_type', ' Type de projet', 'select', projectTypes)}
                  {renderFormField('budget', ' Budget estimé', 'select', budgetRanges)}
                </div>
                
                {/* Ligne 4: Délai et Site web */}
                <div className="form-row">
                  {renderFormField('timeline', ' Délai souhaité', 'select', timelineOptions)}
                  {renderFormField('website', ' Site web actuel', 'url')}
                </div>
                
                {/* Message */}
                {renderFormField('message', ' Votre message', 'textarea', null, true)}
                
                <button 
                  type="submit" 
                  className="btn-submit"
                  disabled={submitStatus.isSubmitting}
                >
                  {submitStatus.isSubmitting ? (
                    <> Envoi en cours...</>
                  ) : (
                    <> Envoyer le message</>
                  )}
                </button>
                
                <p className="form-note">
                   Email envoyé directement vers <strong>kouadjeungatchou@gmail.com</strong><br/>
                   Vos données sont sécurisées et ne sont pas stockées<br/>
                   Les champs marqués d'un <strong>*</strong> sont obligatoires
                </p>
              </form>
            )}
          </div>
          
          {renderContactInfo()}
        </div>
      </div>
    </section>
  );
}

export default Contact;