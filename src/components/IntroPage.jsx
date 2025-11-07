import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Avatar from './Avatar'; // Avatar de fallback

// Préchargement du modèle
const modelPath = process.env.NODE_ENV === 'development' 
  ? `${process.env.PUBLIC_URL || ''}/marche.glb`
  : '/portfolio-3d/marche.glb';

// Précharger le modèle au chargement du module
useGLTF.preload(modelPath);

// Composant Avatar qui marche pour l'intro
const WalkingAvatar = ({ scale = 2, position = [0, -2, 0] }) => {
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
    // Animation du texte de chargement
    const textInterval = setInterval(() => {
      setLoadingText(prev => {
        if (prev === 'Chargement...') return 'Chargement';
        return prev + '.';
      });
    }, 500);

    // Progression du chargement
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setTimeout(onIntroComplete, 500);
          return 100;
        }
        return prev + 5;
      });
    }, 200);

    return () => {
      clearInterval(textInterval);
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
        
        {/* Éléments décoratifs animés */}
        <div className="decorative-elements">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
          <div className="floating-shape shape-4"></div>
        </div>
      </div>

      {/* Avatar qui marche */}
      <div className="intro-avatar-container">
        <Suspense fallback={<div className="loading-avatar">Chargement de l'avatar...</div>}>
          <Canvas 
            camera={{ position: [0, 0, 8], fov: 50 }}
            style={{ width: '100%', height: '60vh' }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={2} 
              color="#ffffff"
            />
            <pointLight position={[-5, 5, 5]} intensity={1.5} color="#64b5f6" />
            
            <WalkingAvatar scale={2.5} position={[0, -2.5, 0]} />
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
          Développeur Full-Stack & Créateur d'expériences numériques
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

        {/* Éléments d'interface supplémentaires */}
        <div className="intro-features">
          <div className="feature-item">
            <span className="feature-icon">🚀</span>
            <span className="feature-text">Performance</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎨</span>
            <span className="feature-text">Design</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Innovation</span>
          </div>
        </div>
      </div>

      {/* Indication pour passer l'intro */}
      {progress === 100 && (
        <div className="skip-hint">
          <p>Préparation du portfolio...</p>
          <div className="loading-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      )}

      {/* Vague animée en bas */}
      <div className="intro-wave">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </div>
  );
};

// Préchargement des modèles
useGLTF.preload(modelPath);

export default IntroPage;