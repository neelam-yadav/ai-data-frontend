import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; 
import "../styles/PipelineForm.css";

const PipelineForm = ({ pipeline, setPipeline, onSave, buttonLabel = "Save Pipeline" }) => {
  const [dataSources, setDataSources] = useState(pipeline.data_sources || []);

  useEffect(() => {
    if (pipeline.data_sources) {
      setDataSources(pipeline.data_sources);
    }
  }, [pipeline]);

  const handlePipelineChange = (e) => {
    const { name, value } = e.target;
    setPipeline({ ...pipeline, [name]: value });
  };

  const handleProcessingConfigChange = (field, value) => {
    setPipeline({
      ...pipeline,
      processing_config: {
        ...pipeline.processing_config,
        [field]: value,
      },
    });
  };

  const handleIngestionConfigChange = (field, value) => {
    setPipeline({
      ...pipeline,
      ingestion_config: {
        ...pipeline.ingestion_config,
        [field]: value,
      },
    });
  };

  const handleDataSourceChange = (index, field, value) => {
    const updatedDataSources = [...dataSources];
    updatedDataSources[index][field] = value;
    setDataSources(updatedDataSources);
    setPipeline({ ...pipeline, data_sources: updatedDataSources });
  };

  const handleAddDataSource = () => {
    const newDataSources = [...dataSources, { type: "", name: "", config: {} }];
    setDataSources(newDataSources);
    // setDataSources([...dataSources, { type: "", name: "", config: {} }]);
    setPipeline({ ...pipeline, data_sources: newDataSources });
  };

  const handleRemoveDataSource = (index) => {
    const updatedDataSources = dataSources.filter((_, i) => i !== index);
    setDataSources(updatedDataSources);
    setPipeline({ ...pipeline, data_sources: updatedDataSources });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await onSave({
        ...pipeline,
        data_sources: dataSources,
      });
    } catch (error) {
      console.error("Error onSave function:", error);
    }
  };

  const renderAdditionalFields = (type, index) => {
    switch (type) {
      case "file":
        return (
          <div className="form-group">
            <label>Folder Location</label>
            <input
              type="text"
              placeholder="Enter folder location"
              value={dataSources[index].config.folder_path || ""}
              onChange={(e) =>
                handleDataSourceChange(index, "config", {
                  ...dataSources[index].config,
                  folder_path: e.target.value,
                })
              }
            />
          </div>
        );
      case "confluence":
        return (
          <>
            <div className="form-group">
              <label>API URL</label>
              <input
                type="text"
                placeholder="Enter Confluence API URL"
                value={dataSources[index].config.api_url || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    api_url: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                placeholder="Enter username"
                value={dataSources[index].config.username || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    username: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>API Token</label>
              <input
                type="password"
                placeholder="Enter API token"
                value={dataSources[index].config.api_token || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    api_token: e.target.value,
                  })
                }
              />
            </div>
          </>
        );
      case "database":
        return (
          <>
            <div className="form-group">
              <label>Host</label>
              <input
                type="text"
                placeholder="Enter host"
                value={dataSources[index].config.host || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    host: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Port</label>
              <input
                type="number"
                placeholder="Enter port"
                value={dataSources[index].config.port || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    port: e.target.value,
                  })
                }
              />
            </div>
            <div className="form-group">
              <label>Database Name</label>
              <input
                type="text"
                placeholder="Enter database name"
                value={dataSources[index].config.database || ""}
                onChange={(e) =>
                  handleDataSourceChange(index, "config", {
                    ...dataSources[index].config,
                    database: e.target.value,
                  })
                }
              />
            </div>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <form className="pipeline-form" onSubmit={handleSubmit}>
      <h2>{buttonLabel === "Save Pipeline" ? "Create New Pipeline" : "Edit Pipeline"}</h2>

      <div className="form-group">
        <label>Pipeline Name</label>
        <input
          type="text"
          name="name"
          value={pipeline.name || ""}
          onChange={handlePipelineChange}
          placeholder="Enter pipeline name"
        />
      </div>

      <div className="form-group">
        <label>Description</label>
        <textarea
          name="description"
          value={pipeline.description || ""}
          onChange={handlePipelineChange}
          placeholder="Enter pipeline description"
        />
      </div>

      <h3>Data Ingestion</h3>
      {/* MongoDB Fields (Separate from Data Sources) */}
<div className="form-group">
  <label>MongoDB Database</label>
  <input
    type="text"
    value={pipeline.ingestion_config?.mongodb_database || ""}
    onChange={(e) =>
      handleIngestionConfigChange("mongodb_database", e.target.value )
    }
    placeholder="Enter MongoDB Database Name"
  />
</div>

<div className="form-group">
  <label>MongoDB Collection Name</label>
  <input
    type="text"
    value={pipeline.ingestion_config?.mongodb_collection || ""}
    onChange={(e) =>
      handleIngestionConfigChange("mongodb_collection", e.target.value )
    }
    placeholder="Enter MongoDB Collection Name"
  />
</div>
      {dataSources.map((dataSource, index) => (
        <div key={index} className="data-source-section">
          <div className="form-group">
            <label>Data Source Type</label>
            <select
              value={dataSource.type || ""}
              onChange={(e) =>
                handleDataSourceChange(index, "type", e.target.value)
              }
            >
              <option value="">Select Data Source Type</option>
              <option value="file">File</option>
              <option value="confluence">Confluence</option>
              <option value="database">Database</option>
              <option value="log">Log</option>
              <option value="datalake">Data Lake</option>
              <option value="stream">Stream</option>
            </select>
          </div>

          <div className="form-group">
            <label>Data Source Name</label>
            <input
              type="text"
              placeholder="Enter data source name"
              value={dataSource.name || ""}
              onChange={(e) =>
                handleDataSourceChange(index, "name", e.target.value)
              }
            />
          </div>

          {renderAdditionalFields(dataSource.type, index)}

          <button
            type="button"
            className="btn remove-btn"
            onClick={() => handleRemoveDataSource(index)}
          >
            Remove Data Source
          </button>
        </div>
      ))}

      <button type="button" className="btn add-btn" onClick={handleAddDataSource}>
        Add Another Data Source
      </button>

      <h3>Data Processing</h3>
      <div className="form-group">
  <label>Qdrant DB Collection</label>
  <input
    type="text"
    value={pipeline.processing_config?.qdrant_db_collection || ""}
    onChange={(e) =>
      handleProcessingConfigChange("qdrant_db_collection", e.target.value)
    }
    placeholder="Enter Qdrant Collection Name"
  />
</div>

      <div className="form-group">
        <label>Chunking Method</label>
        <select
          value={pipeline.processing_config?.chunking_method || ""}
          onChange={(e) => handleProcessingConfigChange("chunking_method", e.target.value)}
        >
          <option value="fixed_length">Fixed Length</option>
          <option value="sliding_window">Sliding Window</option>
          <option value="sentence_based">Sentence Based</option>
          <option value="semantic">Semantic</option>
        </select>
      </div>

      <div className="form-group">
        <label>Embedding Model</label>
        <input
          type="text"
          value={pipeline.processing_config?.embedding_model || "all-mpnet-base-v2"}
          onChange={(e) => handleProcessingConfigChange("embedding_model", e.target.value)}
          placeholder="Enter embedding model"
        />
      </div>

      <div className="form-group">
        <label>Chunk Size</label>
        <input
          type="number"
          value={pipeline.processing_config?.chunk_size || 100}
          onChange={(e) =>
            handleProcessingConfigChange("chunk_size", parseInt(e.target.value, 10))
          }
          placeholder="Enter chunk size"
        />
      </div>

      <div className="form-group">
        <label>Number of Topics</label>
        <input
          type="number"
          value={pipeline.processing_config?.num_topics || 5}
          onChange={(e) =>
            handleProcessingConfigChange("num_topics", parseInt(e.target.value, 10))
          }
          placeholder="Enter number of topics"
        />
      </div>

      <button type="submit" className="btn save-btn">
        {buttonLabel}
      </button>
    </form>
  );
};

export default PipelineForm;
