// App.js
import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import Planet from "./Planet"; // Uncomment if you are using planets

function App() {
  const planets = [
    { name: "Mercury", size: 0.3, textureUrl: "/planets/mercury.jpg", distance: 2, speed: 0.03, hasRings: false },
    { name: "Venus", size: 0.5, textureUrl: "/planets/venus.jpg", distance: 3, speed: 0.02, hasRings: false },
    { name: "Earth", size: 0.6, textureUrl: "/planets/earth.jpg", distance: 4, speed: 0.017, hasRings: false },
    { name: "Mars", size: 0.4, textureUrl: "/planets/mars.jpg", distance: 5, speed: 0.015, hasRings: false },
    { name: "Jupiter", size: 1.2, textureUrl: "/planets/jupiter.jpg", distance: 7, speed: 0.01, hasRings: false },
    { name: "Saturn", size: 1.0, textureUrl: "/planets/saturn.jpg", distance: 9, speed: 0.008, hasRings: true },
    { name: "Uranus", size: 0.7, textureUrl: "/planets/uranus.jpg", distance: 11, speed: 0.006, hasRings: true },
    { name: "Neptune", size: 0.7, textureUrl: "/planets/neptune.jpg", distance: 13, speed: 0.005, hasRings: false },
  ];

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        {/* Ambient and point lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Sun */}
        <Sun />

        {/* Planets */}
        {planets.map((planet, index) => (
          <Planet
            key={index}
            size={planet.size}
            textureUrl={planet.textureUrl}
            distance={planet.distance}
            speed={planet.speed}
            hasRings={planet.hasRings}
          />
        ))}

        {/* Stars in the background */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        <EffectComposer>
          <Bloom intensity={1.5}/>
        </EffectComposer>

        {/* Enable camera controls */}
        <OrbitControls />
      </Canvas>
    </div>
  );
}

export default App;