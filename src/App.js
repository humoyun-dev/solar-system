import React, { useRef, useEffect, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import Sun from "./Sun";
import Planet from "./Planet";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { planets } from "./data";

function App() {
  const controlsRef = useRef();
  const cameraRef = useRef();

  const handleMouseWheel = useCallback((event) => {
    event.preventDefault(); 
    if (cameraRef.current) {
      const zoomSpeed = 0.5; 
      cameraRef.current.position.z += event.deltaY > 0 ? zoomSpeed : -zoomSpeed;
    }
  }, []);

  useEffect(() => {
    window.addEventListener("wheel", handleMouseWheel, { passive: false });
    return () => {
      window.removeEventListener("wheel", handleMouseWheel);
    };
  }, [handleMouseWheel]);


  return (
    <div style={{ height: "100vh", backgroundColor: "#000" }}>
      <Canvas camera={{ position: [0, 0, 30], fov: 60 }}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Sun />

        {planets.map((planet, index) => (
          <React.Fragment key={index}>
            <Planet
              name={planet.name}
              size={planet.size}
              textureUrl={planet.textureUrl}
              eccentricity={planet.eccentricity}
              inclination={planet.inclination}
              sma={planet.distance}
              speed={planet.speed}
              raan={planet.raan}
              tau={planet.tau}
              hasRings={planet.hasRings}
              moons={planet.moons}
            />
          </React.Fragment>
        ))}

        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
          saturation={0}
          fade
        />
        <EffectComposer>
          <Bloom intensity={1.5} />
        </EffectComposer>
        <OrbitControls ref={controlsRef} />
      </Canvas>
    </div>
  );
}

export default App;
