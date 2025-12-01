import React from 'react';
import '../../styles/projets.css';

function Projets({ onNavigate }) {
  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2> Mes Réalisations</h2>
          <p>Quelques projets dont je suis particulièrement fier</p>
        </div>
        
        <div className="projects-grid">
          {/* Projet 1 - Chatbot Intelligent Facebook */}
          <div className="project-card featured">
            <div className="project-badge"> Projet Phare</div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80" alt="Code Backend API" />
            </div>
            <div className="project-content">
              <h3>Chatbot Intelligent Facebook</h3>
              <p>
                Développement d'un chatbot capable d'analyser automatiquement les contenus de 
                groupes et pages Facebook via l'API Graph. Connexion à la Facebook Graph API 
                pour récupérer posts & commentaires, création d'un moteur de recherche interne 
                basé sur mots-clés + scoring, implémentation d'un module NLP simple pour le 
                nettoyage, filtrage et extraction d'intentions. Déployé sur serveur Docker.
              </p>
              <div className="project-features">
                <span className="feature">Moteur de recherche intelligent</span>
                <span className="feature">Module NLP intégré</span>
                <span className="feature">Analyse de données en temps réel</span>
                <span className="feature">Déploiement Docker</span>
              </div>
              <div className="project-tech">
                <span className="tech-tag">Facebook Graph API</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">NLP</span>
                <span className="tech-tag">Docker</span>
              </div>
            </div>
          </div>

          {/* Projet 2 - Portfolio 3D Interactif */}
          <div className="project-card">
            <div className="project-badge" style={{background: '#10b981'}}> Ce Site</div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80" alt="3D Graphics Code" />
            </div>
            <div className="project-content">
              <h3>Portfolio 3D Interactif</h3>
              <p><strong>🌐 Vous êtes actuellement sur ce projet !</strong></p>
              <p>
                Portfolio personnel moderne avec avatar 3D animé en temps réel, 
                effets visuels avancés et navigation fluide. Avatar personnalisé 
                modélisé avec Blender, intégration de modèles 3D optimisés avec Three.js, 
                animations personnalisées et design responsive. Performances optimisées 
                pour tous les appareils.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Three.js</span>
                <span className="tech-tag">Blender</span>
                <span className="tech-tag">GLTF</span>
                <span className="tech-tag">CSS3</span>
              </div>
            </div>
          </div>

          {/* Projet 3 - Plateforme E-commerce */}
          <div className="project-card">
            <div className="project-badge" style={{background: '#f59e0b'}}> En Cours</div>
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80" alt="Code TypeScript" />
            </div>
            <div className="project-content">
              <h3>Plateforme E-commerce Moderne</h3>
              <p><strong>Client : Shaira Phone</strong></p>
              <p>
                Site e-commerce complet avec panier d'achat, système de paiement sécurisé, 
                gestion des commandes, suivi de livraison et panel d'administration. 
                Architecture microservices pour une scalabilité optimale.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Next.js</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">Stripe</span>
                <span className="tech-tag">MongoDB</span>
              </div>
            </div>
          </div>

          {/* Projet 4 - Système de Gestion de Stock */}
          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=800&q=80" alt="Code Frontend React" />
            </div>
            <div className="project-content">
              <h3>Système de Gestion de Stock</h3>
              <p>
                Application web fullstack pour la gestion d'inventaire en temps réel. 
                Interface intuitive avec tableaux de bord dynamiques, système de notifications, 
                gestion des permissions utilisateurs et génération de rapports automatisés.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Spring Boot</span>
                <span className="tech-tag">PostgreSQL</span>
                <span className="tech-tag">JWT</span>
                <span className="tech-tag">Chart.js</span>
              </div>
            </div>
          </div>

          {/* Projet 5 - API REST Sécurisée */}
          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80" alt="Code Backend Spring" />
            </div>
            <div className="project-content">
              <h3> API REST Backoffice Paiements</h3>
              <p>
                API REST sécurisée pour un système de paiement d'entreprise. Authentification JWT, 
                validation des transactions, logging avancé, tests unitaires et d'intégration. 
                Documentation OpenAPI/Swagger complète.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Spring Boot</span>
                <span className="tech-tag">Spring Security</span>
                <span className="tech-tag">MySQL</span>
                <span className="tech-tag">Redis</span>
                <span className="tech-tag">Swagger</span>
              </div>
            </div>
          </div>

          {/* Projet 5 - Dashboard Analytics */}
          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&q=80" alt="Code JavaScript Analytics" />
            </div>
            <div className="project-content">
              <h3>Dashboard Analytics Temps Réel</h3>
              <p>
                Tableau de bord interactif pour l'analyse de données en temps réel. 
                Visualisations dynamiques, filtres avancés, export de rapports PDF/Excel, 
                et notifications push pour les alertes critiques.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Vue.js</span>
                <span className="tech-tag">D3.js</span>
                <span className="tech-tag">Express</span>
                <span className="tech-tag">WebSocket</span>
                <span className="tech-tag">PostgreSQL</span>
              </div>
            </div>
          </div>

          {/* Projet 6 - Application Mobile Cross-Platform */}
          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1592609931095-54a2168ae893?w=800&q=80" alt="Code React Native" />
            </div>
            <div className="project-content">
              <h3> Application Mobile de Réservation</h3>
              <p>
                Application mobile cross-platform pour la réservation de services. 
                Synchronisation offline, géolocalisation, notifications push, 
                système de paiement intégré et chat en temps réel.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React Native</span>
                <span className="tech-tag">Firebase</span>
                <span className="tech-tag">Google Maps API</span>
                <span className="tech-tag">Redux</span>
                <span className="tech-tag">Expo</span>
              </div>
            </div>
          </div>

          {/* Projet 7 - Système de Blog CMS */}
          <div className="project-card">
            <div className="project-image">
              <img src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80" alt="Code Full Stack" />
            </div>
            <div className="project-content">
              <h3>Système CMS Blog Personnel</h3>
              <p>
                Plateforme de blogging avec éditeur WYSIWYG, gestion de médias, 
                système de commentaires modéré, SEO optimisé, et analytics intégré. 
                Interface d'administration complète pour la gestion de contenu.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Angular</span>
                <span className="tech-tag">TypeScript</span>
                <span className="tech-tag">NestJS</span>
                <span className="tech-tag">PostgreSQL</span>
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