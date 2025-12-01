import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import Avatar from './Avatar';

// Je précharge le modèle 3D pour qu'il soit dispo rapidement
const modelPath = process.env.NODE_ENV === 'development'
  ? `${process.env.PUBLIC_URL || ''}/ouvertureavatar.glb`
  : '/ouvertureavatar.glb';

useGLTF.preload(modelPath);

// Mon avatar d'intro avec animation
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
        action.timeScale = 1.2; // J'ai accéléré un peu l'animation
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
    // Si le modèle charge pas, je bascule sur l'avatar de base
    return (
      <group position={position} scale={scale}>
        <Avatar />
      </group>
    );
  }

  return <primitive object={gltf.scene} scale={scale} position={position} />;
};

const IntroPage = ({ onIntroComplete }) => {
  const [loadingText] = useState('Chargement');
  const [progress, setProgress] = useState(0);

  useEffect(() => {

    // Ma barre de progression - j'ai fait en sorte que ce soit rapide (2.6s max)
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onIntroComplete, 300);
          return 100;
        }
        return prev + 10; // J'incrémente de 10 pour que ça aille vite
      });
    }, 130); // 130ms entre chaque update

    return () => {
      clearInterval(progressInterval);
    };
  }, [onIntroComplete]);

  return (
    <div className="intro-page">
      {/* Mon fond avec des particules qui flottent */}
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

      {/* L'avatar qui apparaît en premier */}
      <div className="intro-avatar-container">
        <Suspense fallback={<div className="loading-avatar"></div>}>
          <Canvas 
            camera={{ position: [0, 4, 10], fov: 85 }}
            style={{ width: '100%', height: '50vh' }}
          >
            <ambientLight intensity={1.5} />
            <directionalLight 
              position={[5, 10, 5]} 
              intensity={2} 
              color="#ffffff"
            />
            <pointLight position={[-5, 5, 5]} intensity={1.5} color="#64b5f6" />
            
            <OpeningAvatar scale={3} position={[0, -0.2, -1.5]} />
          </Canvas>
        </Suspense>
      </div>
      {/* Texte de bienvenue avec animations complètes */}
      <div className="intro-content">
        <h1 className="intro-title">
          Bonjour !
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