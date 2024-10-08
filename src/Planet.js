import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import { Line } from '@react-three/drei';
import Moon from './Moons';

const Planet = ({
  name,
  size,
  textureUrl,
  eccentricity,
  inclination,
  sma,
  speed,
  raan,
  tau,
  hasRings,
  moons,
}) => {
  const meshRef = useRef();
  const angleRef = useRef(tau);
  const texture = useLoader(TextureLoader, textureUrl);

  useFrame(() => {
    if (meshRef.current) {
      angleRef.current += speed;
      const x = sma * (Math.cos(angleRef.current) - eccentricity);
      const y = Math.sin(angleRef.current) * 0.1;
      const z = sma * Math.sqrt(1 - eccentricity ** 2) * Math.sin(angleRef.current); 
      meshRef.current.position.set(x, y, z);
    }
  });

  const orbitPoints = useMemo(() => {
    const points = [];
    const segments = 100;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      const x = sma * (Math.cos(angle) - eccentricity); 
      const y = Math.sin(angle) * 0.1; 
      const z = sma * Math.sqrt(1 - eccentricity ** 2) * Math.sin(angle);
      points.push([x, y, z]);
    }
    return points;
  }, [eccentricity, sma]);

  return (
    <group rotation={[inclination * (Math.PI / 180), raan * (Math.PI / 180), 0]}>
      <Line points={orbitPoints} color="#3f3f46" lineWidth={1} />
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
      {moons.map((moon, index) => (
          <Moon
            key={index}
            moon={moon}
            planetPosition={meshRef.current ? meshRef.current.position : null}
            planetEccentricity={eccentricity}
            planetSma={sma}
            planetSpeed={speed}
          />
        ))}
    </group>
  );
};

export default Planet;
