import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PipelineForm from "../components/PipelineForm";
import { getPipelineById, updatePipeline } from "../api/pipelines";
import { toast } from "react-toastify";

const EditPipeline = () => {
  const { id } = useParams();
  const [pipeline, setPipeline] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPipeline = async () => {
      try {
        const data = await getPipelineById(id);
        setPipeline(data);
      } catch (error) {
        console.error("Error fetching pipeline:", error);
        toast.error("Failed to fetch pipeline details.");
      }
    };

    fetchPipeline();
  }, [id]);

  const handleUpdatePipeline = async (updatedPipeline) => {
    try {
      await updatePipeline(pipeline.id, updatedPipeline);
      toast.success(
              `Pipeline "${pipeline.name} updated successfully!`
            );
      navigate("/"); // Redirect to dashboard
    } catch (error) {
      console.error("Error updating pipeline:", error);
      toast.error("Failed to update pipeline. Please try again.");
    }
  };

  if (!pipeline) {
    return <p>Loading pipeline details...</p>;
  }

  return (
    <div className="edit-pipeline">
      <h2>Edit Pipeline</h2>
      <PipelineForm 
        pipeline={pipeline} 
        setPipeline={setPipeline} 
        onSave={handleUpdatePipeline} 
        buttonLabel="Update Pipeline"
      />
    </div>
  );
};

export default EditPipeline;
