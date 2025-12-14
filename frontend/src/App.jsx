import { useState, useEffect } from "react";
import Viewer from "./components/Viewer";
import Controls from "./components/Controls";
import { fetchSettingsApi } from "./api";

export default function App() {
  const [modelUrl, setModelUrl] = useState(null);
  const [bgColor, setBgColor] = useState("#0f172a");
  const [wireframe, setWireframe] = useState(false);
  const [resetCamera, setResetCamera] = useState(() => () => {});

  // Fetch last saved settings on load
  useEffect(() => {
    const loadSettings = async () => {
      try {
        const settings = await fetchSettingsApi();
        if (!settings) return;
        if (settings.modelUrl) setModelUrl(settings.modelUrl);
        if (settings.backgroundColor) setBgColor(settings.backgroundColor);
        setWireframe(settings.wireframe);
      } catch (err) {
        console.warn("Backend not reachable. Running frontend-only mode.");
      }
    };
    loadSettings();
  }, []);

  return (
    <div className="app">
      <Controls
        setModelUrl={setModelUrl}
        bgColor={bgColor}
        setBgColor={setBgColor}
        wireframe={wireframe}
        setWireframe={setWireframe}
        resetCamera={resetCamera}
      />

      <div className="viewer-container">
        <Viewer
          modelUrl={modelUrl}
          bgColor={bgColor}
          wireframe={wireframe}
          setReset={setResetCamera}
        />
      </div>
    </div>
  );
}
