import React from 'react';
import './Projets.css';

function Projets({ onNavigate }) {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2> Mes Réalisations</h2>
          <p>Quelques projets dont je suis particulièrement fier</p>
        </div>
        
        <div className="projects-grid">
          {/* Mon projet le plus abouti */}
          <div className="project-card featured">
            <div className="project-badge">⭐ Projet Phare</div>
            <div className="project-content">
              <h3>🤖 Chatbot Intelligent Facebook</h3>
              <p>
                J'ai développé ce chatbot pour automatiser les réponses sur Facebook. Il analyse 
                le contenu des groupes et pages en temps réel grâce à l'API Graph. Le plus 
                difficile a été d'intégrer le NLP pour qu'il comprenne le contexte.
              </p>
              <div className="project-features">
                <span className="feature"> Intelligence contextuelle</span>
                <span className="feature">Analyse de données en temps réel</span>
                <span className="feature"> Intégration API complexe</span>
                <span className="feature"> Interface conversationnelle</span>
              </div>
              <div className="project-tech">
                <span className="tech-tag">Facebook Graph API</span>
                <span className="tech-tag">NLP</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">Webhook</span>
              </div>
            </div>
          </div>

          {/* Autres Projets */}
          <div className="project-card">
            <div className="project-content">
              <h3>Portfolio 3D Interactif</h3>
              <p>
                Portfolio moderne avec avatar 3D animé, effets visuels avancés 
                et navigation fluide. Utilisation de Three.js pour les rendus 3D.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Three.js</span>
                <span className="tech-tag">Blender</span>
                <span className="tech-tag">CSS3</span>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <h3>Application Web Responsive</h3>
              <p>
                Interface utilisateur moderne avec design adaptatif, 
                optimisée pour tous les appareils et navigateurs.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">CSS Grid</span>
                <span className="tech-tag">PWA</span>
                <span className="tech-tag">Performance</span>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <h3>🔗 Intégration API Complexe</h3>
              <p>
                Système d'intégration multi-API avec gestion d'erreurs avancée 
                et synchronisation de données en temps réel.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">WebSocket</span>
              </div>
            </div>
          </div>
        </div>

        <div className="projects-cta">
          <p>Intéressé par mon travail ?</p>
          <button 
            className="btn-primary"
            onClick={() => onNavigate('contact')}
          >
            Discutons de votre projet
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projets;