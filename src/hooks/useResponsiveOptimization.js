import { useState, useEffect } from 'react';

// Hook pour détecter les performances et ajuster la qualité automatiquement
export const usePerformanceOptimization = () => {
  const [performanceLevel, setPerformanceLevel] = useState('medium');
  const [batteryLevel, setBatteryLevel] = useState(1);
  const [isLowPowerMode, setIsLowPowerMode] = useState(false);

  useEffect(() => {
    const detectPerformance = async () => {
      // Détection des performances basée sur plusieurs facteurs
      let score = 0;
      
      // 1. Nombre de cœurs CPU
      if (navigator.hardwareConcurrency) {
        if (navigator.hardwareConcurrency >= 8) score += 3;
        else if (navigator.hardwareConcurrency >= 4) score += 2;
        else score += 1;
      }
      
      // 2. Mémoire disponible
      if (navigator.deviceMemory) {
        if (navigator.deviceMemory >= 8) score += 3;
        else if (navigator.deviceMemory >= 4) score += 2;
        else score += 1;
      }
      
      // 3. Type de connexion
      if (navigator.connection) {
        const connection = navigator.connection;
        if (connection.effectiveType === '4g') score += 2;
        else if (connection.effectiveType === '3g') score += 1;
        
        // Mode économie de données
        if (connection.saveData) {
          score -= 2;
          setIsLowPowerMode(true);
        }
      }
      
      // 4. Type d'appareil
      const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      if (isMobile) score -= 1;
      
      // 5. Batterie
      if ('getBattery' in navigator) {
        try {
          const battery = await navigator.getBattery();
          setBatteryLevel(battery.level);
          
          if (battery.level < 0.2) {
            score -= 2;
            setIsLowPowerMode(true);
          } else if (battery.level < 0.5) {
            score -= 1;
          }
          
          if (!battery.charging && battery.level < 0.3) {
            setIsLowPowerMode(true);
          }
        } catch (error) {
          console.log('Battery API not available');
        }
      }
      
      // 6. Taille de l'écran
      const screenSize = window.innerWidth * window.innerHeight;
      if (screenSize > 2000000) score += 1; // Grand écran
      else if (screenSize < 500000) score -= 1; // Petit écran
      
      // Détermination du niveau de performance
      if (score >= 8) setPerformanceLevel('high');
      else if (score >= 5) setPerformanceLevel('medium');
      else setPerformanceLevel('low');
    };

    detectPerformance();
    
    // Réévaluation périodique
    const interval = setInterval(detectPerformance, 30000); // Toutes les 30 secondes
    
    return () => clearInterval(interval);
  }, []);

  // Configuration adaptative basée sur les performances
  const getOptimizedSettings = () => {
    const baseSettings = {
      high: {
        antialias: true,
        shadowMapEnabled: true,
        shadowMapType: 'PCFSoftShadowMap',
        toneMapping: 'ACESFilmicToneMapping',
        pixelRatio: Math.min(window.devicePixelRatio, 2),
        maxLights: 8,
        animationQuality: 'high',
        particlesEnabled: true,
        reflectionsEnabled: true
      },
      medium: {
        antialias: true,
        shadowMapEnabled: false,
        shadowMapType: 'BasicShadowMap',
        toneMapping: 'LinearToneMapping',
        pixelRatio: Math.min(window.devicePixelRatio, 1.5),
        maxLights: 5,
        animationQuality: 'medium',
        particlesEnabled: false,
        reflectionsEnabled: false
      },
      low: {
        antialias: false,
        shadowMapEnabled: false,
        shadowMapType: null,
        toneMapping: 'NoToneMapping',
        pixelRatio: 1,
        maxLights: 3,
        animationQuality: 'low',
        particlesEnabled: false,
        reflectionsEnabled: false
      }
    };

    let settings = baseSettings[performanceLevel];
    
    // Ajustements supplémentaires pour mode économie
    if (isLowPowerMode) {
      settings = {
        ...settings,
        antialias: false,
        shadowMapEnabled: false,
        pixelRatio: 1,
        maxLights: 2,
        animationQuality: 'low',
        particlesEnabled: false,
        reflectionsEnabled: false
      };
    }
    
    return settings;
  };

  return {
    performanceLevel,
    batteryLevel,
    isLowPowerMode,
    settings: getOptimizedSettings()
  };
};

// Hook pour la responsivité avancée
export const useAdvancedResponsive = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    type: 'desktop',
    screenSize: 'large',
    orientation: 'landscape',
    hasTouch: false,
    hasHover: true,
    hasPointer: true
  });

  useEffect(() => {
    const updateDeviceInfo = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const hasHover = window.matchMedia('(hover: hover)').matches;
      const hasPointer = window.matchMedia('(pointer: fine)').matches;
      
      // Type d'appareil
      let type;
      if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
        if (width < 768) type = 'mobile';
        else type = 'tablet';
      } else {
        type = 'desktop';
      }
      
      // Taille d'écran
      let screenSize;
      if (width < 576) screenSize = 'xs';
      else if (width < 768) screenSize = 'sm';
      else if (width < 992) screenSize = 'md';
      else if (width < 1200) screenSize = 'lg';
      else if (width < 1400) screenSize = 'xl';
      else screenSize = 'xxl';
      
      // Orientation
      const orientation = width > height ? 'landscape' : 'portrait';
      
      setDeviceInfo({
        type,
        screenSize,
        orientation,
        hasTouch,
        hasHover,
        hasPointer,
        width,
        height,
        ratio: width / height
      });
    };

    updateDeviceInfo();
    
    window.addEventListener('resize', updateDeviceInfo);
    window.addEventListener('orientationchange', updateDeviceInfo);
    
    return () => {
      window.removeEventListener('resize', updateDeviceInfo);
      window.removeEventListener('orientationchange', updateDeviceInfo);
    };
  }, []);

  return deviceInfo;
};

// Hook pour les paramètres d'accessibilité
export const useAccessibilitySettings = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    reducedMotion: false,
    highContrast: false,
    largeText: false,
    focusVisible: true
  });

  useEffect(() => {
    // Détection des préférences d'accessibilité
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const highContrast = window.matchMedia('(prefers-contrast: high)').matches;
    const largeText = window.matchMedia('(prefers-reduced-data: reduce)').matches;
    
    setAccessibilitySettings({
      reducedMotion,
      highContrast,
      largeText,
      focusVisible: true
    });
    
    // Écoute des changements
    const motionMediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const contrastMediaQuery = window.matchMedia('(prefers-contrast: high)');
    
    const handleMotionChange = (e) => {
      setAccessibilitySettings(prev => ({ ...prev, reducedMotion: e.matches }));
    };
    
    const handleContrastChange = (e) => {
      setAccessibilitySettings(prev => ({ ...prev, highContrast: e.matches }));
    };
    
    motionMediaQuery.addListener(handleMotionChange);
    contrastMediaQuery.addListener(handleContrastChange);
    
    return () => {
      motionMediaQuery.removeListener(handleMotionChange);
      contrastMediaQuery.removeListener(handleContrastChange);
    };
  }, []);

  return accessibilitySettings;
};

export default {
  usePerformanceOptimization,
  useAdvancedResponsive,
  useAccessibilitySettings
};