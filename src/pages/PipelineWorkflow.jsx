import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getPipelineById } from "../api/pipelines";
import { startDataIngestion, startDataProcessing } from "../api/workflow";
import "../styles/PipelineWorkflow.css";

const PipelineWorkflow = () => {
  const { pipelineId } = useParams();
  const [pipeline, setPipeline] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const response = await getPipelineById(pipelineId);
        setPipeline(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching pipeline:", error);
        toast.error("Failed to load pipeline details.");
        setLoading(false);
      }
    };
    fetchPipeline();
  }, [pipelineId]);

  const [isIngesting, setIsIngesting] = useState(false);
  const handleStartIngestion = async (pipelineId) => {
    setIsIngesting(true); // Disable button and show spinner
    try {
        const response = await startDataIngestion(pipelineId);
        if (response.status === "success") {
            toast.success(response.message || "Data ingestion completed successfully.");
          } else {
            toast.error(`Error starting ingestion: ${response.error || "Unknown error occurred."}`);
          }
    } catch (error) {
      console.error("Error starting ingestion:", error);
      toast.error(`Error starting ingestion: "${error}"`);
    } finally {
        setIsIngesting(false); // Re-enable button and hide spinner
      }
  };

  const [isProcessing, setIsProcessing] = useState(false);
  const handleStartProcessing = async (pipelineId) => {
    setIsProcessing(true); // Disable button & show spinner
    try {
        const response = await startDataProcessing(pipelineId);
        if (response.status === "success") {
            toast.success(response.message || "Data processing completed successfully.");
          } else {
            toast.error(`Error starting processing: ${response.error || "Unknown error occurred."}`);
          }
    } catch (error) {
      console.error("Error starting processing:", error);
      toast.error("Failed to start data processing.");
    } finally {
        setIsProcessing(false); // Re-enable button and hide spinner
      }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pipeline) {
    return <p>Pipeline not found.</p>;
  }

  return (
    <div className="workflow-container">
      <h2>Workflow for {pipeline.name}</h2>
      
      <div className="section">
        <h3>Data Ingestion Configuration</h3>
        <p><strong>MongoDB Database:</strong> {pipeline.ingestion_config?.mongodb_database || "N/A"}</p>
        <p><strong>MongoDB Collection:</strong> {pipeline.ingestion_config?.mongodb_collection || "N/A"}</p>

        <h4>Data Sources</h4>
        {pipeline.data_sources.map((source, index) => (
          <div key={index} className="data-source">
            <p><strong>Type:</strong> {source.type}</p>
            <p><strong>Name:</strong> {source.name}</p>
          </div>
        ))}

        <button 
        className="btn start-btn" 
        onClick={() => handleStartIngestion(pipeline.id)}
        disabled={isIngesting} // Disable button during API call
        >
            {isIngesting ? (
    <span className="spinner"></span> // Show spinner
  ) : (
    "Start Data Ingestion"
  )}
            </button>
      </div>

      <div className="section">
        <h3>Data Processing Configuration</h3>
        <p><strong>Qdrant DB Collection:</strong> {pipeline.processing_config?.qdrant_db_collection || "N/A"}</p>
        <p><strong>Chunking Method:</strong> {pipeline.processing_config?.chunking_method || "N/A"}</p>
        <p><strong>Embedding Model:</strong> {pipeline.processing_config?.embedding_model || "N/A"}</p>
        <p><strong>Chunk Size:</strong> {pipeline.processing_config?.chunk_size}</p>
        <p><strong>Number of Topics:</strong> {pipeline.processing_config?.num_topics}</p>

        <button 
        className="btn start-btn" 
        onClick={() => handleStartProcessing(pipeline.id)}
        disabled={isProcessing} // Disable button during API call
        >
            {isProcessing ? (
    <span className="spinner"></span> // Show spinner
  ) : (
    "Start Data Processing"
  )}
            </button>
      </div>
    </div>
  );
};

export default PipelineWorkflow;
