/**
 * Hook personnalisé pour l'optimisation responsive du portfolio 3D
 * Gère les breakpoints, les performances et les interactions tactiles
 */

import { useState, useEffect, useCallback } from 'react';

// Breakpoints responsive
const BREAKPOINTS = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400
};

// Configuration responsive pour les différents composants
const RESPONSIVE_CONFIG = {
  avatar: {
    xs: { fov: 65, scale: 1.1, position: [0, -0.8, 0], autoRotateSpeed: 0.1 },
    sm: { fov: 60, scale: 1.2, position: [0, -0.9, 0], autoRotateSpeed: 0.15 },
    md: { fov: 55, scale: 1.3, position: [0, -1.0, 0], autoRotateSpeed: 0.2 },
    lg: { fov: 50, scale: 1.4, position: [0, -1.1, 0], autoRotateSpeed: 0.25 },
    xl: { fov: 45, scale: 1.5, position: [0, -1.2, 0], autoRotateSpeed: 0.3 },
    xxl: { fov: 40, scale: 1.6, position: [0, -1.3, 0], autoRotateSpeed: 0.3 }
  },
  navigation: {
    xs: { avatarSize: 40, brandFontSize: '12px', linkPadding: '4px 8px' },
    sm: { avatarSize: 50, brandFontSize: '14px', linkPadding: '6px 12px' },
    md: { avatarSize: 60, brandFontSize: '16px', linkPadding: '8px 16px' },
    lg: { avatarSize: 70, brandFontSize: '18px', linkPadding: '10px 20px' },
    xl: { avatarSize: 80, brandFontSize: '20px', linkPadding: '12px 24px' },
    xxl: { avatarSize: 90, brandFontSize: '24px', linkPadding: '14px 28px' }
  },
  content: {
    xs: { containerPadding: '8px', sectionPadding: '16px 8px' },
    sm: { containerPadding: '16px', sectionPadding: '32px 16px' },
    md: { containerPadding: '24px', sectionPadding: '48px 24px' },
    lg: { containerPadding: '32px', sectionPadding: '64px 32px' },
    xl: { containerPadding: '40px', sectionPadding: '80px 40px' },
    xxl: { containerPadding: '48px', sectionPadding: '96px 48px' }
  }
};

/**
 * Hook principal pour la responsivité
 */
export const useResponsiveOptimization = () => {
  const [screenSize, setScreenSize] = useState('lg');
  const [windowDimensions, setWindowDimensions] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1200,
    height: typeof window !== 'undefined' ? window.innerHeight : 800
  });
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [orientation, setOrientation] = useState('portrait');

  // Fonction pour déterminer la taille d'écran
  const getScreenSize = useCallback((width) => {
    if (width >= BREAKPOINTS.xxl) return 'xxl';
    if (width >= BREAKPOINTS.xl) return 'xl';
    if (width >= BREAKPOINTS.lg) return 'lg';
    if (width >= BREAKPOINTS.md) return 'md';
    if (width >= BREAKPOINTS.sm) return 'sm';
    return 'xs';
  }, []);

  // Fonction pour détecter le type d'appareil
  const detectDeviceType = useCallback((width, height) => {
    const isMobileDevice = width < BREAKPOINTS.md;
    const isTabletDevice = width >= BREAKPOINTS.md && width < BREAKPOINTS.lg;
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    const deviceOrientation = width > height ? 'landscape' : 'portrait';

    setIsMobile(isMobileDevice);
    setIsTablet(isTabletDevice);
    setIsTouch(isTouchDevice);
    setOrientation(deviceOrientation);
  }, []);

  // Gestionnaire de redimensionnement avec debounce
  const handleResize = useCallback(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    
    setWindowDimensions({ width, height });
    setScreenSize(getScreenSize(width));
    detectDeviceType(width, height);
  }, [getScreenSize, detectDeviceType]);

  // Debounce pour optimiser les performances
  const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Effect pour l'initialisation et l'écoute des événements
  useEffect(() => {
    const debouncedHandleResize = debounce(handleResize, 150);
    
    // Initialisation
    handleResize();

    // Écoute des événements
    window.addEventListener('resize', debouncedHandleResize);
    window.addEventListener('orientationchange', debouncedHandleResize);

    // Nettoyage
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
      window.removeEventListener('orientationchange', debouncedHandleResize);
    };
  }, [handleResize]);

  // Configurations responsives
  const avatarConfig = RESPONSIVE_CONFIG.avatar[screenSize];
  const navigationConfig = RESPONSIVE_CONFIG.navigation[screenSize];
  const contentConfig = RESPONSIVE_CONFIG.content[screenSize];

  return {
    // État du viewport
    screenSize,
    windowDimensions,
    isMobile,
    isTablet,
    isTouch,
    orientation,
    
    // Configurations
    avatarConfig,
    navigationConfig,
    contentConfig,
    
    // Utilitaires
    breakpoints: BREAKPOINTS,
    isScreenSize: (size) => screenSize === size,
    isMinWidth: (breakpoint) => windowDimensions.width >= BREAKPOINTS[breakpoint],
    isMaxWidth: (breakpoint) => windowDimensions.width < BREAKPOINTS[breakpoint]
  };
};

/**
 * Hook pour optimiser les performances sur mobile
 */
export const usePerformanceOptimization = () => {
  const { isMobile, isTouch } = useResponsiveOptimization();
  const [shouldReduceAnimations, setShouldReduceAnimations] = useState(false);
  const [shouldOptimizeRendering, setShouldOptimizeRendering] = useState(false);

  useEffect(() => {
    // Détection des préférences de mouvement réduit
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Optimisations basées sur l'appareil
    setShouldReduceAnimations(isMobile || prefersReducedMotion);
    setShouldOptimizeRendering(isMobile);
    
    // ⚡ Optimisation scroll performance
    if (isMobile) {
      // Optimiser les événements de scroll sur mobile
      document.documentElement.style.scrollBehavior = 'smooth';
      document.body.style.overscrollBehavior = 'contain';
      document.body.style.webkitOverflowScrolling = 'touch';
    }
  }, [isMobile]);

  return {
    shouldReduceAnimations,
    shouldOptimizeRendering,
    optimizedProps: {
      // Props optimisées pour Three.js
      pixelRatio: isMobile ? Math.min(window.devicePixelRatio, 2) : window.devicePixelRatio,
      antialias: !isMobile,
      shadowMap: !isMobile,
      powerPreference: isMobile ? 'low-power' : 'high-performance'
    }
  };
};

/**
 * Hook pour la gestion des interactions tactiles
 */
export const useTouchOptimization = () => {
  const { isTouch, isMobile } = useResponsiveOptimization();
  const [touchSupport, setTouchSupport] = useState({
    hasTouch: false,
    hasHover: true,
    hasPinchZoom: false
  });

  useEffect(() => {
    const hasTouch = isTouch;
    const hasHover = !isMobile && window.matchMedia('(hover: hover)').matches;
    const hasPinchZoom = hasTouch && 'ontouchstart' in window;

    setTouchSupport({
      hasTouch,
      hasHover,
      hasPinchZoom
    });

    // Désactiver le zoom pinch sur mobile si nécessaire
    if (isMobile) {
      const viewport = document.querySelector('meta[name="viewport"]');
      if (viewport) {
        viewport.setAttribute('content', 
          'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        );
      }
    }
  }, [isTouch, isMobile]);

  return touchSupport;
};

/**
 * Hook pour l'optimisation des images responsives
 */
export const useImageOptimization = () => {
  const { screenSize, windowDimensions } = useResponsiveOptimization();
  
  const getOptimizedImageSize = useCallback((baseWidth) => {
    const scale = {
      xs: 0.5,
      sm: 0.6,
      md: 0.7,
      lg: 0.8,
      xl: 0.9,
      xxl: 1.0
    }[screenSize] || 1.0;

    return Math.round(baseWidth * scale);
  }, [screenSize]);

  const getImageSrcSet = useCallback((basePath, sizes = [400, 800, 1200, 1600]) => {
    return sizes.map(size => `${basePath}?w=${size} ${size}w`).join(', ');
  }, []);

  return {
    getOptimizedImageSize,
    getImageSrcSet,
    shouldLazyLoad: windowDimensions.width < BREAKPOINTS.lg
  };
};

/**
 * Hook pour la gestion responsive de la navigation
 */
export const useResponsiveNavigation = () => {
  const { screenSize, isMobile } = useResponsiveOptimization();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [navVariant, setNavVariant] = useState('desktop');

  useEffect(() => {
    if (isMobile) {
      setNavVariant('mobile');
    } else {
      setNavVariant('desktop');
      setIsNavOpen(false); // Fermer le menu mobile sur desktop
    }
  }, [isMobile]);

  const toggleNav = useCallback(() => {
    setIsNavOpen(prev => !prev);
  }, []);

  const closeNav = useCallback(() => {
    setIsNavOpen(false);
  }, []);

  return {
    isNavOpen,
    navVariant,
    toggleNav,
    closeNav,
    shouldShowMobileMenu: isMobile && isNavOpen
  };
};

/**
 * Hook pour la validation de compatibilité WebGL
 */
export const useWebGLCompatibility = () => {
  const [webGLSupport, setWebGLSupport] = useState({
    isSupported: true,
    version: null,
    extensions: []
  });

  useEffect(() => {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (gl) {
      const version = gl.getParameter(gl.VERSION);
      const extensions = gl.getSupportedExtensions() || [];
      
      setWebGLSupport({
        isSupported: true,
        version,
        extensions
      });
    } else {
      setWebGLSupport({
        isSupported: false,
        version: null,
        extensions: []
      });
    }

    // Nettoyage
    canvas.remove();
  }, []);

  return webGLSupport;
};

/**
 * Hook pour l'optimisation du scroll
 */
export const useScrollOptimization = () => {
  const { isMobile, isTouch } = useResponsiveOptimization();
  const [isScrolling, setIsScrolling] = useState(false);
  const [scrollDirection, setScrollDirection] = useState('down');
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    let scrollTimer = null;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;
          
          // Détection direction scroll
          if (currentScrollY > lastScrollY) {
            setScrollDirection('down');
          } else if (currentScrollY < lastScrollY) {
            setScrollDirection('up');
          }
          
          setLastScrollY(currentScrollY);
          setIsScrolling(true);
          
          // Réinitialiser l'état de scroll après 150ms
          clearTimeout(scrollTimer);
          scrollTimer = setTimeout(() => {
            setIsScrolling(false);
          }, 150);
          
          ticking = false;
        });
        ticking = true;
      }
    };

    // Optimisation des événements de scroll
    const scrollOptions = { passive: true };
    window.addEventListener('scroll', handleScroll, scrollOptions);
    
    // Configuration optimisée selon l'appareil
    if (isMobile) {
      // Optimisations mobiles spéciales
      document.body.style.overscrollBehaviorY = 'contain';
      document.documentElement.style.scrollBehavior = 'smooth';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll, scrollOptions);
      clearTimeout(scrollTimer);
    };
  }, [lastScrollY, isMobile]);

  const scrollToSection = useCallback((elementId, offset = 0) => {
    const element = document.getElementById(elementId);
    if (element) {
      const elementPosition = element.offsetTop - offset;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  return {
    isScrolling,
    scrollDirection,
    scrollToSection,
    scrollToTop,
    lastScrollY
  };
};

// Export du hook principal avec des utilitaires
export default {
  useResponsiveOptimization,
  usePerformanceOptimization,
  useTouchOptimization,
  useImageOptimization,
  useResponsiveNavigation,
  useWebGLCompatibility,
  useScrollOptimization,
  BREAKPOINTS,
  RESPONSIVE_CONFIG
};
