import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Avatar = React.memo(({ scale = 1, position = [0, 0, 0], animationType = 'marche', onAnimationChange, onError }) => {
  const groupRef = useRef();
  
  // Je mappe chaque type d'animation à son fichier GLB
  const modelPath = useMemo(() => {
    const animationFiles = {
      'marche': 'marche en ronde.glb',
      'bonjour': 'bonjour.glb',
      'rumba': 'rumba.glb',
      'hiphop': 'hiphop.glb'
    };
    
    const file = animationFiles[animationType] || 'marche en ronde.glb';
    
    // Je gère les chemins différemment en dev et en prod
    return process.env.NODE_ENV === 'development' 
      ? `${process.env.PUBLIC_URL || ''}/${file}`
      : `/${file}`;
  }, [animationType]);

  console.log('🎬 Je charge le modèle:', modelPath, 'pour l\'animation:', animationType);

  const gltf = useGLTF(modelPath);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    console.log('🎯 Actions disponibles:', actions ? Object.keys(actions) : 'aucune');
    
    if (!actions) {
      return;
    }

    try {
      // J'arrête d'abord toutes les animations en cours
      Object.values(actions).forEach(action => {
        if (action) {
          action.stop();
        }
      });

      // Puis je lance toutes les animations du modèle
      Object.keys(actions).forEach(actionName => {
        const action = actions[actionName];
        if (action) {
          console.log('▶️ Je lance l\'animation:', actionName);
          action.reset()
            .fadeIn(0.5)
            .play();
          // J'accélère un peu la marche pour que ce soit plus dynamique
          action.timeScale = animationType === 'marche' ? 1.2 : 1.0;
        }
      });
    } catch (error) {
      console.error('❌ Erreur d\'animation:', error);
      if (onError) onError(error);
    }

  }, [actions, animationType, onError]);

  useEffect(() => {
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => {
          if (action) {
            action.stop();
          }
        });
      }
    };
  }, [actions]);

  if (!gltf || !gltf.scene) {
    console.error('❌ Avatar loading error: No scene available for', modelPath);
    if (onError) onError(new Error('Failed to load avatar model'));
    return null;
  }

  console.log('✅ Avatar loaded successfully:', modelPath);

  return (
    <group ref={groupRef}>
      <primitive 
        object={gltf.scene} 
        scale={scale} 
        position={position}
      />
    </group>
  );
});

// Précharger tous les modèles
['marche en ronde.glb', 'bonjour.glb', 'rumba.glb', 'hiphop.glb'].forEach(file => {
  const path = process.env.NODE_ENV === 'development' 
    ? `${process.env.PUBLIC_URL || ''}/${file}`
    : `/${file}`;
  console.log('🔄 Preloading:', path);
  useGLTF.preload(path);
});

export default Avatar;