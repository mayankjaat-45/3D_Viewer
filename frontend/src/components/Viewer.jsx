import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Viewer({ modelUrl }) {
  if (!modelUrl) return null;

  return (
    <Canvas camera={{ position: [0, 1, 3] }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} />

      {/* ✅ FULL URL ONLY */}
      <Model url={modelUrl} />

      <OrbitControls />
    </Canvas>
  );
}
