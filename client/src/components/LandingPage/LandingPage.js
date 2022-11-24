import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
// import { useNavigate } from "react-router-dom";
import { extend } from "@react-three/fiber";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import roboto from "./Poppins_Bold.json";
extend({ TextGeometry });
// const Box = () => {
//   //   const navigate = useNavigate();
//   return (
//     <mesh onClick={() => window.location.replace("/auth")} position={[0, -2, 0]}>
//       <boxBufferGeometry attach="geometry" />
//       <meshLambertMaterial attach="material" color="darkgray" />
//     </mesh>
//   );
// };
const Text = () => {
  const font = new FontLoader().parse(roboto);
  return (
    <mesh
      position={[-2.2, 0, -2]}
    >
      <textGeometry
        args={['Shower Thoughts 2.0', { font, size: 0.3, height: 0.3 }]}
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
        {/* <Box /> */}
      </Canvas>
    </>
  );
};

export default LandingPage;
