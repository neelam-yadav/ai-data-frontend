import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PipelineForm from "../components/PipelineForm";
import { savePipeline } from "../api/pipelines";
import { toast } from "react-toastify";

const CreatePipeline = () => {
  const [pipeline, setPipeline] = useState({
    name: "",
    description: "",
    data_sources: [],
    processing_config: {
      chunking_method: "fixed_length",
      chunk_size: 100,
      num_topics: 5,
      embedding_model: "all-mpnet-base-v2",
    },
  });

  const navigate = useNavigate();

  const handleSavePipeline = async (pipelineData) => {
    try {
      await savePipeline(pipelineData);
      toast.success(
        `Pipeline "${pipeline.name} created successfully!`
      );
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Error saving pipeline:", error);
      toast.error("Failed to save pipeline. Please try again.");
    }
  };

  return (
    <div className="create-pipeline">
      <h2>Create New Pipeline</h2>
      <PipelineForm 
        pipeline={pipeline} 
        setPipeline={setPipeline} 
        onSave={handleSavePipeline} 
        buttonLabel="Save Pipeline"
      />
    </div>
  );
};

export default CreatePipeline;
