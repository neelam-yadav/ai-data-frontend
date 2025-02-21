import React from "react";
import { useParams } from "react-router-dom";

const PipelineDetails = () => {
  const { id } = useParams();

  return (
    <div className="pipeline-details">
      <h2>Pipeline Details</h2>
      <p>Details for pipeline ID: {id}</p>
    </div>
  );
};

export default PipelineDetails;
