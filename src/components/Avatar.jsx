import React, { useEffect, useRef } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

// Mon avatar 3D personnalisé avec animations interactives
function Avatar({ scale = 1, position = [0, 0, 0], animationType = 'marche', onAnimationChange }) {
  const groupRef = useRef();
  
  // Modèles disponibles avec leurs chemins
  const getModelPath = (type) => {
    const models = {
      'marche': 'marche en ronde.glb',
      'bonjour': 'bonjour.glb',
      'rumba': 'rumba.glb',
      'hiphop': 'hiphop.glb'
    };
    
    const modelFile = models[type] || models.marche;
    return process.env.NODE_ENV === 'development' 
      ? `${process.env.PUBLIC_URL || ''}/${modelFile}`
      : `/portfolio-3d/${modelFile}`;
  };

  const modelPath = getModelPath(animationType);
  const { scene, animations } = useGLTF(modelPath);
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    // Délai réduit pour une transition plus fluide
    const transitionDelay = setTimeout(() => {
      // Arrêter toutes les animations précédentes rapidement
      Object.values(actions).forEach(action => {
        if (action && action.isRunning()) {
          action.fadeOut(0.1);
        }
      });

      // Délai pour permettre le fade-out
      setTimeout(() => {
        // Configuration des animations selon le type
        console.log(`🎭 Chargement animation: ${animationType}`, Object.keys(actions));
        
        Object.keys(actions).forEach(actionName => {
          const action = actions[actionName];
          if (action) {
            // Configuration selon le type d'animation
            if (animationType === 'bonjour') {
              // Animation de salut - jouer une fois puis revenir à la marche
              action.reset()
                .setLoop(2200, 1) // Jouer une fois
                .fadeIn(0.15) // Fade-in stable
                .play();
              action.timeScale = 1.2; // Plus rapide
              
              // Retour automatique à la marche après l'animation de bonjour
              action.getMixer().addEventListener('finished', () => {
                if (onAnimationChange) {
                  setTimeout(() => onAnimationChange('marche'), 500); // Réduit de 1000ms à 500ms
                }
              });
            } else if (animationType === 'marche') {
              // Animation de marche en boucle
              action.reset()
                .setLoop(2201, 1) // Boucle infinie
                .fadeIn(0.15) // Fade-in stable
                .play();
              action.timeScale = 1.4; // Plus rapide
            } else {
              // Animation rumba, hiphop ou autres - en boucle
              action.reset()
                .setLoop(2201, 1)
                .fadeIn(0.15) // Fade-in stable
                .play();
              action.timeScale = 1.2; // Plus rapide
            }
          }
        });
      }, 120); // Petit délai pour le fade-out
    }, 50); // Délai initial réduit

    return () => clearTimeout(transitionDelay);
  }, [actions, animationType, onAnimationChange]);

  return (
    <group ref={groupRef}>
      <primitive 
        object={scene} 
        scale={scale} 
        position={position}
        visible={true}
      />
    </group>
  );
}

// Préchargement des modèles
const preloadModels = () => {
  const models = ['marche en ronde.glb', 'bonjour.glb', 'marche.glb'];
  models.forEach(model => {
    const path = process.env.NODE_ENV === 'development' 
      ? `${process.env.PUBLIC_URL || ''}/${model}`
      : `/portfolio-3d/${model}`;
    useGLTF.preload(path);
  });
};

preloadModels();

export default Avatar;