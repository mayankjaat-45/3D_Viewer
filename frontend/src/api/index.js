import axios from "axios";

const BASE_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:4000";

export const uploadModelApi = async (file) => {
  const formData = new FormData();
  formData.append("model", file);

  const res = await axios.post(
    `${BASE_URL}/api/upload`,
    formData
  );

  return res.data.url; // FULL GLB URL
};

export const fetchSettingsApi = async () => {
  const res = await axios.get(`${BASE_URL}/api/settings`);
  return res.data;
};
