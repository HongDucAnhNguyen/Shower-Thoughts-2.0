import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
// import { useNavigate } from "react-router-dom";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import roboto from "./Poppins_Bold.json";
extend({ TextGeometry });
const user = JSON.parse(localStorage.getItem("profile"));
const Text = () => {
  const [isHovering, setIsHovering] = useState(false);
  useEffect(() => {
    document.body.style.cursor = isHovering ? "pointer" : "auto";
  }, [isHovering]);
  const font = new FontLoader().parse(roboto);
  return (
    <mesh
      position={[-2.2, 0, -2]}
      onClick={() => {
        if (user) {
          window.location.replace("/home");
        } else {
          window.location.replace("/auth");
        }
      }}
      onPointerOver={() => setIsHovering(true)}
      onPointerOut={() => setIsHovering(false)}
    >
      <textGeometry
        args={["Shower Thoughts 2.0", { font, size: 0.3, height: 0.3 }]}
      />
      <meshPhysicalMaterial attach="material" color={"yellow"} />
    </mesh>
  );
};
const LandingPage = () => {
  return (
    <>
      <Canvas>
        <OrbitControls />
        <Stars />
        <ambientLight intensity={0.7} />
        <spotLight position={[10, 15, 10]} angle={0.3} />
        <Text />
      </Canvas>
    </>
  );
};

export default LandingPage;
