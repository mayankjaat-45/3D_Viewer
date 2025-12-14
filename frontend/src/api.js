import axios from "axios";

const BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:4000/api";

const safeRequest = async (fn) => {
  try {
    return await fn();
  } catch (err) {
    console.error("API Error:", err.message || err);
    throw err;
  }
};

export const uploadModelApi = async (file) => safeRequest(async () => {
  const formData = new FormData();
  formData.append("model", file);
  const res = await axios.post(`${BASE_URL}/upload`, formData);
  return res.data.url;
});

export const saveSettingsApi = async ({ backgroundColor, wireframe, modelUrl }) => safeRequest(async () => {
  const res = await axios.post(`${BASE_URL}/settings`, { backgroundColor, wireframe, modelUrl });
  return res.data;
});

export const fetchSettingsApi = async () => safeRequest(async () => {
  const res = await axios.get(`${BASE_URL}/settings`);
  return res.data;
});
