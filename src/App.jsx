import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import Toast styles
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import CreatePipeline from "./pages/CreatePipeline";
import PipelineDetails from "./pages/PipelineDetails";
import EditPipeline from "./pages/EditPipeline";
import Configuration from "./pages/Configuration";
import PipelineWorkflow from "./pages/PipelineWorkflow";
import EvaluatePipeline from "./pages/EvaluatePipeline";
import "./styles/global.css";

const App = () => {
  return (
    <Router>
      <div className="app">
      <ToastContainer position="top-right" autoClose={3000} />
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/create" element={<CreatePipeline />} />
            <Route path="/pipeline/:id" element={<PipelineDetails />} />
            <Route path="/edit-pipeline/:id" element={<EditPipeline />} />
            <Route path="/configurations" element={<Configuration />} />
            <Route path="/run-workflow/:pipelineId" element={<PipelineWorkflow />} />
            <Route path="/evaluate/:pipelineId" element={<EvaluatePipeline />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
