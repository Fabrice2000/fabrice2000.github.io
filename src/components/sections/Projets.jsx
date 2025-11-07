import React from 'react';
import './Projets.css';

function Projets({ onNavigate }) {
  // Images dynamiques pour différents types de projets
  const getProjectImage = (imageType, title) => {
    // Pour le portfolio 3D, garder l'image réelle
    if (title.includes("Portfolio 3D")) {
      return "/portfolio-3d/photo-profile.png";
    }
    
    // Pour les autres projets, alterner les images
    const images = [
      "/portfolio-3d/ma photo.png",
      "/portfolio-3d/photo-profile.png"
    ];
    
    const imageIndex = title.length % 2;
    return images[imageIndex];
  };

  const projects = [
    {
      title: "Portfolio 3D Interactif",
      description: "Portfolio avec avatar 3D animé, développé avec React et Three.js. Animations fluides et interactions en temps réel.",
      image: "/portfolio-3d/photo-profile.png",
      imageType: "profile",
      link: "https://fabrice2000.github.io/portfolio-3d/",
      tech: ["React.js", "Three.js", "WebGL"]
    },
    {
      title: "Application de Gestion",
      description: "Système de gestion complet avec interface moderne et API REST robuste.",
      image: "/portfolio-3d/ma photo.png",
      imageType: "professional",
      link: "#",
      tech: ["React", "Node.js", "MongoDB"]
    },
    {
      title: "Chatbot Intelligent",
      description: "Bot conversationnel avec intelligence artificielle pour automatiser les réponses clients.",
      image: "/portfolio-3d/photo-profile.png",
      imageType: "tech",
      link: "#",
      tech: ["Python", "NLP", "API REST"]
    },
    {
      title: "Plateforme E-commerce",
      description: "Site e-commerce moderne avec panier, paiement sécurisé et gestion des commandes.",
      image: "/portfolio-3d/ma photo.png",
      imageType: "business",
      link: "#",
      tech: ["Next.js", "Stripe", "PostgreSQL"]
    },
    {
      title: "Dashboard Analytics",
      description: "Interface de visualisation de données avec graphiques interactifs et temps réel.",
      image: "/portfolio-3d/photo-profile.png",
      imageType: "analytics",
      link: "#",
      tech: ["React", "D3.js", "WebSocket"]
    }
  ];

  return (
    <section className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2>🚀 Explorer mes projets récents</h2>
          <p>Découvrez quelques réalisations dont je suis particulièrement fier</p>
        </div>
        
        {/* Carrousel de projets inspiré du portfolio de Romain */}
        <div className="projects-carousel">
          <div className="carousel-container">
            {projects.map((project, index) => (
              <div key={index} className="project-item">
                <div className="project-info">
                  <div className={`project-image-container ${project.imageType}`}>
                    <img 
                      src={project.image} 
                      className="img-fluid project-image" 
                      alt={`${project.title} preview`}
                    />
                    <div className="image-overlay">
                      <div className="project-type-icon">
                        {project.imageType === 'profile' && '🎮'}
                        {project.imageType === 'professional' && '💼'}
                        {project.imageType === 'tech' && '🤖'}
                        {project.imageType === 'business' && '🛒'}
                        {project.imageType === 'analytics' && '📊'}
                      </div>
                    </div>
                  </div>
                  <div className="project-overlay">
                    <h4>{project.title}</h4>
                    <p>{project.description}</p>
                    <div className="project-tech-tags">
                      {project.tech.map((tech, techIndex) => (
                        <span key={techIndex} className="tech-tag-small">{tech}</span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Consulter →
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section projets détaillés */}
        <div className="projects-grid">
          {/* Mon projet le plus abouti */}
          <div className="project-card featured">
            <div className="project-badge">⭐ Projet Phare</div>
            <div className="project-content">
              <h3>🎮 Portfolio 3D Interactif</h3>
              <p>
                Un portfolio révolutionnaire avec avatar 3D animé développé avec React et Three.js. 
                Featuring des animations fluides, interactions en temps réel et une expérience utilisateur immersive.
                Le défi principal était d'optimiser les performances 3D pour tous les appareils.
              </p>
              <div className="project-features">
                <span className="feature">🎨 Animations 3D fluides</span>
                <span className="feature">⚡ Performances optimisées</span>
                <span className="feature">📱 Design responsive</span>
                <span className="feature">🎮 Interactions temps réel</span>
              </div>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Three.js</span>
                <span className="tech-tag">WebGL</span>
                <span className="tech-tag">Responsive Design</span>
              </div>
              <div className="project-actions">
                <a 
                  href="https://fabrice2000.github.io/portfolio-3d/" 
                  className="btn-project primary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  🌐 Voir le site
                </a>
                <a 
                  href="https://github.com/Fabrice2000/portfolio-3d" 
                  className="btn-project secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  💻 Voir le code
                </a>
              </div>
            </div>
          </div>

          {/* Autres Projets */}
          <div className="project-card">
            <div className="project-content">
              <h3>🌐 Application Web Moderne</h3>
              <p>
                Développement d'une application web complète avec authentification, 
                gestion d'état et interface utilisateur moderne. Architecture full-stack robuste.
              </p>
              <div className="project-tech">
                <span className="tech-tag">React.js</span>
                <span className="tech-tag">Node.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">JWT</span>
              </div>
              <div className="project-actions">
                <a href="#" className="btn-project secondary">🔗 Voir le projet</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <h3>💬 Chatbot Intelligent</h3>
              <p>
                Bot conversationnel avec traitement du langage naturel pour 
                automatiser le support client et améliorer l'expérience utilisateur.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">NLP</span>
                <span className="tech-tag">API REST</span>
                <span className="tech-tag">Machine Learning</span>
              </div>
              <div className="project-actions">
                <a href="#" className="btn-project secondary">🔗 Voir le projet</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <h3>� Dashboard Analytics</h3>
              <p>
                Interface de visualisation de données avec graphiques interactifs, 
                données en temps réel et exports automatisés.
              </p>
              <div className="project-tech">
                <span className="tech-tag">D3.js</span>
                <span className="tech-tag">Chart.js</span>
                <span className="tech-tag">MongoDB</span>
                <span className="tech-tag">WebSocket</span>
              </div>
              <div className="project-actions">
                <a href="#" className="btn-project secondary">🔗 Voir le projet</a>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action inspiré du portfolio de Romain */}
        <div className="projects-cta">
          <h3>🚀 Intéressé par mes réalisations ?</h3>
          <p>Discutons de votre prochain projet ensemble !</p>
          <button 
            className="btn-cta"
            onClick={() => onNavigate('contact')}
          >
            💬 Commençons à collaborer
          </button>
        </div>
      </div>
    </section>
  );
}

export default Projets;