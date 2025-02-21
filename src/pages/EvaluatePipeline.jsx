import React, { useState, useEffect } from "react";
import {
  evaluateEmbeddings,
  testRetrieval,
  optimizePrompt,
  clusterEmbeddings,
  benchmarkEmbeddings
} from "../api/evaluation";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EvaluatePipeline = () => {
  const { pipelineId } = useParams();
  const [evaluationResults, setEvaluationResults] = useState({});
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchEvaluation();
  }, []);

  const fetchEvaluation = async () => {
    try {
      const embeddingsEval = await evaluateEmbeddings(pipelineId);
      setEvaluationResults((prev) => ({ ...prev, embeddings: embeddingsEval }));
    } catch (error) {
      toast.error("Error fetching embeddings evaluation.");
    }
  };

  const handleTestRetrieval = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query to test retrieval.");
      return;
    }
    try {
      const retrievalResults = await testRetrieval(pipelineId, query);
      setEvaluationResults((prev) => ({ ...prev, retrieval: retrievalResults }));
      toast.success("Retrieval test completed.");
    } catch (error) {
      toast.error("Error testing retrieval.");
    }
  };

  const handleOptimizePrompt = async () => {
    if (!query.trim()) {
      toast.error("Please enter a query to optimize.");
      return;
    }
    try {
      const optimizedQuery = await optimizePrompt(query);
      setEvaluationResults((prev) => ({ ...prev, optimizedQuery }));
      toast.success("Prompt optimization successful.");
    } catch (error) {
      toast.error("Error optimizing prompt.");
    }
  };

  const handleClusterEmbeddings = async () => {
    try {
      const clusterResults = await clusterEmbeddings(pipelineId);
      setEvaluationResults((prev) => ({ ...prev, clusters: clusterResults }));
      toast.success("Clustering completed.");
    } catch (error) {
      toast.error("Error clustering embeddings.");
    }
  };

  const handleBenchmarkEmbeddings = async () => {
    try {
      const benchmarkResults = await benchmarkEmbeddings(pipelineId);
      setEvaluationResults((prev) => ({ ...prev, benchmark: benchmarkResults }));
      toast.success("Benchmarking completed.");
    } catch (error) {
      toast.error("Error benchmarking embeddings.");
    }
  };

  return (
    <div className="evaluation-container">
      <h2>Evaluate Pipeline {pipelineId}</h2>

      {/* Embeddings Evaluation */}
      <div className="evaluation-section">
        <h3>Embedding Quality</h3>
        <pre>{JSON.stringify(evaluationResults.embeddings, null, 2)}</pre>
      </div>

      {/* Retrieval Testing */}
      <div className="evaluation-section">
        <h3>Test Retrieval</h3>
        <input
          type="text"
          placeholder="Enter query for retrieval test"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleTestRetrieval}>Run Retrieval Test</button>
        <pre>{JSON.stringify(evaluationResults.retrieval, null, 2)}</pre>
      </div>

      {/* Optimize Prompt */}
      <div className="evaluation-section">
        <h3>Optimize Prompt</h3>
        <button onClick={handleOptimizePrompt}>Optimize Query</button>
        <pre>{evaluationResults.optimizedQuery || "No suggestions yet"}</pre>
      </div>

      {/* Clustering */}
      <div className="evaluation-section">
        <h3>Cluster Embeddings</h3>
        <button onClick={handleClusterEmbeddings}>Run Clustering</button>
        <pre>{evaluationResults.clusters || "No clustering data yet"}</pre>
      </div>

      {/* Benchmarking */}
      <div className="evaluation-section">
        <h3>Benchmark Embeddings</h3>
        <button onClick={handleBenchmarkEmbeddings}>Run Benchmark</button>
        <pre>{JSON.stringify(evaluationResults.benchmark, null, 2)}</pre>
      </div>
    </div>
  );
};

export default EvaluatePipeline;
