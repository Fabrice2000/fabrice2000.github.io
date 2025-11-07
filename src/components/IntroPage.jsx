import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Avatar from './Avatar'; // Avatar de fallback

// Préchargement du modèle
const modelPath = process.env.NODE_ENV === 'development' 
  ? `${process.env.PUBLIC_URL || ''}/ouvertureavatar.glb`
  : '/portfolio-3d/ouvertureavatar.glb';

// Précharger le modèle au chargement du module
useGLTF.preload(modelPath);

// Composant Avatar d'ouverture pour l'intro
const OpeningAvatar = ({ scale = 2, position = [0, -1.2, 0] }) => {
  const gltf = useGLTF(modelPath);
  const { actions } = useAnimations(gltf.animations, gltf.scene);
  
  useEffect(() => {
    if (actions) {
      const actionNames = Object.keys(actions);
      if (actionNames.length > 0) {
        const action = actions[actionNames[0]];
        action.reset();
        action.setLoop(true, Infinity);
        action.timeScale = 1.2;
        action.play();
      }
    }

    return () => {
      if (actions) {
        Object.values(actions).forEach(action => action.stop());
      }
    };
  }, [actions]);

  if (!gltf?.scene) {
    // Fallback vers l'avatar de base si le modèle ne charge pas
    return (
      <group position={position} scale={scale}>
        <Avatar />
      </group>
    );
  }

  return <primitive object={gltf.scene} scale={scale} position={position} />;
};

const IntroPage = ({ onIntroComplete }) => {
  const [loadingText, setLoadingText] = useState('Chargement');
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    // Progression du chargement
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onIntroComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => {
      clearInterval(progressInterval);
    };
  }, [onIntroComplete]);

  return (
    <div className="intro-page">
      {/* Fond blanc avec particules flottantes */}
      <div className="intro-background">
        <div className="floating-particles">
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Avatar d'ouverture - PREMIER ÉLÉMENT */}
      <div className="intro-avatar-container">
        <Suspense fallback={<div className="loading-avatar"></div>}>
          <Canvas 
            camera={{ position: [0, 0, 6], fov: 75 }}
            style={{ width: '100%', height: '60vh' }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={2} 
              color="#ffffff"
            />
            <pointLight position={[-5, 5, 5]} intensity={1.5} color="#64b5f6" />
            
            <OpeningAvatar scale={2.5} position={[0, -0.5, -2]} />
          </Canvas>
        </Suspense>
      </div>

      {/* Texte de bienvenue avec animations complètes */}
      <div className="intro-content">
        <h1 className="intro-title">
          <span className="wave">👋</span> Bonjour !
        </h1>
        <h2 className="intro-subtitle">
          Je suis Fabrice KOUADJEU
        </h2>
        <p className="intro-description">
          Soyez le bienvenu dans mon univers.
        </p>
        
        {/* Barre de progression avec animations */}
        <div className="loading-container">
          <div className="loading-bar">
            <div 
              className="loading-fill"
              style={{ width: `${progress}%` }}
            ></div>
            <div className="loading-glow"></div>
          </div>
          <p className="loading-text">{loadingText}</p>
          <p className="loading-percentage">{Math.round(progress)}%</p>
        </div>

      </div>
    </div>
  );
};

// Préchargement des modèles
useGLTF.preload(modelPath);

export default IntroPage;