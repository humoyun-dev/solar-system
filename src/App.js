// src/App.js
import React, { useRef, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import Planet from "./Planet";
import { EffectComposer, Bloom } from '@react-three/postprocessing';

function App() {
  const controlsRef = useRef();
  const cameraRef = useRef();

  // Planets data
  const planets = [
    {
      name: "Mercury",
      size: 0.3,
      textureUrl: "/planets/mercury.jpg",
      distance: 3,
      speed: 0.03 / 10,
      hasRings: false,
      moons: [],
    },
    {
      name: "Venus",
      size: 0.5,
      textureUrl: "/planets/venus.jpg",
      distance: 5,
      speed: 0.02 / 10,
      hasRings: false,
      moons: [],
    },
    {
      name: "Earth",
      size: 0.6,
      textureUrl: "/planets/earth.jpg",
      distance: 6,
      speed: 0.017 / 10,
      hasRings: false,
      moons: [{ name: "Moon", size: 0.1, distance: 0.8, speed: 0.1 / 10 }],
    },
    {
      name: "Mars",
      size: 0.4,
      textureUrl: "/planets/mars.jpg",
      distance: 8,
      speed: 0.015 / 10,
      hasRings: false,
      moons: [
        { name: "Phobos", size: 0.05, distance: 0.6, speed: 0.2 / 10 },
        { name: "Deimos", size: 0.04, distance: 0.8, speed: 0.1 / 10 },
      ],
    },
    {
      name: "Jupiter",
      size: 1.2,
      textureUrl: "/planets/jupiter.jpg",
      distance: 9,
      speed: 0.01 / 10,
      hasRings: false,
      moons: [
        { name: "Io", size: 0.1, distance: 0.8, speed: 0.1 / 10 },
        { name: "Europa", size: 0.1, distance: 0.9, speed: 0.1 / 10 },
        { name: "Ganymede", size: 0.12, distance: 1.1, speed: 0.1 / 10 },
        { name: "Callisto", size: 0.11, distance: 1.3, speed: 0.1 / 10 },
      ],
    },
    {
      name: "Saturn",
      size: 1.0,
      textureUrl: "/planets/saturn.jpg",
      distance: 11,
      speed: 0.008 / 10,
      hasRings: true,
      moons: [
        { name: "Titan", size: 0.1, distance: 1.2, speed: 0.1 / 10 },
        { name: "Rhea", size: 0.08, distance: 1.4, speed: 0.1 / 10 },
        { name: "Enceladus", size: 0.06, distance: 1.5, speed: 0.1 / 10 },
        { name: "Tethys", size: 0.07, distance: 1.3, speed: 0.1 / 10 },
      ],
    },
    {
      name: "Uranus",
      size: 0.7,
      textureUrl: "/planets/uranus.jpg",
      distance: 16,
      speed: 0.006 / 10,
      hasRings: true,
      moons: [
        { name: "Titania", size: 0.08, distance: 1.1, speed: 0.1 / 10 },
        { name: "Oberon", size: 0.08, distance: 1.3, speed: 0.1 / 10 },
        { name: "Umbriel", size: 0.07, distance: 1.2, speed: 0.1 / 10 },
        { name: "Ariel", size: 0.07, distance: 1.4, speed: 0.1 / 10 },
      ],
    },
    {
      name: "Neptune",
      size: 0.7,
      textureUrl: "/planets/neptune.jpg",
      distance: 15,
      speed: 0.005 / 10,
      hasRings: false,
      moons: [{ name: "Triton", size: 0.09, distance: 1.2, speed: 0.1 / 10 }],
    },
  ];

  // Handle zoom with mouse wheel
  const handleMouseWheel = (event) => {
    event.preventDefault(); // Prevent default scroll behavior
    if (cameraRef.current) {
      const zoomSpeed = 0.5; // Adjust zoom speed
      const delta = event.deltaY > 0 ? zoomSpeed : -zoomSpeed; // Determine zoom direction
      cameraRef.current.position.z += delta; // Update camera position
    }
  };

  useEffect(() => {
    // Set up event listener for mouse wheel
    window.addEventListener("wheel", handleMouseWheel, { passive: false });

    return () => {
      // Clean up event listener on unmount
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, []);

  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        {/* Ambient and point lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        {/* Sun */}
        <Sun />

        {/* Render planets */}
        {planets.map((planet, index) => (
          <Planet
            key={index}
            name={planet.name}
            size={planet.size}
            textureUrl={planet.textureUrl}
            distance={planet.distance}
            speed={planet.speed}
            moons={planet.moons}
          />
        ))}

        {/* Stars */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />

        {/* Post-processing effects */}
        <EffectComposer>
          <Bloom intensity={1.5} />
        </EffectComposer>

        {/* Orbit controls */}
        <OrbitControls ref={controlsRef} />
      </Canvas>
    </div>
  );
}

export default App;