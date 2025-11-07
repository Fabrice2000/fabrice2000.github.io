import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../Avatar';
import './Accueil.css';

// Liste des animations disponibles pour la rotation automatique
const availableAnimations = ['marche', 'bonjour', 'rumba', 'hiphop'];

function Accueil({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarRotation, setAvatarRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [currentAnimation, setCurrentAnimation] = useState('rumba');
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoAnimationMode, setAutoAnimationMode] = useState(true);
  
  useEffect(() => {
    // Animation d'entrée plus rapide
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 50); // Réduit de 100ms à 50ms
    return () => clearTimeout(timer);
  }, []);

  // Système de changement automatique d'animation - plus rapide
  useEffect(() => {
    if (!autoAnimationMode || isAnimating) return;

    const getRandomAnimation = () => {
      const otherAnimations = availableAnimations.filter(anim => anim !== currentAnimation);
      return otherAnimations[Math.floor(Math.random() * otherAnimations.length)];
    };

    const autoChangeTimer = setTimeout(() => {
      const nextAnimation = getRandomAnimation();
      setCurrentAnimation(nextAnimation);
    }, Math.random() * 3000 + 5000); // Réduit: entre 5 et 8 secondes (au lieu de 8-13s)

    return () => clearTimeout(autoChangeTimer);
  }, [currentAnimation, autoAnimationMode, isAnimating]); // Supprimé availableAnimations

  // Fonctions pour contrôler la rotation 3D de l'avatar principal
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setAutoRotate(false);
    setLastMousePosition({ x: e.clientX, y: e.clientY });
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      const deltaX = e.clientX - lastMousePosition.x;
      const deltaY = e.clientY - lastMousePosition.y;
      
      // Rotation 3D avec sensibilité très douce pour des mouvements naturels
      setAvatarRotation(prev => ({
        x: prev.x + deltaY * 0.12, // Mouvement vertical → rotation X (réduit à 0.12 pour fluidité)
        y: prev.y + deltaX * 0.12, // Mouvement horizontal → rotation Y (réduit à 0.12 pour fluidité)
        z: prev.z // Z reste inchangé pour l'instant
      }));
      
      setLastMousePosition({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Rotation Z avec la molette (sensibilité très douce)
  const handleWheel = (e) => {
    if (!autoRotate) {
      e.preventDefault();
      setAvatarRotation(prev => ({
        ...prev,
        z: prev.z + e.deltaY * 0.04 // Réduit à 0.04 pour mouvement ultra-smooth
      }));
    }
  };

  // Fonctions pour contrôler les animations de l'avatar
  const handleAnimationChange = (animationType) => {
    if (isAnimating) return; // Empêcher les changements trop rapides
    
    // Désactiver temporairement le mode automatique quand l'utilisateur choisit
    setAutoAnimationMode(false);
    setIsAnimating(true);
    setCurrentAnimation(animationType);
    
    // Réactiver le mode automatique après 15 secondes d'inactivité (réduit de 20s)
    setTimeout(() => {
      setAutoAnimationMode(true);
    }, 15000);
    
    // Réactiver après un délai plus court pour éviter le spam
    setTimeout(() => {
      setIsAnimating(false);
    }, 600); // Réduit de 1000ms à 600ms
  };

  const handleAvatarAnimationEnd = (nextAnimation) => {
    setCurrentAnimation(nextAnimation);
    setIsAnimating(false);
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, handleMouseMove]); // Ajout de handleMouseMove

  return (
    <div className={`accueil-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Ma page d'accueil avec mon avatar */}
      <header className="hero-section">
        <div className="content-wrapper">
          <div className="text-content">
            <div className="greeting-animation">
              <h1 className="hero-title">
                Bonjour ! <span className="wave">👋</span>
              </h1>
            </div>
            <h2 className="hero-subtitle">
              Je suis Fabrice KOUADJEU NGATCHOU
            </h2>
            <h3 className="hero-role">
              Développeur Full-Stack & Créateur d'Expériences Numériques
            </h3>
            <p className="hero-description">
              Passionné par l'innovation technologique, je crée des applications web modernes 
              et des solutions digitales sur mesure. je suis spécialisé dans l'ingénierie de développement de logiciels web,mobiles et en solutions cloud.
            </p>
            <div className="hero-stats">
              <div className="stat">
                <span className="stat-number">3+</span>
                <span className="stat-label">Années d'expérience</span>
              </div>
              <div className="stat">
                <span className="stat-number">15+</span>
                <span className="stat-label">Projets réalisés</span>
              </div>
              <div className="stat">
                <span className="stat-number">93%</span>
                <span className="stat-label">Satisfaction client</span>
              </div>
            </div>
            <div className="hero-buttons">
              <button 
                className="btn-primary"
                onClick={() => onNavigate('projets')}
              >
                🚀 Voir mes projets
              </button>
              <button 
                className="btn-secondary"
                onClick={() => onNavigate('contact')}
              >
                💬 Me contacter
              </button>
              {/* 📄 Bouton Télécharger CV inspiré du portfolio */}
              <a 
                href={process.env.NODE_ENV === 'development' 
                  ? `${process.env.PUBLIC_URL || ''}/CV S Kouadjeu fabrice devellopeur.pdf`
                  : '/portfolio-3d/CV S Kouadjeu fabrice devellopeur.pdf'} 
                className="btn-primary cv-download-btn"
                download="CV_Fabrice_KOUADJEU_Developpeur.pdf"
              >
                📄 Télécharger Mon CV
              </a>
            </div>
          </div>
          <div className="avatar-section">
            {/* Panneau de contrôle des animations - déplacé à côté de l'avatar */}
            <div className="avatar-animation-controls">
              <h4> Tu peux interagir avec Fabrice virtuellement</h4>
              <div className="animation-buttons">
                <button 
                  className={`animation-btn ${currentAnimation === 'marche' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('marche')}
                  disabled={isAnimating}
                >
                  🚶‍♂️ Faire moi marcher
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'bonjour' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('bonjour')}
                  disabled={isAnimating}
                >
                  👋 Dire moi bonjour
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'rumba' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('rumba')}
                  disabled={isAnimating}
                >
                  🎤 Hip-Hop Style
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'hiphop' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('hiphop')}
                  disabled={isAnimating}
                >
                  💃 Danser la Rumba
                </button>
              </div>
              <div className="animation-status">
                {isAnimating ? (
                  <span className="status-animating">🎬 Animation en cours...</span>
                ) : (
                  <span className="status-ready">
                    ✅ Mode: {
                      currentAnimation === 'marche' ? 'Marche' :
                      currentAnimation === 'bonjour' ? 'Salut' :
                      currentAnimation === 'rumba' ? 'Rumba' :
                      'Hip-Hop'
                    }
                    {autoAnimationMode && (
                      <span className="auto-mode"> 🔄</span>
                    )}
                  </span>
                )}
              </div>
            </div>

            <div className="avatar-container">
              {/* Cercle de contrôle principal pour l'avatar */}
              <div 
                className={`main-avatar-control ${isDragging ? 'dragging' : ''}`}
                onMouseDown={handleMouseDown}
                onWheel={handleWheel}
                style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
              >
              </div>
              
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ pointerEvents: 'auto' }}
                gl={{ preserveDrawingBuffer: true, antialias: true }}
              >
                {/* J'ai travaillé longtemps sur l'éclairage pour que mon avatar soit parfait */}
                <ambientLight intensity={2.2} />
                
                {/* Lumière principale qui éclaire bien le visage */}
                <directionalLight 
                  position={[0, 10, 12]} 
                  intensity={4} 
                  color="#ffffff"
                  castShadow={false}
                />
                
                {/* Deux spots sur les côtés */}
                <pointLight position={[6, 4, 10]} intensity={3} color="#ffffff" />
                <pointLight position={[-6, 4, 10]} intensity={3} color="#ffffff" />
                
                {/* Éclairage par le bas pour éviter les ombres */}
                <pointLight position={[0, -4, 8]} intensity={2.5} color="#f8f8f8" />
                
                {/* Un peu de couleur bleue pour le style */}
                <pointLight position={[4, 0, 6]} intensity={1.8} color="#64b5f6" />
                <pointLight position={[-4, 0, 6]} intensity={1.8} color="#42a5f5" />
                
                {/* Éclairage d'arrière-plan avec une touche verte */}
                <directionalLight 
                  position={[0, 0, -10]} 
                  intensity={2} 
                  color="#81c784"
                />
                
                {/* Finitions pour un rendu uniforme */}
                <pointLight position={[2, 6, 4]} intensity={1.5} color="#e8f4fd" />
                <pointLight position={[-2, 6, 4]} intensity={1.5} color="#e8f4fd" />
                
                <group 
                  rotation={[
                    (avatarRotation.x * Math.PI) / 180,
                    (avatarRotation.y * Math.PI) / 180,
                    (avatarRotation.z * Math.PI) / 180
                  ]}
                  scale={[1, 1, 1]}
                >
                  <Avatar 
                    scale={2} 
                    position={[0, -1.8, 0]} 
                    animationType={currentAnimation}
                    onAnimationChange={handleAvatarAnimationEnd}
                  />
                </group>
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  enableRotate={false}
                  autoRotate={autoRotate} 
                  autoRotateSpeed={0.3} 
                  minDistance={3}
                  maxDistance={10}
                  enableDamping={true}
                  dampingFactor={0.05}
                />
              </Canvas>
            </div>
          </div>
        </div>
      </header>

      {/* Ma présentation personnelle */}
      <section className="about-section">
        <div className="container">
          <h3>👨‍💻 À propos de moi</h3>
          <div className="about-content">
            <div className="about-photo-section">
              <img src={process.env.NODE_ENV === 'development' 
                ? `${process.env.PUBLIC_URL || ''}/photo-profile.png`
                : '/portfolio-3d/photo-profile.png'} 
                alt="Fabrice KOUADJEU" className="about-photo" />
            </div>
            <div className="about-text">
              <p>
                <strong>Développeur Full-Stack basé à Paris</strong>, je transforme vos idées en réalités digitales. 
                Mon expertise couvre l'ensemble du cycle de développement, du concept à la mise en production.
              </p>
              <div className="about-highlights">
                <div className="highlight">
                  <span className="highlight-icon">🎯</span>
                  <div>
                    <h4>Spécialisation</h4>
                    <p>Applications web modernes, chatbots IA, intégrations API complexes</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">🌍</span>
                  <div>
                    <h4>Langues</h4>
                    <p>Français (natif), Anglais (professionnel)</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon">📍</span>
                  <div>
                    <h4>Localisation</h4>
                    <p>Paris, France - Disponible en remote</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mes compétences techniques */}
      <section className="skills-section">
        <div className="container">
          <h3>💼 Stack Technique & Compétences</h3>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon">🎨</div>
              <h4>Frontend Development</h4>
              <p>Interfaces utilisateur modernes et responsives</p>
              <div className="skill-tags">
                <span className="skill-tag">React.js</span>
                <span className="skill-tag">JavaScript ES6+</span>
                <span className="skill-tag">TypeScript</span>
                <span className="skill-tag">HTML5/CSS3</span>
                <span className="skill-tag">Three.js</span>
                <span className="skill-tag">Responsive Design</span>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">⚙️</div>
              <h4>Backend Development</h4>
              <p>Architecture robuste et APIs performantes</p>
              <div className="skill-tags">
                <span className="skill-tag">Node.js</span>
                <span className="skill-tag">Python</span>
                <span className="skill-tag">Express.js</span>
                <span className="skill-tag">APIs REST</span>
                <span className="skill-tag">MongoDB</span>
                <span className="skill-tag">PostgreSQL</span>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🤖</div>
              <h4>Intelligence Artificielle</h4>
              <p>Chatbots intelligents et traitement du langage</p>
              <div className="skill-tags">
                <span className="skill-tag">NLP</span>
                <span className="skill-tag">Chatbot Development</span>
                <span className="skill-tag">Facebook Graph API</span>
                <span className="skill-tag">Machine Learning</span>
                <span className="skill-tag">OpenAI API</span>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '80%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🔧</div>
              <h4>Outils & DevOps</h4>
              <p>Environnement de développement moderne</p>
              <div className="skill-tags">
                <span className="skill-tag">Git/GitHub</span>
                <span className="skill-tag">VS Code</span>
                <span className="skill-tag">Webpack</span>
                <span className="skill-tag">Docker</span>
                <span className="skill-tag">Netlify/Vercel</span>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '75%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🎓 SECTION EXPÉRIENCES ET ÉDUCATION inspirée du portfolio */}
      <section className="resume-section">
        <div className="container">
          <div className="row">
            {/* Éducation */}
            <div className="col-lg-6 col-12">
              <h3>🎓 Éducations</h3>
              <div className="timeline">
                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2024</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Master en Ingénierie Logicielle & IA</span></h4>
                    <small>Compétences acquises</small>
                    <p>- Architecture et conception d'applications web complexes avec React.js et Three.js</p>
                    <p>- Développement d'interfaces 3D interactives et expériences utilisateur immersives</p>
                    <p>- Intégration d'intelligence artificielle dans les applications web modernes</p>
                    <p>- Optimisation des performances et responsive design avancé</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2022</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Bachelor en Développement Web & Mobile</span></h4>
                    <small>Compétences acquises</small>
                    <p>- Développement Full-Stack avec Node.js, React et bases de données</p>
                    <p>- Création d'APIs REST et intégration de services cloud</p>
                    <p>- Méthodologies Agile et gestion de projets techniques</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2021</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Certification Développement JavaScript Avancé</span></h4>
                    <small>Compétences acquises</small>
                    <p>- Maîtrise approfondie de JavaScript ES6+ et frameworks modernes</p>
                    <p>- Développement d'applications web progressives (PWA)</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Expériences */}
            <div className="col-lg-6 col-12">
              <h3>💼 Expériences Professionnelles</h3>
              <div className="timeline">
                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2024</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Développeur Full-Stack Senior</span><small>Freelance</small></h4>
                    <p>- Création de portfolios 3D interactifs avec React Three Fiber</p>
                    <p>- Développement d'applications web modernes avec animations avancées</p>
                    <p>- Optimisation des performances et intégration de chatbots IA</p>
                    <p>- Consultation technique pour des startups et PME</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2023</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Développeur Frontend React</span><small>TechCorp</small></h4>
                    <p>- Développement d'interfaces utilisateur complexes avec React.js</p>
                    <p>- Intégration d'APIs REST et gestion d'état avec Redux</p>
                    <p>- Collaboration étroite avec les équipes UX/UI et backend</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2022</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Développeur Web Junior</span><small>WebStudio</small></h4>
                    <p>- Participation au développement de sites web responsives</p>
                    <p>- Apprentissage des meilleures pratiques en développement web</p>
                    <p>- Intégration de systèmes de gestion de contenu (CMS)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 🛠️ SECTION TECHNOLOGIES ET COMPÉTENCES détaillées */}
      <section className="technologies-section">
        <div className="container">
          <div className="section-title">
            <h2>🛠️ Mes Compétences et Outils</h2>
          </div>
          
          <div className="tech-grid">
            <div className="tech-category">
              <div className="tech-icon">💻</div>
              <h3 className="tech-title">Langages de Programmation</h3>
              <div className="tech-list">
                <span className="tech-item">JavaScript ES6+</span>
                <span className="tech-item">TypeScript</span>
                <span className="tech-item">Python</span>
                <span className="tech-item">HTML5/CSS3</span>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-icon">⚛️</div>
              <h3 className="tech-title">Frameworks & Bibliothèques</h3>
              <div className="tech-list">
                <span className="tech-item">React.js</span>
                <span className="tech-item">Three.js</span>
                <span className="tech-item">Node.js</span>
                <span className="tech-item">Express.js</span>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-icon">🛠️</div>
              <h3 className="tech-title">Outils de Développement</h3>
              <div className="tech-list">
                <span className="tech-item">Git/GitHub</span>
                <span className="tech-item">VS Code</span>
                <span className="tech-item">Webpack</span>
                <span className="tech-item">Docker</span>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-icon">🗄️</div>
              <h3 className="tech-title">Bases de Données</h3>
              <div className="tech-list">
                <span className="tech-item">MongoDB</span>
                <span className="tech-item">PostgreSQL</span>
                <span className="tech-item">MySQL</span>
                <span className="tech-item">Firebase</span>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-icon">🔒</div>
              <h3 className="tech-title">Sécurité & DevOps</h3>
              <div className="tech-list">
                <span className="tech-item">JWT</span>
                <span className="tech-item">OAuth</span>
                <span className="tech-item">CI/CD</span>
                <span className="tech-item">Netlify/Vercel</span>
              </div>
            </div>

            <div className="tech-category">
              <div className="tech-icon">👥</div>
              <h3 className="tech-title">Méthodologies</h3>
              <div className="tech-list">
                <span className="tech-item">Agile/Scrum</span>
                <span className="tech-item">TDD</span>
                <span className="tech-item">Code Review</span>
                <span className="tech-item">Git Flow</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Accueil;