import React, { useEffect, useState } from 'react';
import { useGLTF, useAnimations, useFBX } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';

// Mon avatar 3D personnalisé avec animations dynamiques
function Avatar({ 
  scale = 1, 
  position = [0, 0, 0], 
  animationType = 'bonjour',
  enableMovement = false 
}) {
  const [currentAnimation, setCurrentAnimation] = useState(animationType);
  const [breathingOffset, setBreathingOffset] = useState(0);
  
  // Chargement du modèle principal
  const { scene, animations } = useGLTF('/bonjour.glb');
  const { actions } = useAnimations(animations, scene);

  // Chargement des animations FBX supplémentaires
  const prayingFBX = useFBX('/Praying.fbx');
  const rumbaDancingFBX = useFBX('/Rumba Dancing.fbx');
  const marcheHeureux = useFBX('/marche heureux.fbx');
  const marcheLent = useFBX('/marche lent.fbx');
  const marcheRapide = useFBX('/marche rapide.fbx');
  const marcheArriere = useFBX('/marche en regardant en arriere.fbx');
  const marcheCercle = useFBX('/marche cercle.fbx');

  // Effet de respiration naturelle
  useFrame((state) => {
    if (enableMovement) {
      const time = state.clock.getElapsedTime();
      setBreathingOffset(Math.sin(time * 2) * 0.02); // Respiration douce
    }
  });

  useEffect(() => {
    // Gestion des animations selon le type choisi
    Object.keys(actions).forEach(actionName => {
      actions[actionName]?.stop();
    });

    switch (currentAnimation) {
      case 'bonjour':
      case 'default':
        // Animation de base (salut)
        Object.keys(actions).forEach(actionName => {
          const action = actions[actionName];
          if (action) {
            action.reset().fadeIn(0.5).play();
          }
        });
        break;
      
      case 'praying':
        // Animation de prière - plus calme et respectueuse
        if (actions['bonjour']) {
          actions['bonjour'].fadeOut(0.3);
        }
        break;
        
      case 'dancing':
        // Animation de danse - énergique et joyeuse
        if (actions['bonjour']) {
          actions['bonjour'].fadeOut(0.3);
        }
        break;
        
      case 'walking-happy':
        // Marche joyeuse
        if (actions['bonjour']) {
          actions['bonjour'].fadeOut(0.3);
        }
        break;
        
      case 'walking-slow':
        // Marche lente et réfléchie
        if (actions['bonjour']) {
          actions['bonjour'].fadeOut(0.3);
        }
        break;
        
      case 'walking-fast':
        // Marche rapide et déterminée
        if (actions['bonjour']) {
          actions['bonjour'].fadeOut(0.3);
        }
        break;
        
      default:
        // Retour à l'animation par défaut
        Object.keys(actions).forEach(actionName => {
          const action = actions[actionName];
          if (action) {
            action.reset().fadeIn(0.5).play();
          }
        });
    }
  }, [actions, currentAnimation]);

  // Mise à jour de l'animation quand le prop change
  useEffect(() => {
    setCurrentAnimation(animationType);
  }, [animationType]);

  return (
    <primitive 
      object={scene} 
      scale={scale} 
      position={[
        position[0], 
        position[1] + breathingOffset, 
        position[2]
      ]}
    />
  );
}

export default Avatar;