import React, { useEffect } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

// Mon avatar 3D personnalisé
function Avatar({ scale = 1, position = [0, 0, 0] }) {
  // Chemin adaptatif selon l'environnement
  const modelPath = process.env.NODE_ENV === 'development' 
    ? `${process.env.PUBLIC_URL || ''}/bonjour.glb`
    : '/portfolio-3d/bonjour.glb';
    
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Je lance automatiquement toutes mes animations
    Object.keys(actions).forEach(actionName => {
      const action = actions[actionName];
      if (action) {
        action.reset().fadeIn(0.5).play();
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
  ? `${process.env.PUBLIC_URL || ''}/bonjour.glb`
  : '/portfolio-3d/bonjour.glb';
useGLTF.preload(preloadPath);

export default Avatar;