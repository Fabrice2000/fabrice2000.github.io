import React, { useState, useEffect, Suspense, lazy, memo } from 'react';
import { useScrollOptimization } from '../hooks/useResponsiveOptimization';

// Chargement lazy des sections pour réduire le bundle initial
const Accueil = lazy(() => import('./sections/Accueil'));
const Projets = lazy(() => import('./sections/Projets'));
const Contact = lazy(() => import('./sections/Contact'));
const IntroPage = lazy(() => import('./IntroPage'));

// Composant de fallback pour les sections - Seulement pour IntroPage
const SectionLoader = memo(() => (
  <div style={{ 
    padding: '2rem', 
    textAlign: 'center', 
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '10px',
    margin: '1rem 0'
  }}>
    <div>Chargement...</div>
  </div>
));

function Portfolio() {
  const [showIntro, setShowIntro] = useState(true);
  const [activeSection, setActiveSection] = useState('accueil');
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Hook d'optimisation scroll ultra-rapide
  useScrollOptimization();

  // Optimisation scroll performance
  useEffect(() => {
    // Optimisation du scroll pour de meilleures performances
    const optimizeScroll = () => {
      // Activer le smooth scrolling
      document.documentElement.style.scrollBehavior = 'smooth';
      
      // Optimiser les events de scroll
      let ticking = false;
      const updateScroll = () => {
        ticking = false;
      };
      
      const requestTick = () => {
        if (!ticking) {
          requestAnimationFrame(updateScroll);
          ticking = true;
        }
      };
      
      // Throttle scroll events pour performance
      window.addEventListener('scroll', requestTick, { passive: true });
      
      return () => {
        window.removeEventListener('scroll', requestTick);
      };
    };
    
    const cleanup = optimizeScroll();
    return cleanup;
  }, []);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const navigateToSection = (section) => {
    if (section === activeSection || isTransitioning) return;
    
    // Démarrer la transition plus rapide
    setIsTransitioning(true);
    
    // Changer la section après un délai réduit pour l'animation
    setTimeout(() => {
      setActiveSection(section);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 50); // Réduit de 100ms à 50ms
    }, 150); // Réduit de 300ms à 150ms
  };

  return (
    <>
      {/* Page d'introduction avec avatar qui marche */}
      {showIntro && (
        <Suspense fallback={<SectionLoader />}>
          <IntroPage onIntroComplete={handleIntroComplete} />
        </Suspense>
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
              ? `${process.env.PUBLIC_URL || ''}/photo-profile.jpg`
              : '/photo-profile.jpg'} 
              alt="Fabrice KOUADJEU" className="profile-img" />
          </div>
          <h2>Fabrice KOUADJEU</h2>
        </div>
        <div className="nav-center">
          <div className="nav-links">
            <button 
              className={`nav-link ${activeSection === 'accueil' ? 'active' : ''}`}
              onClick={() => navigateToSection('accueil')}
              disabled={isTransitioning}
            >
              Accueil
            </button>
            <button 
              className={`nav-link ${activeSection === 'projets' ? 'active' : ''}`}
              onClick={() => navigateToSection('projets')}
              disabled={isTransitioning}
            >
              Projets
            </button>
            <button 
              className={`nav-link ${activeSection === 'contact' ? 'active' : ''}`}
              onClick={() => navigateToSection('contact')}
              disabled={isTransitioning}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      <div className={`page-content ${isTransitioning ? 'transitioning' : ''}`}>
        {activeSection === 'accueil' && (
          <div className="section-wrapper fade-in">
            <Suspense fallback={null}>
              <Accueil onNavigate={navigateToSection} />
            </Suspense>
          </div>
        )}

        {activeSection === 'projets' && (
          <div className="section-wrapper fade-in">
            <Suspense fallback={null}>
              <Projets onNavigate={navigateToSection} />
            </Suspense>
          </div>
        )}

        {activeSection === 'contact' && (
          <div className="section-wrapper fade-in">
            <Suspense fallback={null}>
              <Contact onNavigate={navigateToSection} />
            </Suspense>
          </div>
        )}
      </div>

      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-info">
              <h4>Fabrice KOUADJEU NGATCHOU</h4>
              <p>Alternant Développeur Fullstack • Master ESTIAM Paris</p>
              <div className="footer-social">
                <a 
                  href="https://www.linkedin.com/in/fabrice-kouadjeu-ngatchou-9a7477299" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  LinkedIn
                </a>
                <a 
                  href="https://github.com/Fabrice2000" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="social-link"
                >
                  GitHub
                </a>
                <a 
                  href="mailto:kouadjeu_fabrice@yahoo.com?subject=Contact%20depuis%20votre%20portfolio&body=Bonjour%20Fabrice%2C%0A%0AJe%20vous%20contacte%20suite%20à%20la%20consultation%20de%20votre%20portfolio.%0A%0A" 
                  className="social-link"
                >
                  Email
                </a>
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
              <button onClick={() => navigateToSection('competences')} className="footer-link">
                Compétences
              </button>
              <button onClick={() => navigateToSection('contact')} className="footer-link">
                Contact
              </button>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2025 Fabrice KOUADJEU NGATCHOU </p>
            <p className="footer-note">Tous droits réservés</p>
          </div>
        </div>
      </footer>
      </div>
    </>
  );
}

export default Portfolio;