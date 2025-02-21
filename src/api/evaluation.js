import axios from "axios";


const API_BASE = "http://localhost:8000/api/evaluate";


// Evaluate Embeddings
export const evaluateEmbeddings = async (pipelineId) => {
    try {
      const response = await axios.get(`${API_BASE}/evaluate-embeddings/${pipelineId}`);
      return response.data.evaluation;
    } catch (error) {
      console.error("Error evaluating embeddings:", error);
      throw error;
    }
  };
  
  // Test Retrieval Performance
  export const testRetrieval = async (pipelineId, query) => {
    try {
      const response = await axios.get(`${API_BASE}/test-retrieval/${pipelineId}`, {
        params: { query }
      });
      return response.data.retrieval_evaluation;
    } catch (error) {
      console.error("Error testing retrieval:", error);
      throw error;
    }
  };
  
  // Optimize Prompt
  export const optimizePrompt = async (query) => {
    try {
      const response = await axios.get(`${API_BASE}/optimize-prompt`, {
        params: { query }
      });
      return response.data.optimized_query;
    } catch (error) {
      console.error("Error optimizing prompt:", error);
      throw error;
    }
  };
  
  // Cluster Embeddings
  export const clusterEmbeddings = async (pipelineId) => {
    try {
      const response = await axios.get(`${API_BASE}/cluster-embeddings/${pipelineId}`);
      return response.data.message;
    } catch (error) {
      console.error("Error clustering embeddings:", error);
      throw error;
    }
  };
  
  // Benchmark Embeddings
  export const benchmarkEmbeddings = async (pipelineId) => {
    try {
      const response = await axios.get(`${API_BASE}/benchmark-embeddings/${pipelineId}`);
      return response.data.benchmark_results;
    } catch (error) {
      console.error("Error benchmarking embeddings:", error);
      throw error;
    }
  };