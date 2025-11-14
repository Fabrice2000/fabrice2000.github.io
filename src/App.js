import React, { Suspense, lazy } from 'react';
import './components/GlobalStyles.css';

// Chargement lazy du composant principal pour réduire le bundle initial
const Portfolio = lazy(() => import('./components/Portfolio'));

// Composant de fallback pendant le chargement
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
    <div>Chargement du portfolio...</div>
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