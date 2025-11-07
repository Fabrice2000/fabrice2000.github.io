import React, { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Avatar from './Avatar'; // Avatar de fallback

// Composant Avatar qui marche pour l'intro
function WalkingAvatar({ scale = 2, position = [0, -2, 0] }) {
  const [hasError, setHasError] = useState(false);
  
  // Les hooks doivent toujours être appelés en dehors de tout bloc conditionnel
  const gltf = useGLTF('/marche.glb');
  const { actions, mixer } = useAnimations(gltf.animations, gltf.scene);
  
  useEffect(() => {
    if (!gltf || !gltf.scene) {
      console.log('🔄 Modèle non chargé, attente...');
      return;
    }

    try {
      console.log('🎬 Chargement de marche.glb...');
      console.log('Animations disponibles:', gltf.animations?.length || 0);
      console.log('Scene disponible:', !!gltf.scene);
      
      if (gltf.animations && gltf.animations.length > 0) {
        console.log('🎭 Animations détectées dans le modèle!');
        
        if (actions && Object.keys(actions).length > 0) {
          const actionNames = Object.keys(actions);
          console.log('Actions disponibles:', actionNames);
          
          const actionName = actionNames[0];
          const action = actions[actionName];
          
          console.log(`🚀 Démarrage de l'animation: ${actionName}`);
          
          // Configuration de l'animation
          action.reset();
          action.setLoop(true, Infinity);
          action.timeScale = 1.2; // Un peu plus rapide
          action.play();
          
          console.log('✅ Animation lancée avec succès!');
        } else {
          console.log('⚠️ Actions non disponibles, tentative avec le mixer...');
          
          if (mixer && gltf.animations[0]) {
            const clip = gltf.animations[0];
            const action = mixer.clipAction(clip);
            action.setLoop(true, Infinity);
            action.play();
            console.log('✅ Animation lancée via mixer!');
          }
        }
      } else {
        console.log('⚠️ Aucune animation trouvée dans le modèle');
        setHasError(true);
      }
    } catch (error) {
      console.log('❌ Erreur lors de la lecture de l\'animation:', error);
      setHasError(true);
    }

    return () => {
      // Nettoyer les actions
      if (actions) {
        Object.values(actions).forEach(action => {
          if (action) {
            action.stop();
          }
        });
      }
    };
  }, [actions, gltf, mixer]);

  // Si erreur ou pas de modèle, utiliser l'avatar de base
  if (hasError || !gltf?.scene) {
    return (
      <group position={position} scale={scale}>
        <Avatar />
      </group>
    );
  }

  // Utiliser le modèle de marche
  return <primitive object={gltf.scene} scale={scale} position={position} />;
}

const IntroPage = React.memo(({ onIntroComplete }) => {
  const [loadingText, setLoadingText] = useState('Chargement');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Animation du texte de chargement moins fréquente
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Chargement...') return 'Chargement';
        return prev + '.';
      });
    }, 800);

    // Animation de la barre de progression plus fluide
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          // Délai avant de passer au portfolio
          setTimeout(() => {
            onIntroComplete();
          }, 800);
          return 100;
        }
        return prev + 3;
      });
    }, 150);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onIntroComplete]);

  return (
    <div className="intro-page">
      {/* Fond blanc avec subtiles particules */}
      <div className="intro-background">
        <div className="floating-particles">
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `4s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Avatar qui marche */}
      <div className="intro-avatar-container">
        <Canvas 
          camera={{ position: [0, 0, 8], fov: 50 }}
          style={{ width: '100%', height: '60vh' }}
          gl={{ antialias: false, powerPreference: "high-performance" }}
          performance={{ min: 0.8 }}
        >
          {/* Éclairage optimisé */}
          <ambientLight intensity={2} />
          <directionalLight 
            position={[5, 10, 5]} 
            intensity={3} 
            color="#ffffff"
          />
          <pointLight position={[0, -2, 3]} intensity={1.5} color="#ffffff" />
          
          <WalkingAvatar scale={2.5} position={[0, -2.5, 0]} />
        </Canvas>
      </div>

      {/* Texte de bienvenue */}
      <div className="intro-content">
        <h1 className="intro-title">
          <span className="wave">👋</span> Bonjour !
        </h1>
        <h2 className="intro-subtitle">
          Je suis Fabrice KOUADJEU
        </h2>
        <p className="intro-description">
          Développeur Full-Stack & Créateur d'expériences numériques
        </p>
        
        {/* Barre de progression */}
        <div className="loading-container">
          <div className="loading-bar">
            <div 
              className="loading-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="loading-text">{loadingText}</p>
          <p className="loading-percentage">{Math.round(progress)}%</p>
        </div>
      </div>

      {/* Indication discrète pour passer */}
      {progress === 100 && (
        <div className="skip-hint">
          <p>Préparation du portfolio...</p>
        </div>
      )}
    </div>
  );
});

// Préchargement des modèles
useGLTF.preload('/marche.glb');

export default IntroPage;