import React, { useEffect, useState, useCallback } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../Avatar';

// Hook pour détecter la taille d'écran et optimiser les performances
const useResponsiveSettings = () => {
  const [settings, setSettings] = useState({
    isMobile: false,
    isTablet: false,
    screenSize: 'desktop',
    performance: 'high'
  });
  
  useEffect(() => {
    const updateSettings = () => {
      const width = window.innerWidth;
      // const height = window.innerHeight; // Commenté car non utilisé actuellement
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = width >= 768 && width <= 1024;
      
      let screenSize, performance;
      
      if (width < 576) {
        screenSize = 'mobile-sm';
        performance = 'low';
      } else if (width < 768) {
        screenSize = 'mobile-lg';
        performance = 'low';
      } else if (width < 992) {
        screenSize = 'tablet';
        performance = 'medium';
      } else if (width < 1200) {
        screenSize = 'laptop';
        performance = 'medium';
      } else {
        screenSize = 'desktop';
        performance = 'high';
      }
      
      setSettings({
        isMobile: isMobile && width < 768,
        isTablet: isTablet,
        screenSize,
        performance
      });
    };
    
    updateSettings();
    window.addEventListener('resize', updateSettings);
    window.addEventListener('orientationchange', updateSettings);
    
    return () => {
      window.removeEventListener('resize', updateSettings);
      window.removeEventListener('orientationchange', updateSettings);
    };
  }, []);
  
  return settings;
};

function Accueil({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);
  
  // Paramètres responsifs
  const { isMobile, isTablet, performance } = useResponsiveSettings();
  
  useEffect(() => {
    // Petite animation d'entrée personnalisée
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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
              et des solutions digitales sur mesure. Spécialisé dans le développement React, 
              l'intégration d'API et les chatbots intelligents.
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
                <span className="stat-number">100%</span>
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
            </div>
          </div>
          <div className="avatar-section">
            <div className="avatar-container">
              {/* Cercle de contrôle principal pour l'avatar */}
              {/* Avatar 3D simplifié sans contrôles */}
                onMouseDown={!freeViewMode ? handleMouseDown : undefined}
                onWheel={!freeViewMode ? handleWheel : undefined}
                onTouchStart={!freeViewMode ? handleTouchStart : undefined}
                onTouchMove={!freeViewMode ? handleTouchMove : undefined}
                onTouchEnd={!freeViewMode ? handleTouchEnd : undefined}
                style={{ 
                  cursor: freeViewMode ? 'default' : 
                          isMobile ? 'grab' : 
                          (isDragging ? 'grabbing' : 'grab'),
                  touchAction: isMobile ? 'none' : 'auto'
                }}
              >
                <div className="main-control-indicators">
                  <div className="main-rotation-3d-indicator">
                    <div className="main-axis-x" style={{ transform: `rotateX(${avatarRotation.x}deg)` }}>
                      <span>🔴 X</span>
                    </div>
                    <div className="main-axis-y" style={{ transform: `rotateY(${avatarRotation.y}deg)` }}>
                      <span>🟢 Y</span>
                    </div>
                    <div className="main-axis-z" style={{ transform: `rotateZ(${avatarRotation.z}deg)` }}>
                      <span>🔵 Z</span>
                    </div>
                  </div>
                  <div className="main-instruction-text">
                    {freeViewMode ? 'Mode Vue Libre Activé' : 
                     autoRotate ? (isMobile ? 'Tapez pour contrôler' : 'Rotation auto - Glissez pour contrôler en 3D') : 
                     'Contrôle 3D actif'}
                  </div>
                  {!freeViewMode && (
                    <div className="control-help">
                      {isMobile ? (
                        <>
                          <div>� Glisser : X + Y</div>
                          <div>🔄 Rotation tactile</div>
                        </>
                      ) : (
                        <>
                          <div>�🖱️ Glisser : X + Y</div>
                          <div>🖲️ Molette : Z</div>
                        </>
                      )}
                    </div>
                  )}
                  {freeViewMode && (
                    <div className="control-help">
                      <div>{isMobile ? '� Glisser : Rotation libre' : '�🖱️ Glisser : Rotation libre'}</div>
                      <div>{isMobile ? '🤏 Pincer : Zoom' : '🖲️ Molette : Zoom'}</div>
                    </div>
                  )}
                  <div className="quick-controls" style={{ pointerEvents: 'auto' }}>
                    <button 
                      className="quick-button x-rotate" 
                      onClick={() => setAvatarRotation(prev => ({...prev, x: prev.x + 15}))}
                      title="Rotation X +15° (douce)"
                    >
                      🔴↻
                    </button>
                    <button 
                      className="quick-button y-rotate" 
                      onClick={() => setAvatarRotation(prev => ({...prev, y: prev.y + 15}))}
                      title="Rotation Y +15° (douce)"
                    >
                      🟢↻
                    </button>
                    {!isMobile && (
                      <button 
                        className="quick-button z-rotate" 
                        onClick={() => setAvatarRotation(prev => ({...prev, z: prev.z + 15}))}
                        title="Rotation Z +15° (douce)"
                      >
                        🔵↻
                      </button>
                    )}
                  </div>
                  <div className="main-action-buttons" style={{ pointerEvents: 'auto' }}>
                    <button 
                      className="mode-button" 
                      onClick={toggleFreeView}
                      title={freeViewMode ? "Désactiver la vue libre" : "Activer la vue libre"}
                    >
                      {freeViewMode ? '🔒 Mode Manuel' : '🌐 Vue Libre'}
                    </button>
                    <button 
                      className="reset-button" 
                      onClick={resetRotation}
                    >
                      ↻ Reset 3D
                    </button>
                  </div>
                </div>
              </div>
              
              <Canvas 
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ 
                  antialias: performance !== 'low', 
                  alpha: true,
                  powerPreference: isMobile ? "low-power" : "high-performance"
                }}
                shadows={performance === 'high'}
                dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
              >
                {/* Éclairage adaptatif selon les performances */}
                <ambientLight intensity={isMobile ? 1.8 : 2.2} />
                
                {/* Lumière principale adaptée */}
                <directionalLight 
                  position={[0, 10, 12]} 
                  intensity={isMobile ? 3 : 4} 
                  color="#ffffff"
                  castShadow={performance === 'high'}
                />
                
                {/* Éclairage complet uniquement sur desktop */}
                {performance !== 'low' && (
                  <>
                    <pointLight position={[6, 4, 10]} intensity={3} color="#ffffff" />
                    <pointLight position={[-6, 4, 10]} intensity={3} color="#ffffff" />
                    <pointLight position={[0, -4, 8]} intensity={2.5} color="#f8f8f8" />
                    <pointLight position={[4, 0, 6]} intensity={1.8} color="#64b5f6" />
                    <pointLight position={[-4, 0, 6]} intensity={1.8} color="#42a5f5" />
                  </>
                )}
                
                {/* Éclairage simplifié pour mobile */}
                {performance === 'low' && (
                  <>
                    <pointLight position={[2, 2, 6]} intensity={2} color="#ffffff" />
                    <pointLight position={[-2, 2, 6]} intensity={2} color="#ffffff" />
                  </>
                )}
                
                {/* Éclairage d'arrière-plan */}
                <directionalLight 
                  position={[0, 0, -10]} 
                  intensity={isMobile ? 1.5 : 2} 
                  color="#81c784"
                />
                
                <group rotation={[
                  (avatarRotation.x * Math.PI) / 180,
                  (avatarRotation.y * Math.PI) / 180,
                  (avatarRotation.z * Math.PI) / 180
                ]}>
                  <Avatar scale={isMobile ? 1.5 : 2} position={[0, isMobile ? -1.5 : -1.8, 0]} />
                </group>
                <OrbitControls 
                  enableZoom={freeViewMode} 
                  enablePan={freeViewMode} 
                  enableRotate={freeViewMode}
                  autoRotate={autoRotate && !isMobile} 
                  autoRotateSpeed={isMobile ? 0.1 : 0.3} 
                  minDistance={3}
                  maxDistance={10}
                  enableDamping={true}
                  dampingFactor={isMobile ? 0.1 : 0.05}
                  maxPolarAngle={Math.PI / 1.6}
                  minPolarAngle={Math.PI / 4}
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
    </div>
  );
}

export default Accueil;