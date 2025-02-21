import React, { useEffect, useState } from "react";
import { getPipelines, deletePipeline } from "../api/pipelines"; // API to fetch pipelines
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";
import { FaChartBar, FaNetworkWired, FaPencilAlt, FaTrashAlt } from "react-icons/fa"; // Import icons
import { toast } from "react-toastify";

const Dashboard = () => {
  const [pipelines, setPipelines] = useState([]);
  const navigate = useNavigate();

  const fetchPipelines = async () => {
    try {
      const data = await getPipelines();
      setPipelines(data);
    } catch (error) {
      console.error("Error fetching pipelines:", error);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  const handleCreatePipeline = () => {
    navigate("/create"); // Redirect to create pipeline page
  };

  const handleEdit = (id) => {
    navigate(`/edit-pipeline/${id}`); // Redirect to edit pipeline page
  };

  const handleRun = (pipelineId) => {
    navigate(`/run-workflow/${pipelineId}`); // Navigate to Workflow page
  };

  const handleEvaluate = (pipelineId) => {
    navigate(`/evaluate/${pipelineId}`); // Navigate to Evaluation Page
};


  const handleDelete = async (id, name) => {
    const confirmation = window.confirm(
      `Are you sure you want to delete pipeline: ${name}?`
    );
    if (confirmation) {
      try {
        await deletePipeline(id);
        toast.success(`Pipeline "${name}" deleted successfully!`);
        setPipelines((prev) => prev.filter((pipeline) => pipeline.id !== id));
      } catch (error) {
        console.error("Error deleting pipeline:", error);
        toast.error("Failed to delete pipeline. Please try again.");
      }
    }
  };
  

  return (
    <div className="dashboard">
      <h2>Your Pipelines</h2>
      <div className="pipeline-cards-container">
        {/* Render Pipeline Cards */}
        {pipelines.map((pipeline) => (
          <div key={pipeline.id} className="card">
            <div className="card-header">{pipeline.name}</div>
            <div className="card-body">
              <p>{pipeline.description || "No description available."}</p>
            </div>
            <div className="card-footer">
    {/* Run Workflow Button with Tooltip */}
    <div className="tooltip">
        <button className="btn run-btn" onClick={() => handleRun(pipeline.id)}>
            <FaNetworkWired />
        </button>
        <span className="tooltip-text">Run Pipeline Workflow</span>
    </div>

    {/* Evaluate Button with Tooltip */}
    <div className="tooltip">
        <button className="btn evaluate-btn" onClick={() => handleEvaluate(pipeline.id)}>
            <FaChartBar />
        </button>
        <span className="tooltip-text">Evaluate AI Readiness of Embeddings</span>
    </div>

    {/* Edit Button with Tooltip */}
    <div className="tooltip">
        <button className="btn edit-btn" onClick={() => handleEdit(pipeline.id)}>
            <FaPencilAlt />
        </button>
        <span className="tooltip-text">Edit Pipeline</span>
    </div>

    {/* Delete Button with Adjusted Tooltip Position */}
    <div className="tooltip tooltip-left">
        <button className="btn delete-btn" onClick={() => handleDelete(pipeline.id, pipeline.name)}>
            <FaTrashAlt />
        </button>
        <span className="tooltip-text">Delete Pipeline</span>
    </div>
</div>


          </div>
        ))}

        {/* Render Create New Pipeline Card */}
        <div className="card create-card" onClick={handleCreatePipeline}>
          <div className="card-body">
            <p>+ Create New Pipeline</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
