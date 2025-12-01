import React, { useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../Avatar';
import '../../styles/accueil.css';

const availableAnimations = ['marche', 'bonjour', 'rumba', 'hiphop'];

const Accueil = React.memo(({ onNavigate }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [currentAnimation, setCurrentAnimation] = useState('rumba');
  const [isAnimating, setIsAnimating] = useState(false);
  const [autoAnimationMode, setAutoAnimationMode] = useState(true);
  
  // J'optimise le chargement
  const handleTimedLoad = useCallback(() => {
    setIsLoaded(true);
  }, []);
  
  useEffect(() => {
    // Je lance l'animation d'entrée super vite
    const timer = setTimeout(handleTimedLoad, 10);
    return () => clearTimeout(timer);
  }, [handleTimedLoad]);

  // Mon système pour changer les animations automatiquement
  const getRandomAnimation = useCallback(() => {
    const otherAnimations = availableAnimations.filter(anim => anim !== currentAnimation);
    return otherAnimations[Math.floor(Math.random() * otherAnimations.length)];
  }, [currentAnimation]);

  useEffect(() => {
    if (!autoAnimationMode || isAnimating) return;

    const autoChangeTimer = setTimeout(() => {
      const nextAnimation = getRandomAnimation();
      setCurrentAnimation(nextAnimation);
    }, Math.random() * 2000 + 4000); // Entre 4 et 6 secondes pour que ça reste vivant

    return () => clearTimeout(autoChangeTimer);
  }, [currentAnimation, autoAnimationMode, isAnimating, getRandomAnimation]);

  // Mes fonctions pour gérer les animations de l'avatar
  const handleAnimationChange = (animationType) => {
    if (isAnimating) return; // J'évite les changements trop rapides
    
    // Je désactive le mode auto quand l'utilisateur clique sur un bouton
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
              Développeur Full-Stack & Etudiant 
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
                <span className="stat-number">09+</span>
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
                 Me contacter
              </button>
              {/* Bouton Télécharger CV */}
              <a 
                href={process.env.NODE_ENV === 'development' 
                  ? `${process.env.PUBLIC_URL || ''}/CV S Kouadjeu fabrice devellopeur.pdf`
                  : '/CV S Kouadjeu fabrice devellopeur.pdf'} 
                className="btn-primary cv-download-btn"
                download="CV_Fabrice_KOUADJEU_Developpeur.pdf"
              >
                Télécharger Mon CV
              </a>
            </div>
          </div>
          <div className="avatar-section">
            {/* Panneau de contrôle des animations de l'avatar */}
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
                    <p>Applications web et logiciels modernes, intégrations API complexes</p>
                  </div>
                </div>
                <div className="highlight">
                  <span className="highlight-icon"></span>
                  <div>
                    <h4>Langues</h4>
                    <p>Français (natif), Anglais (professionnel)</p>
                  </div>
                </div>
                <div className="highlight">
                  <div>
                    <h4>Localisation</h4>
                    <p>Paris, France - Mobilité sur tout le territoire en fonction des offres</p>
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
              <div className="skill-icon">💻</div>
              <h4>Frontend Development</h4>
              <p>Interfaces utilisateur modernes et responsives</p>
              <div className="skill-tags-with-logos">
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" />
                  <span>React.js</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" />
                  <span>JavaScript</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" alt="TypeScript" />
                  <span>TypeScript</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" />
                  <span>HTML5</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" />
                  <span>CSS3</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" alt="Three.js" />
                  <span>Three.js</span>
                </div>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '90%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">⚙️</div>
              <h4>Backend Development</h4>
              <p>Architecture robuste et APIs performantes</p>
              <div className="skill-tags-with-logos">
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg" alt="Spring Boot" />
                  <span>Spring Boot</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" alt="Node.js" />
                  <span>Node.js</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" />
                  <span>Python</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" alt="Express.js" />
                  <span>Express.js</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" alt="MongoDB" />
                  <span>MongoDB</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" />
                  <span>PostgreSQL</span>
                </div>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '85%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🛠️</div>
              <h4>Outils & DevOps</h4>
              <p>Environnement de développement moderne</p>
              <div className="skill-tags-with-logos">
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" />
                  <span>Git</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" alt="GitHub" />
                  <span>GitHub</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" alt="Docker" />
                  <span>Docker</span>
                </div>
                <div className="skill-tag-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '40px', height: '40px'}}>
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 1.846c1.634 0 3.167.388 4.533 1.077l-1.533 1.533a8.123 8.123 0 0 0-5.769 0L7.698 2.923A10.108 10.108 0 0 1 12 1.846zm-6.154 2.77l1.533 1.533a8.123 8.123 0 0 0 0 5.769l-1.533 1.533A10.108 10.108 0 0 1 1.846 12c0-1.634.388-3.167 1.077-4.533zM12 8.123a3.877 3.877 0 1 1 0 7.754 3.877 3.877 0 0 1 0-7.754zm6.154-1.507l1.533-1.533A10.108 10.108 0 0 1 22.154 12c0 1.634-.388 3.167-1.077 4.533l-1.533-1.533a8.123 8.123 0 0 0 0-5.769zM12 22.154c-1.634 0-3.167-.388-4.533-1.077l1.533-1.533a8.123 8.123 0 0 0 5.769 0l1.533 1.533A10.108 10.108 0 0 1 12 22.154z"/>
                  </svg>
                  <span>Vercel</span>
                </div>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '75%'}}></div>
              </div>
            </div>
            <div className="skill-card">
              <div className="skill-icon">🤖</div>
              <h4>Intelligence Artificielle</h4>
              <p>Chatbots intelligents et traitement du langage</p>
              <div className="skill-tags-with-logos">
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" alt="AI" />
                  <span>NLP</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="ML" />
                  <span>Machine Learning</span>
                </div>
                <div className="skill-tag-logo">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/facebook/facebook-original.svg" alt="Facebook" />
                  <span>Graph API</span>
                </div>
                <div className="skill-tag-logo">
                  <svg viewBox="0 0 24 24" fill="currentColor" style={{width: '40px', height: '40px'}}>
                    <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/>
                  </svg>
                  <span>OpenAI</span>
                </div>
              </div>
              <div className="skill-level">
                <div className="skill-bar" style={{width: '80%'}}></div>
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
                    <p><strong>Backoffice de paiements</strong></p>
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
                    <h4><span>Développeur Frontend</span><small>LeGrand (Stage) — Limoges</small></h4>
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
                    <h4><span>Master en Développement Fullstack & Architecture Logicielle</span><small>ESTIAM — Paris</small></h4>
                    <p>- Approfondissement de l'architecture logicielle</p>
                    <p>- Développement web et Technologies clouds</p>
                    <p>- Advanced Fullstack </p>
                    <p>- Bases du DevOps </p>
                    <p>- Conception d'applications interactives et 3D avec three.js</p>
                    
                  </div>
                </div>

                <div className="timeline-wrapper">
                  <div className="timeline-yr">
                    <span>2023-2025</span>
                  </div>
                  <div className="timeline-info">
                    <h4><span>Master Manager de Solutions Digitales & Datas</span><small>3IL Ingénieur — Limoges</small></h4>
                    <p>- Conception de systèmes d'information complets</p>
                    <p>- Gestion de projet technique</p>
                    <p>- Intégration de solutions digitales</p>
                    <p>- Architecture et données</p>
                    <p>- Big Data</p>
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