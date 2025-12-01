import React, { Suspense, lazy } from 'react';
import './styles/global.css';

// Je charge le Portfolio en lazy pour optimiser le chargement initial
const Portfolio = lazy(() => import('./components/Portfolio'));

// Mon écran de chargement pendant que tout se met en place
const LoadingFallback = () => (
  <div style={{ 
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center', 
    height: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    fontSize: '18px'
  }}>
    <div>Chargement...</div>
  </div>
);

function App() {
  return (
    <div className="App">
      <Suspense fallback={<LoadingFallback />}>
        <Portfolio />
      </Suspense>
    </div>
  );
}

export default App;