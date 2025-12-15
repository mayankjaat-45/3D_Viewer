import { useState } from "react";
import { uploadModelApi, saveSettingsApi } from "../api";

const Controls = ({ onModelChange, onSettingsChange }) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [wireframe, setWireframe] = useState(false);

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const url = await uploadModelApi(file);
    onModelChange(url);
    await saveSettingsApi({
      backgroundColor: bgColor,
      wireframe,
      modelUrl: url,
    });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <input type="file" accept=".glb,.gltf" onChange={handleUpload} />

      <br />
      <br />

      <label>Background:</label>
      <input
        type="color"
        value={bgColor}
        onChange={(e) => {
          setBgColor(e.target.value);
          onSettingsChange(e.target.value, wireframe);
        }}
      />

      <label style={{ marginLeft: 10 }}>
        <input
          type="checkbox"
          checked={wireframe}
          onChange={(e) => {
            setWireframe(e.target.checked);
            onSettingsChange(bgColor, e.target.checked);
          }}
        />
        Wireframe
      </label>
    </div>
  );
};

export default Controls;
