import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Typography } from "@mui/material";
import Mindmap from "./Mindmap";
import "./style.css";

const customRenderers = {
  h1: ({ node, ...props }) => (
    <Typography variant="h4" component="h1" gutterBottom {...props} />
  ),
  h2: ({ node, ...props }) => (
    <Typography variant="h5" component="h2" gutterBottom {...props} />
  ),
  h3: ({ node, ...props }) => (
    <Typography variant="h6" component="h3" gutterBottom {...props} />
  ),
};

export default function Notespage() {
  const [viewSelection, setViewSelection] = React.useState("img"); // 'img' or 'txt'
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/");
  };

  return (
    <div className="sub-screen d-flex align-items-center flex-column justify-content-between gap-4">
      <div class="d-flex gap-3 w-50 justify-content-between">
        <div className="w-100">
          <button
            type="button"
            className={`btn btn-primary btn-lg ${
              viewSelection === "img" ? "active" : ""
            }`}
            onClick={() => setViewSelection("img")}
          >
            Mindmap
          </button>
        </div>
        <div className="w-100">
          <button
            className={`btn btn-primary btn-lg ${
              viewSelection === "txt" ? "active" : ""
            }`}
            onClick={() => setViewSelection("txt")}
          >
            Note
          </button>
        </div>
        <div className="w-100">
          <button
            type="button"
            className={`btn btn-primary btn-lg ${
              viewSelection === "img" ? "active" : ""
            }`}
            onClick={() => setViewSelection("img")}
          >
            Uploaded file
          </button>
        </div>
        <div className="w-100">
          <button
            className="btn btn-secondary btn-lg"
            onClick={() => handleClick()}
          >
            Upload new slides!
          </button>
        </div>
      </div>

      {/* Scrollable container for markdown content */}
      <div
        style={{ backgroundColor: "grey", overflowX: "scroll" }}
        className="w-100 flex-fill"
      >
        {viewSelection === "txt" ? (
          <div>
            <ReactMarkdown components={customRenderers}>
              {data.groqSummary}
            </ReactMarkdown>
          </div>
        ) : (
          <Mindmap markdown={data.groqSummary} />
        )}
      </div>
    </div>
  );
}
