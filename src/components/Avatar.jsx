import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

// Mon avatar 3D personnalisé
function Avatar({ scale = 1, position = [0, 0, 0] }) {
  // Chemin adaptatif selon l'environnement
  const modelPath = process.env.NODE_ENV === 'development' 
    ? `${process.env.PUBLIC_URL || ''}/marche en ronde.glb`
    : '/portfolio-3d/marche en ronde.glb';
    
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Configuration spéciale pour l'animation de marche en rond
    console.log('🎭 Animations disponibles:', Object.keys(actions));
    
    Object.keys(actions).forEach(actionName => {
      const action = actions[actionName];
      if (action) {
        // Configuration optimale pour la marche en rond
        action.reset()
          .setLoop(2201, 1) // Boucle infinie
          .fadeIn(0.5)
          .play();
        
        // Ajustement de la vitesse pour une marche plus naturelle
        action.timeScale = 1.2;
      }
    });
  }, [actions]);

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={position}
    />
  );
}

// Préchargement du modèle
const preloadPath = process.env.NODE_ENV === 'development' 
  ? `${process.env.PUBLIC_URL || ''}/marche en ronde.glb`
  : '/portfolio-3d/marche en ronde.glb';
useGLTF.preload(preloadPath);

export default Avatar;