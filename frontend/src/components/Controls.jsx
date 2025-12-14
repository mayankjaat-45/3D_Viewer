import { useState } from "react";
import { uploadModelApi, saveSettingsApi } from "../api";

export default function Controls({
  setModelUrl,
  bgColor,
  setBgColor,
  wireframe,
  setWireframe,
  resetCamera
}) {
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const url = await uploadModelApi(file);
      setModelUrl(url);

      await saveSettingsApi({ backgroundColor: bgColor, wireframe, modelUrl: url });
    } catch (err) {
      setErrorMsg("Failed to upload model. Make sure backend is running!");
    }

    setLoading(false);
  };

  const handleBgChange = async (e) => {
    const value = e.target.value;
    setBgColor(value);
    setErrorMsg(null);

    try {
      await saveSettingsApi({ backgroundColor: value, wireframe, modelUrl: null });
    } catch {
      setErrorMsg("Failed to save background color. Check backend connection.");
    }
  };

  const handleWireframeChange = async (e) => {
    const checked = e.target.checked;
    setWireframe(checked);
    setErrorMsg(null);

    try {
      await saveSettingsApi({ backgroundColor: bgColor, wireframe: checked, modelUrl: null });
    } catch {
      setErrorMsg("Failed to save wireframe setting. Check backend connection.");
    }
  };

  return (
    <div className="sidebar">
      <h1>3D Product Viewer</h1>

      {errorMsg && (
        <div style={{ color: "red", marginBottom: "10px", fontSize: "12px" }}>
          {errorMsg}
        </div>
      )}

      <div className="control-card">
        <label>Upload GLB / GLTF</label>
        <input type="file" accept=".glb,.gltf" onChange={handleUpload} disabled={loading} />
        {loading && <p>Uploading...</p>}
      </div>

      <div className="control-card">
        <label>Background Color</label>
        <input type="color" value={bgColor} onChange={handleBgChange} />
      </div>

      <div className="control-card">
        <label>
          <input type="checkbox" checked={wireframe} onChange={handleWireframeChange} /> Wireframe Mode
        </label>
      </div>

      <div className="control-card">
        <button onClick={resetCamera}>Reset Camera</button>
      </div>
    </div>
  );
}
