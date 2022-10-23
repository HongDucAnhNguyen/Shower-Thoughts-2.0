import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
// import { useNavigate } from "react-router-dom";


const Box = () => {
  
  //   const navigate = useNavigate();
  return (
    <mesh onClick={() => window.location.replace("/home")}>
      <boxBufferGeometry attach="geometry" />
      <meshLambertMaterial attach="material" color="darkgray" />
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
        <Box />
      </Canvas>
    </>
  );
};

export default LandingPage;
