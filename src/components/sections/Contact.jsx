import React from 'react';

function Contact({ onNavigate }) {
  return (
    <section className="contact-section">
      <div className="container">
        <div className="section-header">
          <h2>💬 Contactez-moi</h2>
          <p>Une idée de projet ? J'aimerais beaucoup en discuter avec vous !</p>
        </div>
        
        <div className="contact-content">
          <div className="contact-info">
            <div className="contact-card">
              <div className="contact-icon">📧</div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>kouadjeu_fabrice@yahoo.com</p>
                <span className="contact-note">Réponse sous 24h</span>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📱</div>
              <div className="contact-details">
                <h4>Téléphone</h4>
                <p>07 58 72 58 45</p>
                <span className="contact-note">Disponible 9h-18h</span>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">📍</div>
              <div className="contact-details">
                <h4>Localisation</h4>
                <p>Paris, France</p>
                <span className="contact-note">Remote friendly</span>
              </div>
            </div>
            
            <div className="contact-card">
              <div className="contact-icon">🌍</div>
              <div className="contact-details">
                <h4>Langues</h4>
                <p>🇫🇷 Français • 🇬🇧 English</p>
                <span className="contact-note">Communication fluide</span>
              </div>
            </div>
          </div>
          
          <div className="contact-form-section">
            <div className="form-container">
              <h3>Démarrons votre projet</h3>
              <form className="contact-form">
                <div className="form-group">
                  <label>Votre nom *</label>
                  <input type="text" placeholder="Comment vous appelez-vous ?" required />
                </div>
                
                <div className="form-group">
                  <label>Email *</label>
                  <input type="email" placeholder="votre@email.com" required />
                </div>
                
                <div className="form-group">
                  <label>Type de projet</label>
                  <select>
                    <option>Sélectionnez le type de projet</option>
                    <option>Site web / Application</option>
                    <option>Chatbot / IA</option>
                    <option>Intégration API</option>
                    <option>Portfolio 3D</option>
                    <option>Autre / Conseil</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Budget estimé</label>
                  <select>
                    <option>Sélectionnez votre budget</option>
                    <option>Moins de 1 000€</option>
                    <option>1 000€ - 3 000€</option>
                    <option>3 000€ - 5 000€</option>
                    <option>5 000€ - 10 000€</option>
                    <option>Plus de 10 000€</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label>Description du projet *</label>
                  <textarea 
                    placeholder="Décrivez votre projet, vos besoins, vos objectifs..."
                    rows="5"
                    required
                  ></textarea>
                </div>
                
                <button type="submit" className="btn-primary">
                  🚀 Envoyer ma demande
                </button>
              </form>
            </div>
            
            <div className="why-choose-me">
              <h4>Pourquoi travailler avec moi ?</h4>
              <ul className="benefits-list">
                <li>✅ Expertise technique reconnue</li>
                <li>✅ Communication transparente</li>
                <li>✅ Respect des délais</li>
                <li>✅ Code de qualité professionnelle</li>
                <li>✅ Support post-livraison</li>
                <li>✅ Prix compétitifs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;