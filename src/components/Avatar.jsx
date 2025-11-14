import React, { useEffect, useRef, useMemo } from 'react';
import { useGLTF, useAnimations } from '@react-three/drei';

const Avatar = React.memo(({ scale = 1, position = [0, 0, 0], animationType = 'marche', onAnimationChange, onError }) => {
  const groupRef = useRef();
  
  // Mapping des animations vers les fichiers GLB
  const modelPath = useMemo(() => {
    const animationFiles = {
      'marche': 'marche en ronde.glb',
      'bonjour': 'bonjour.glb',
      'rumba': 'rumba.glb',
      'hiphop': 'hiphop.glb'
    };
    
    const file = animationFiles[animationType] || 'marche en ronde.glb';
    
    return process.env.NODE_ENV === 'development' 
      ? `${process.env.PUBLIC_URL || ''}/${file}`
      : `/${file}`;
  }, [animationType]);

  console.log('🎬 Loading avatar model:', modelPath, 'for animation:', animationType);

  const gltf = useGLTF(modelPath);
  const { actions } = useAnimations(gltf.animations, gltf.scene);

  useEffect(() => {
    console.log('🎯 Actions available:', actions ? Object.keys(actions) : 'none');
    
    if (!actions) {
      return;
    }

    try {
      // Arrêter toutes les animations
      Object.values(actions).forEach(action => {
        if (action) {
          action.stop();
        }
      });

      // Lancer toutes les animations du modèle
      Object.keys(actions).forEach(actionName => {
        const action = actions[actionName];
        if (action) {
          console.log('▶️ Playing animation:', actionName);
          action.reset()
            .fadeIn(0.5)
            .play();
          action.timeScale = animationType === 'marche' ? 1.2 : 1.0;
        }
      });
    } catch (error) {
      console.error('❌ Animation error:', error);
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