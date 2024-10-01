// Sun.js
import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const Sun = () => {
  const sunRef = useRef();

  // Rotate the sun for a dynamic effect
  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.005; // Slowly rotate the sun
    }
  });

  return (
    <>
      <mesh ref={sunRef}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          color="yellow"
          emissive="yellow"
          emissiveIntensity={1.5}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.2, 64, 64]} />
        <meshBasicMaterial
          color="#ffcc00"
          transparent
          opacity={0.4}
          depthWrite={false}
        />
      </mesh>
    </>
  );
};

export default Sun;