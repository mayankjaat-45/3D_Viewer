import { useEffect, useState } from "react";
import Viewer from "./components/Viewer";
import Controls from "./components/Controls";
import ErrorBoundary from "./components/ErrorBoundary";
import { fetchSettingsApi } from "./api";

function App() {
  const [modelUrl, setModelUrl] = useState("");
  const [bgColor, setBgColor] = useState("#ffffff");
  const [wireframe, setWireframe] = useState(false);

  useEffect(() => {
    fetchSettingsApi()
      .then((data) => {
        if (data) {
          setModelUrl(data.modelUrl);
          setBgColor(data.backgroundColor || "#ffffff");
          setWireframe(data.wireframe || false);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>3D Product Viewer</h2>

      <Controls
        onModelChange={setModelUrl}
        onSettingsChange={(bg, wf) => {
          setBgColor(bg);
          setWireframe(wf);
        }}
      />

      <ErrorBoundary>
        <Viewer modelUrl={modelUrl} bgColor={bgColor} wireframe={wireframe} />
      </ErrorBoundary>
    </div>
  );
}

export default App;
