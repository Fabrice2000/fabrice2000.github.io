import React, { useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Avatar from './Avatar'; // Avatar de fallback

// Préchargement du modèle
const modelPath = process.env.NODE_ENV === 'development' 
  ? `${process.env.PUBLIC_URL || ''}/marche.glb`
  : '/portfolio-3d/marche.glb';

// Précharger le modèle au chargement du module
useGLTF.preload(modelPath);

// Composant Avatar optimisé qui marche pour l'intro
const WalkingAvatar = React.memo(({ scale = 2, position = [0, -2, 0] }) => {
  const [hasError, setHasError] = useState(false);
  
  // Utiliser le chemin pré-défini
  const gltf = useGLTF(modelPath);
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  
  // Mémoriser la configuration de l'animation
  const animationConfig = useMemo(() => ({
    timeScale: 1.2,
    loop: true
  }), []);
  
  useEffect(() => {
    if (!gltf?.scene || !actions) return;

    try {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        const action = actions[actionNames[0]];
        action.reset();
        action.setLoop(true, Infinity);
        action.timeScale = animationConfig.timeScale;
        action.play();
      }
    } catch (error) {
      setHasError(true);
    }

    return () => {
      Object.values(actions).forEach(action => action?.stop());
    };
  }, [actions, gltf, animationConfig]);

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
});

const IntroPage = React.memo(({ onIntroComplete }) => {
  const [loadingText, setLoadingText] = useState('Chargement');
  const [progress, setProgress] = useState(0);

  // Optimisation du chargement pour une entrée plus rapide
  const progressConfig = useMemo(() => ({
    textSpeed: 600,
    progressSpeed: 80,
    increment: 8,
    finalDelay: 400
  }), []);

  useEffect(() => {
    const textInterval = setInterval(() => {
      setLoadingText(prev => prev === 'Chargement...' ? 'Chargement' : prev + '.');
    }, progressConfig.textSpeed);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onIntroComplete, progressConfig.finalDelay);
          return 100;
        }
        return prev + progressConfig.increment;
      });
    }, progressConfig.progressSpeed);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, [onIntroComplete, progressConfig]);

  return (
    <div className="intro-page">
      {/* Fond blanc avec subtiles particules */}
      <div className="intro-background">
        <div className="floating-particles">
          {[...Array(4)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${(i + 1) * 20}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `3s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Avatar qui marche */}
      <div className="intro-avatar-container">
        <Suspense fallback={null}>
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ width: '100%', height: '60vh' }}
            gl={{ 
              antialias: false, 
              powerPreference: "high-performance",
              alpha: false,
              stencil: false,
              depth: false
            }}
            performance={{ min: 0.5, max: 1 }}
            frameloop="demand"
          >
            {/* Éclairage simplifié pour de meilleures performances */}
            <ambientLight intensity={1.8} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={2.5} 
              color="#ffffff"
            />
            
            <WalkingAvatar scale={2.5} position={[0, -2.5, 0]} />
          </Canvas>
        </Suspense>
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
const preloadPath = process.env.NODE_ENV === 'development' 
  ? `${process.env.PUBLIC_URL || ''}/marche.glb`
  : '/portfolio-3d/marche.glb';
useGLTF.preload(preloadPath);

export default IntroPage;