import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useRef, useEffect } from "react";

// Fit camera to model
function FitCamera({ model, controlsRef }) {
  const { camera } = useThree();

  useEffect(() => {
    if (!model || !controlsRef.current) return;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    const fov = camera.fov * (Math.PI / 180);
    const cameraZ = Math.abs(maxDim / (2 * Math.tan(fov / 2))) * 1.5;

    camera.position.set(center.x, center.y, cameraZ);
    camera.lookAt(center);

    controlsRef.current.target.copy(center);
    controlsRef.current.update();
  }, [model, camera, controlsRef]);

  return null;
}

function Model({ url, wireframe, setModelRef }) {
  const { scene } = useGLTF(url);

  useEffect(() => {
    scene.traverse((obj) => {
      if (obj.isMesh) obj.material.wireframe = wireframe;
    });
    setModelRef(scene);
  }, [scene, wireframe, setModelRef]);

  return <primitive object={scene} />;
}

export default function Viewer({ modelUrl, bgColor, wireframe, setReset }) {
  const modelRef = useRef(null);
  const controlsRef = useRef();

  useEffect(() => {
    setReset(() => () => {
      if (controlsRef.current) controlsRef.current.reset();
    });
  }, [setReset]);

  return (
    <Canvas style={{ width: "100%", height: "100%", background: bgColor }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1} />

      {modelUrl && (
        <>
          <Model
            url={modelUrl}
            wireframe={wireframe}
            setModelRef={(m) => (modelRef.current = m)}
          />
          <FitCamera model={modelRef.current} controlsRef={controlsRef} />
        </>
      )}

      <OrbitControls ref={controlsRef} enableDamping />
    </Canvas>
  );
}
