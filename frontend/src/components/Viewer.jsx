import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

const Model = ({ url, wireframe }) => {
  const { scene } = useGLTF(modelUrl);
  scene.traverse((child) => {
    if (child.isMesh) {
      child.material.wireframe = wireframe;
    }
  });
  return <primitive object={scene} scale={1.5} />;
};

const Viewer = ({ modelUrl, bgColor, wireframe }) => {
  if (!modelUrl) return <p>No model loaded</p>;

  return (
    <Canvas
      style={{ height: "500px", background: bgColor }}
      camera={{ position: [0, 2, 5] }}
    >
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <Model url={modelUrl} wireframe={wireframe} />
      <OrbitControls enablePan enableZoom enableRotate />
    </Canvas>
  );
};

export default Viewer;
