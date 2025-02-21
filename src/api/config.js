import axios from "axios";

const API_BASE = "http://localhost:8000/api/config";

export const getConfig = async () => {
  const response = await axios.get(API_BASE);
  return response.data;
};

export const saveConfig = async (config) => {
  const response = await axios.post(API_BASE, config, {
    headers: { "Content-Type": "application/json" },
  });
  return response.data;
};
