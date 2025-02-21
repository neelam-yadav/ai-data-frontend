import axios from "axios";

const API_BASE = "http://localhost:8000/api/workflow";


export const startDataIngestion = async (pipelineId) => {
  const response = await axios.post(`${API_BASE}/start-ingestion/${pipelineId}`);
  return response.data;
};

export const startDataProcessing = async (pipelineId) => {
  const response = await axios.post(`${API_BASE}/start-processing/${pipelineId}`);
  return response.data;
};