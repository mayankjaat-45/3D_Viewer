import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

// axios instance
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Upload GLB / GLTF
export const uploadModelApi = async (file) => {
  const formData = new FormData();
  formData.append("model", file);

  const res = await api.post("/api/upload", formData);
  return res.data.url;
};

// Save viewer settings
export const saveSettingsApi = async (data) => {
  const res = await api.post("/api/settings", data);
  return res.data;
};

// Fetch viewer settings
export const fetchSettingsApi = async () => {
  const res = await api.get("/api/settings");
  return res.data;
};
