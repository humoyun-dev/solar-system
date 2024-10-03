// Sun.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Sun = () => {
  const sunRef = useRef();

  const texture = useLoader(TextureLoader, '/planets/sun.jpg', (texture) => {
    console.log('Texture loaded successfully:', texture);
  }, (error) => {
    console.error('Error loading texture:', error);
  });

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005;
    }
  });

  return (
    <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          color="#ffffff" 
          transparent={false}
          opacity={1}
        />
      </mesh>
    </>
  );
};

export default Sun;
