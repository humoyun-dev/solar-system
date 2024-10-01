// Planet.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Planet = ({ size, textureUrl, distance, speed, hasRings }) => {
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2); // Random initial position

  // Load the planet texture
  const texture = useLoader(TextureLoader, textureUrl);

  // Rotate the planet around the "Sun"
  useFrame(() => {
    if (meshRef.current) {
      angleRef.current += speed;
      meshRef.current.position.x = Math.cos(angleRef.current) * distance;
      meshRef.current.position.z = Math.sin(angleRef.current) * distance;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[size, 64, 64]} />
      {texture ? (
        <meshStandardMaterial map={texture} />
      ) : (
        <meshStandardMaterial color="gray" /> // Fallback color if texture fails to load
      )}

      {/* Add rings for planets like Saturn */}
      {hasRings && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
          <meshBasicMaterial color="#b1976b" side={2} transparent opacity={0.7} />
        </mesh>
      )}
    </mesh>
  );
};

export default Planet;