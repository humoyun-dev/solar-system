// Moons.js
import React, { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';

const Moon = ({ moon, planetPosition }) => {
  const moonRef = useRef();
  const angleRef = useRef(0);
  const texture = useLoader(TextureLoader, '/planets/moon.jpg'); // Use your moon texture

  useFrame(() => {
    if (moonRef.current && planetPosition) {
      angleRef.current += moon.speed; // Update moon angle
      const moonDistance = moon.distance; // Use distance from the planet
      const x = planetPosition.x + moonDistance * Math.cos(angleRef.current);
      const z = planetPosition.z + moonDistance * Math.sin(angleRef.current);
      const y = Math.sin(angleRef.current) * 0.1; // Optional: adjust for height effect

      moonRef.current.position.set(x, y, z);
    }
  });

  return (
    <mesh ref={moonRef}>
      <sphereGeometry args={[moon.size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
};

export default Moon;
