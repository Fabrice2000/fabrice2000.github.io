import { useState, useEffect } from 'react';
import { useGLTF } from '@react-three/drei';

// Hook pour le chargement lazy des modèles 3D
export const useLazyModel = (modelPath, shouldLoad = true) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const result = shouldLoad ? useGLTF(modelPath) : { scene: null, animations: [] };

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      setIsLoading(true);
      // Simulation du chargement progressif
      const loadTimeout = setTimeout(() => {
        setIsLoaded(true);
        setIsLoading(false);
      }, 100);

      return () => clearTimeout(loadTimeout);
    }
  }, [shouldLoad, isLoaded]);

  return {
    ...result,
    isLoaded: shouldLoad ? isLoaded : false,
    isLoading: shouldLoad ? isLoading : false
  };
};

// Préchargement intelligent des modèles
export const preloadCriticalModels = () => {
  // Charger seulement les modèles essentiels
  const criticalModels = ['marche en ronde.glb', 'bonjour.glb'];
  
  criticalModels.forEach(model => {
    const path = process.env.NODE_ENV === 'development' 
      ? `${process.env.PUBLIC_URL || ''}/${model}`
      : `/${model}`;
    
    // Précharger avec un délai pour éviter le blocage
    setTimeout(() => {
      useGLTF.preload(path);
    }, Math.random() * 2000); // Étalement sur 2 secondes
  });
};