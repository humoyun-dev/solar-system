// Sun.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Sun = () => {
  const sunRef = useRef();

  // Load your sun texture, add error handling
  const texture = useLoader(TextureLoader, '/planets/sun.jpg', (texture) => {
    console.log('Texture loaded successfully:', texture);
  }, (error) => {
    console.error('Error loading texture:', error);
  });

  // Rotate the sun for a dynamic effect
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005; // Slowly rotate the sun
    }
  });

  return (
    <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          map={texture} // Apply the texture to the sun
          color="#ffffff" // Set to white to lighten the texture
          transparent={false} // Ensure it is not transparent
          opacity={1} // Full opacity
        />
      </mesh>
    </>
  );
};

export default Sun;
