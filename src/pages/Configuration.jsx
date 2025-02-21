import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../styles/Configuration.css";
import { getConfig, saveConfig } from "../api/config";

const Configuration = () => {
  const [config, setConfig] = useState({
    mongo_db: {
      host: "",
      port: "",
    },
    qdrant_db: {
      url: "",
    },
  });

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const response = await getConfig();
        setConfig(response);
      } catch (error) {
        console.error("Error fetching configuration:", error);
        toast.error("Failed to fetch configuration");
      }
    };

    fetchConfig();
  }, []);

  const handleInputChange = (section, field, value) => {
    setConfig((prevConfig) => ({
      ...prevConfig,
      [section]: {
        ...prevConfig[section],
        [field]: value,
      },
    }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    try {
      await saveConfig(config);
      toast.success("Configuration saved successfully");
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save configuration");
    }
  };

  return (
    <form className="configuration-form" onSubmit={handleSave}>
      <h2>System Configuration</h2>

      <div className="section">
        <h3>MongoDB Settings</h3>
        <div className="form-group">
          <label>MongoDB Host</label>
          <input
            type="text"
            value={config.mongo_db?.host || ""}
            onChange={(e) => handleInputChange("mongo_db", "host", e.target.value)}
            placeholder="Enter MongoDB host"
          />
        </div>
        <div className="form-group">
          <label>MongoDB Port</label>
          <input
            type="number"
            value={config.mongo_db?.port || ""}
            onChange={(e) => handleInputChange("mongo_db", "port", e.target.value)}
            placeholder="Enter MongoDB port"
          />
        </div>
      </div>

      <div className="section">
        <h3>Qdrant Vector DB Settings</h3>
        <div className="form-group">
          <label>Qdrant URL</label>
          <input
            type="text"
            value={config.qdrant_db?.url || ""}
            onChange={(e) => handleInputChange("qdrant_db", "url", e.target.value)}
            placeholder="Enter Qdrant URL"
          />
        </div>
      </div>

      <button type="submit" className="btn save-btn">
        Save Configuration
      </button>
    </form>
  );
};

export default Configuration;
