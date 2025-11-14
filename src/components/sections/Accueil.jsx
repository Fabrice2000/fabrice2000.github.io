import React, { useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../Avatar';
import './Accueil.css';

const availableAnimations = ['marche', 'bonjour', 'rumba', 'hiphop'];

const Accueil = React.memo(({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('rumba');
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoAnimationMode, setAutoAnimationMode] = useState(true);
  
  // Optimisation des timers avec useCallback
  const handleTimedLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    // Animation d'entrée immédiate pour éviter les flickers
    const timer = setTimeout(handleTimedLoad, 10); // Très rapide
    return () => clearTimeout(timer);
  }, [handleTimedLoad]);

  // Système de changement automatique d'animation - optimisé avec useCallback
  const getRandomAnimation = useCallback(() => {
    const otherAnimations = availableAnimations.filter(anim => anim !== currentAnimation);
    return otherAnimations[Math.floor(Math.random() * otherAnimations.length)];
  }, [currentAnimation]);

  useEffect(() => {
    if (!autoAnimationMode || isAnimating) return;

    const autoChangeTimer = setTimeout(() => {
      const nextAnimation = getRandomAnimation();
      setCurrentAnimation(nextAnimation);
    }, Math.random() * 2000 + 4000); // Encore plus rapide: entre 4 et 6 secondes

    return () => clearTimeout(autoChangeTimer);
  }, [currentAnimation, autoAnimationMode, isAnimating, getRandomAnimation]);

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

  return (
    <div className={`accueil-container ${isLoaded ? 'loaded' : ''}`}>
      {/* Ma page d'accueil avec mon avatar */}
      <header className="hero-section">
        <div className="content-wrapper">
          <div className="text-content">
            <div className="greeting-animation">
              <h1 className="hero-title">
                Bonjour !
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
                Voir mes projets
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
                  : '/CV S Kouadjeu fabrice devellopeur.pdf'} 
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
                   Faire moi marcher
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'bonjour' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('bonjour')}
                  disabled={isAnimating}
                >
                  Dire moi bonjour
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'rumba' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('rumba')}
                  disabled={isAnimating}
                >
                   Hip-Hop Style
                </button>
                <button 
                  className={`animation-btn ${currentAnimation === 'hiphop' ? 'active' : ''} ${isAnimating ? 'disabled' : ''}`}
                  onClick={() => handleAnimationChange('hiphop')}
                  disabled={isAnimating}
                >
                   Danser la Rumba
                </button>
              </div>
              
              <div className="rotation-controls">
                <small> Cliquez sur l'avatar et glisser pour mieux visualiser l'avatar dans l'espace 3D</small>
              </div>
            </div>

            <div className="avatar-container">
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                style={{ 
                  pointerEvents: 'auto',
                  background: 'rgba(0, 0, 0, 0.1)'
                }}
                gl={{ 
                  preserveDrawingBuffer: true, 
                  antialias: true,
                  alpha: true,
                  stencil: false,
                  depth: true,
                  powerPreference: "high-performance"
                }}
                onCreated={({ gl, scene, camera }) => {
                  console.log('✅ Canvas created successfully');
                  console.log('📷 Camera position:', camera.position);
                  console.log('🎬 Scene children:', scene.children.length);
                  gl.setClearColor('#000000', 0);
                }}
                onPointerMissed={() => {
                  console.log('👆 Canvas clicked (pointer missed)');
                }}
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
                
                {/* Protection contre les erreurs - Avatar encapsulé */}
                <React.Suspense fallback={
                  <mesh>
                    <boxGeometry args={[1, 2, 1]} />
                    <meshStandardMaterial color="gray" />
                  </mesh>
                }>
                  <Avatar 
                    scale={2} 
                    position={[0, -1.8, 0]}
                    animationType={currentAnimation}
                  />
                </React.Suspense>
                <OrbitControls 
                  enableZoom={false} 
                  enablePan={false} 
                  enableRotate={true}
                  autoRotate={autoRotate} 
                  autoRotateSpeed={0.8} 
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
          <h3>À propos de moi</h3>
          <div className="about-content">
            <div className="about-photo-section">
              <img src={process.env.NODE_ENV === 'development' 
                ? `${process.env.PUBLIC_URL || ''}/photo-profile.jpg`
                : '/photo-profile.jpg'} 
                alt="Fabrice KOUADJEU" className="about-photo" />
            </div>
            <div className="about-text">
              <p>
                <strong>Développeur Full-Stack basé à Paris</strong>, je transforme vos idées en réalités digitales. 
                Mon expertise couvre l'ensemble du cycle de développement, du concept à la mise en production.
              </p>
              <div className="about-highlights">
                <div className="highlight">
                  
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
          <h3>Stack Technique & Compétences</h3>
          <div className="skills-grid">
            <div className="skill-card">
              <div className="skill-icon"></div>
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
              <div className="skill-icon"></div>
              <h4>Backend Development</h4>
              <p>Architecture robuste et APIs performantes</p>
              <div className="skill-tags">
                <span className="skill-tag">Spring Boot</span>
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
              <div className="skill-icon"></div>
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
              
              <h4>Outils & DevOps</h4>
              <p>Environnement de développement moderne</p>
              <div className="skill-tags">
                <span className="skill-tag">Git/GitHub</span>
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

      {/* SECTION EXPÉRIENCES PROFESSIONNELLES */}
      <section className="resume-section">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 col-12">
              <h3>Expériences Professionnelles</h3>
              <div className="timeline">
                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2025</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Développeur Backend</span><small>Orange (Stage) — Grenoble</small></h4>
                    <p><strong>Backoffice de gestion de paiements</strong></p>
                    <p>• Création d'API REST sécurisées (Spring Boot / Spring Security)</p>
                    <p>• Modélisation et intégration de la logique métier</p>
                    <p>• Documentation technique & collaboration Agile</p>
                    <p><em>Impact : amélioration sécurité et fiabilité des paiements</em></p>
                    <p><small>Février 2025 → Août 2025</small></p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2024</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Développeur Full Stack</span><small>LeGrand (Stage) — Limoges</small></h4>
                    <p><strong>Outil interne de gestion de stock</strong></p>
                    <p>• Interfaces Angular (formulaires dynamiques & UX)</p>
                    <p>• Interaction avec APIs internes & BDD PostgreSQL</p>
                    <p>• Participation à l'architecture modulaire du projet</p>
                    <p><em>Impact : interface plus fluide → réduction erreurs équipes logistiques</em></p>
                    <p><small>Avril 2024 → Août 2024</small></p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2024</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Chatbot Intelligent (IA + Facebook Graph)</span><small>Projet Personnel</small></h4>
                    <p><strong>Chatbot capable de réponses contextuelles</strong></p>
                    <p>• Récupération et analyse données via API Graph de Facebook</p>
                    <p>• Traitement du langage naturel (NLP)</p>
                    <p>• Interface web simple pour interaction utilisateur</p>
                    <p><em>Impact : automatisation recherche dans grands volumes de contenu</em></p>
                    <p><small>Depuis 2024</small></p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION FORMATIONS */}
      <section className="resume-section">
        <div className="container">
          <div className="row">
            {/* Éducation */}
            <div className="col-lg-12 col-12">
              <h3>Formations</h3>
              <div className="timeline">
                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2025-2027</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Master Développement Full Stack</span><small>ESTIAM — Paris</small></h4>
                    <p>- Approfondissement de l'architecture logicielle</p>
                    <p>- Développement web avancé avec React / Three.js</p>
                    <p>- Conception d'applications interactives</p>
                    <p>- Technologies immersives et 3D</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2023-2025</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Master Manager de Solutions Digitales & Data</span><small>3IL Ingénieur — Limoges</small></h4>
                    <p>- Conception de systèmes complets</p>
                    <p>- Gestion de projet technique</p>
                    <p>- Intégration de solutions digitales</p>
                    <p>- Architecture et données</p>
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2022-2023</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Bachelor Développement Web & Mobile</span><small>3IL Ingénieur — Limoges</small></h4>
                    <p>- Développement full-stack</p>
                    <p>- APIs REST et bases de données</p>
                    <p>- Méthodes Agile / Scrum</p>
                    <p>- Tests unitaires et code review</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
});

export default Accueil;