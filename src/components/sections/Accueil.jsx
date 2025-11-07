import React, { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import Avatar from '../Avatar';

function Accueil({ onNavigate }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [avatarRotation, setAvatarRotation] = useState({ x: 0, y: 0, z: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);
  const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
  const [freeViewMode, setFreeViewMode] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState('bonjour');
  const [showAnimationControls, setShowAnimationControls] = useState(false);

  // Animations disponibles avec leurs descriptions
  const availableAnimations = [
    { id: 'bonjour', name: '👋 Salut', description: 'Animation de présentation' },
    { id: 'praying', name: '🙏 Prière', description: 'Posture respectueuse' },
    { id: 'dancing', name: '💃 Danse Rumba', description: 'Mouvement énergique' },
    { id: 'walking-happy', name: '😊 Marche Joyeuse', description: 'Démarche positive' },
    { id: 'walking-slow', name: '🚶 Marche Lente', description: 'Allure réfléchie' },
    { id: 'walking-fast', name: '🏃 Marche Rapide', description: 'Pas déterminé' },
  ];
  
  useEffect(() => {
    // Petite animation d'entrée personnalisée
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const resetRotation = () => {
    setAvatarRotation({ x: 0, y: 0, z: 0 });
    setAutoRotate(true);
    setFreeViewMode(false);
  };

  const toggleFreeView = () => {
    setFreeViewMode(!freeViewMode);
    setAutoRotate(false);
    if (freeViewMode) {
      setAvatarRotation({ x: 0, y: 0, z: 0 });
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

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
              <div 
                className={`main-avatar-control ${isDragging ? 'dragging' : ''} ${freeViewMode ? 'free-view-active' : ''}`}
                onMouseDown={!freeViewMode ? handleMouseDown : undefined}
                onWheel={!freeViewMode ? handleWheel : undefined}
                style={{ cursor: freeViewMode ? 'default' : (isDragging ? 'grabbing' : 'grab') }}
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
                     autoRotate ? 'Rotation auto - Glissez pour contrôler en 3D' : 'Contrôle 3D actif'}
                  </div>
                  {!freeViewMode && (
                    <div className="control-help">
                      <div>🖱️ Glisser : X + Y</div>
                      <div>🖲️ Molette : Z</div>
                    </div>
                  )}
                  {freeViewMode && (
                    <div className="control-help">
                      <div>🖱️ Glisser : Rotation libre</div>
                      <div>🖲️ Molette : Zoom</div>
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
                    <button 
                      className="quick-button z-rotate" 
                      onClick={() => setAvatarRotation(prev => ({...prev, z: prev.z + 15}))}
                      title="Rotation Z +15° (douce)"
                    >
                      🔵↻
                    </button>
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
                    <button 
                      className="animation-button" 
                      onClick={() => setShowAnimationControls(!showAnimationControls)}
                      title="Changer l'animation"
                    >
                      🎭 Animations
                    </button>
                  </div>
                  
                  {/* Contrôles d'animation */}
                  {showAnimationControls && (
                    <div className="animation-controls" style={{ pointerEvents: 'auto' }}>
                      <div className="animation-title">Choisir un mouvement :</div>
                      <div className="animation-grid">
                        {availableAnimations.map(anim => (
                          <button
                            key={anim.id}
                            className={`animation-option ${currentAnimation === anim.id ? 'active' : ''}`}
                            onClick={() => setCurrentAnimation(anim.id)}
                            title={anim.description}
                          >
                            {anim.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
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
                
                <group rotation={[
                  (avatarRotation.x * Math.PI) / 180,
                  (avatarRotation.y * Math.PI) / 180,
                  (avatarRotation.z * Math.PI) / 180
                ]}>
                  <Avatar 
                    scale={2} 
                    position={[0, -1.8, 0]} 
                    animationType={currentAnimation}
                    enableMovement={true}
                  />
                </group>
                <OrbitControls 
                  enableZoom={freeViewMode} 
                  enablePan={freeViewMode} 
                  enableRotate={freeViewMode}
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
              <img src="/ma photo.png" alt="Fabrice KOUADJEU" className="about-photo" />
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