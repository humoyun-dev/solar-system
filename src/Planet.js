// Planet.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Planet = ({ name, size, textureUrl, distance, speed, hasRings, moons }) => {
  const meshRef = useRef();
  const angleRef = useRef(Math.random() * Math.PI * 2);

  // Load the planet texture
  const texture = useLoader(TextureLoader, textureUrl);

  // Rotate the planet around the "Sun"
  useFrame(() => {
    if (meshRef.current) { // Check if meshRef.current is defined
      angleRef.current += speed;
      meshRef.current.position.x = Math.cos(angleRef.current) * distance;
      meshRef.current.position.z = Math.sin(angleRef.current) * distance;
    }
  });

  return (
    <group>
      {/* Main planet mesh */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[size, 64, 64]} />
        <meshStandardMaterial map={texture} />
        {hasRings && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[size * 1.2, size * 1.8, 64]} />
            <meshBasicMaterial color="#b1976b" side={2} transparent opacity={0.7} />
          </mesh>
        )}
      </mesh>

      {moons && moons.map((moon, index) => (
        <Moon key={index} moon={moon} planetPosition={meshRef.current ? meshRef.current.position : null} />
      ))}
    </group>
  );
};

// Moon component
const Moon = ({ moon, planetPosition }) => {
  const moonRef = useRef();
  const moonAngleRef = useRef(Math.random() * Math.PI * 2);

  useFrame(() => {
    if (moonRef.current && planetPosition) { // Check if moonRef.current and planetPosition are defined
      moonAngleRef.current += moon.speed;
      const moonX = Math.cos(moonAngleRef.current) * moon.distance + planetPosition.x; // Add planet's position
      const moonZ = Math.sin(moonAngleRef.current) * moon.distance + planetPosition.z; // Add planet's position
      moonRef.current.position.set(moonX, 0, moonZ);
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[moon.size, 32, 32]} />
      <meshStandardMaterial color="gray" />
    </mesh>
  );
};

export default Planet;