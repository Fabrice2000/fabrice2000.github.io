import React from 'react';

const ModelLoader = ({ isLoading, error, children }) => {
  if (error) {
    return (
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshBasicMaterial color="red" />
      </mesh>
    );
  }

  if (isLoading) {
    return (
      <mesh>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshBasicMaterial color="gray" wireframe />
      </mesh>
    );
  }

  return children;
};

export default ModelLoader;