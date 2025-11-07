import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import './Portfolio.css';
import './IntroPage.css';
import './Responsive.css';

// Mes différentes sections du portfolio
import Accueil from './sections/Accueil';
import Projets from './sections/Projets';
import Contact from './sections/Contact';
import Avatar from './Avatar';
import IntroPage from './IntroPage';

// Hook personnalisé pour la responsivité avancée
const useResponsiveAvatar = () => {
  const [screenSize, setScreenSize] = useState('desktop');
  const [deviceType, setDeviceType] = useState('desktop');
  
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      // const height = window.innerHeight; // Commenté car non utilisé actuellement
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isTablet = width >= 768 && width <= 1024;
      
      // Détection du type d'appareil
      if (isMobile && width < 768) {
        setDeviceType('mobile');
      } else if (isTablet || (width >= 768 && width <= 1024)) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
      
      // Classification par taille d'écran
      if (width >= 1400) setScreenSize('xl');
      else if (width >= 1200) setScreenSize('desktop');
      else if (width >= 992) setScreenSize('laptop');
      else if (width >= 768) setScreenSize('tablet');
      else if (width >= 576) setScreenSize('mobile-lg');
      else setScreenSize('mobile-sm');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    window.addEventListener('orientationchange', updateScreenSize);
    
    return () => {
      window.removeEventListener('resize', updateScreenSize);
      window.removeEventListener('orientationchange', updateScreenSize);
    };
  }, []);
  
  // Configuration responsive optimisée pour l'avatar
  const avatarConfig = {
    xl: { 
      fov: 45, 
      scale: 1.8, 
      position: [0, -1.3, 0],
      quality: 'high',
      enableShadows: true
    },
    desktop: { 
      fov: 45, 
      scale: 1.6, 
      position: [0, -1.2, 0],
      quality: 'high',
      enableShadows: true
    },
    laptop: { 
      fov: 48, 
      scale: 1.5, 
      position: [0, -1.1, 0],
      quality: 'medium',
      enableShadows: true
    },
    tablet: { 
      fov: 50, 
      scale: 1.4, 
      position: [0, -1.0, 0],
      quality: 'medium',
      enableShadows: false
    },
    'mobile-lg': { 
      fov: 55, 
      scale: 1.3, 
      position: [0, -0.9, 0],
      quality: 'low',
      enableShadows: false
    },
    'mobile-sm': { 
      fov: 60, 
      scale: 1.2, 
      position: [0, -0.8, 0],
      quality: 'low',
      enableShadows: false
    }
  };
  
  return { 
    config: avatarConfig[screenSize], 
    screenSize, 
    deviceType,
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet'
  };
};

function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextSection, setNextSection] = useState('');
  
  const { config: avatarConfig, isMobile } = useResponsiveAvatar();

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
          <Canvas 
            camera={{ position: [0, 0, 5], fov: avatarConfig.fov }}
            gl={{ 
              antialias: !isMobile, 
              alpha: true,
              powerPreference: isMobile ? "low-power" : "high-performance"
            }}
            shadows={avatarConfig.enableShadows}
            dpr={isMobile ? 1 : Math.min(window.devicePixelRatio, 2)}
          >
            {/* Éclairage optimisé selon la qualité */}
            <ambientLight intensity={isMobile ? 1.5 : 1.8} />
            <directionalLight 
              position={[0, 5, 8]} 
              intensity={isMobile ? 2.5 : 3.5} 
              color="#ffffff"
              castShadow={avatarConfig.enableShadows}
            />
            {!isMobile && (
              <>
                <pointLight position={[4, 2, 6]} intensity={2} color="#f8f8f8" />
                <pointLight position={[-4, 2, 6]} intensity={2} color="#f8f8f8" />
                <pointLight position={[0, -3, 4]} intensity={1.5} color="#f0f0f0" />
                <directionalLight 
                  position={[0, 0, -6]} 
                  intensity={1.2} 
                  color="#64b5f6"
                />
              </>
            )}
            <Avatar 
              scale={avatarConfig.scale} 
              position={avatarConfig.position} 
            />
            <OrbitControls 
              enableZoom={false} 
              enablePan={false} 
              autoRotate={!isMobile} 
              autoRotateSpeed={isMobile ? 0.1 : 0.2}
              enableDamping={true}
              dampingFactor={isMobile ? 0.1 : 0.05}
              maxPolarAngle={Math.PI / 1.8}
              minPolarAngle={Math.PI / 3}
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