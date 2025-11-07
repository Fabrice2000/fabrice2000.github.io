import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Portfolio.css';
import './IntroPage.css';

// Mes différentes sections du portfolio
import Accueil from './sections/Accueil';
import Projets from './sections/Projets';
import Contact from './sections/Contact';
import Avatar from './Avatar';
import IntroPage from './IntroPage';

function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSection, setNextSection] = useState('');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const navigateToSection = (section) => {
    if (section === activeSection || isTransitioning) return;
    
    // Démarrer la transition
    setIsTransitioning(true);
    setNextSection(section);
    
    // Changer la section après un délai pour l'animation
    setTimeout(() => {
      setActiveSection(section);
      setNextSection('');
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  return (
    <>
      {/* Page d'introduction avec avatar qui marche */}
      {showIntro && (
        <IntroPage onIntroComplete={handleIntroComplete} />
      )}
      
      {/* Portfolio principal */}
      <div className={`portfolio-container ${showIntro ? 'hidden' : 'visible'}`}>
      {/* Barre de progression pour indiquer la section active */}
      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{
            width: activeSection === 'accueil' ? '33.33%' : 
                   activeSection === 'projets' ? '66.66%' : '100%',
            backgroundColor: activeSection === 'accueil' ? '#4CAF50' : 
                           activeSection === 'projets' ? '#2196F3' : '#FF9800'
          }}
        ></div>
      </div>
      
      <nav className="navigation">
        <div className="nav-brand">
          <div className="profile-photo">
            <img src={process.env.NODE_ENV === 'development' 
              ? `${process.env.PUBLIC_URL || ''}/photo-profile.png`
              : '/portfolio-3d/photo-profile.png'} 
              alt="Fabrice KOUADJEU" className="profile-img" />
          </div>
          <h2>Fabrice KOUADJEU</h2>
        </div>
        <div className="nav-center">
          <div className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'accueil' ? 'active' : ''} ${isTransitioning && nextSection === 'accueil' ? 'loading' : ''}`}
              onClick={() => navigateToSection('accueil')}
              disabled={isTransitioning}
            >
              Accueil
              {isTransitioning && nextSection === 'accueil' && <span className="loading-indicator"></span>}
            </button>
            <button 
              className={`nav-link ${activeSection === 'projets' ? 'active' : ''} ${isTransitioning && nextSection === 'projets' ? 'loading' : ''}`}
              onClick={() => navigateToSection('projets')}
              disabled={isTransitioning}
            >
              Projets
              {isTransitioning && nextSection === 'projets' && <span className="loading-indicator"></span>}
            </button>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''} ${isTransitioning && nextSection === 'contact' ? 'loading' : ''}`}
              onClick={() => navigateToSection('contact')}
              disabled={isTransitioning}
            >
              Contact
              {isTransitioning && nextSection === 'contact' && <span className="loading-indicator"></span>}
            </button>
          </div>
        </div>
        <div className="nav-avatar">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
            {/* Éclairage optimisé pour mon avatar 3D */}
            <ambientLight intensity={1.8} />
            <directionalLight 
              position={[0, 5, 8]} 
              intensity={3.5} 
              color="#ffffff"
            />
            <pointLight position={[4, 2, 6]} intensity={2} color="#f8f8f8" />
            <pointLight position={[-4, 2, 6]} intensity={2} color="#f8f8f8" />
            <pointLight position={[0, -3, 4]} intensity={1.5} color="#f0f0f0" />
            <directionalLight 
              position={[0, 0, -6]} 
              intensity={1.2} 
              color="#64b5f6"
            />
            <Avatar scale={1.5} position={[0, -1.2, 0]} />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate 
              autoRotateSpeed={0.2}
              enableDamping={true}
              dampingFactor={0.05}
            />
          </Canvas>
        </div>
      </nav>

      {/* Notification de transition */}
      {isTransitioning && (
        <div className="transition-notification">
          <div className="notification-content">
            <span className="loading-spinner"></span>
            <span>Chargement de {nextSection === 'accueil' ? 'l\'accueil' : 
                                  nextSection === 'projets' ? 'mes projets' : 'la page contact'}...</span>
          </div>
        </div>
      )}

      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {activeSection === 'accueil' && (
          <div className="section-wrapper fade-in">
            <Accueil onNavigate={navigateToSection} />
          </div>
        )}

        {activeSection === 'projets' && (
          <div className="section-wrapper fade-in">
            <Projets onNavigate={navigateToSection} />
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="section-wrapper fade-in">
            <Contact onNavigate={navigateToSection} />
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h4>Fabrice KOUADJEU NGATCHOU</h4>
              <p>Développeur Full-Stack • Créateur d'expériences numériques</p>
              <div className="footer-social">
                <span className="social-link">💼 LinkedIn</span>
                <span className="social-link">🐙 GitHub</span>
                <span className="social-link">📧 Email</span>
              </div>
            </div>
            <div className="footer-quick-links">
              <h5>Navigation rapide</h5>
              <button onClick={() => navigateToSection('accueil')} className="footer-link">
                Accueil
              </button>
              <button onClick={() => navigateToSection('projets')} className="footer-link">
                Projets
              </button>
              <button onClick={() => navigateToSection('contact')} className="footer-link">
                Contact
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Fabrice KOUADJEU NGATCHOU • Portfolio 3D créé avec ❤️ et React</p>
            <p className="footer-note">Tous droits réservés • Made with passion in Paris 🇫🇷</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default Portfolio;