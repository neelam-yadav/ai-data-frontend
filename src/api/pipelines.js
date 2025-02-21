import axios from "axios";

const API_BASE = "http://localhost:8000/api/pipelines";

export const savePipeline = async (pipeline) => {
  const response = await axios.post(`${API_BASE}/`, pipeline);
  return response.data;
};

export const getPipelineById = async (id) => {
  const response = await axios.get(`${API_BASE}/${id}`);
  return response.data;
};

export const getPipelines = async () => {
  const response = await axios.get(`${API_BASE}/`);
  return response.data;
};


export const updatePipeline = async (pipelineId, pipeline) => {
  const response = await axios.put(`${API_BASE}/${pipelineId}`, pipeline);
  return response.data;
};

export const deletePipeline = async (pipelineId) => {
  const response = await axios.delete(`${API_BASE}/${pipelineId}`);
  return response.data;
};
