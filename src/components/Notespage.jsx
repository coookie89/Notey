import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import Mindmap from "./Mindmap";
import { jsonrepair } from "jsonrepair";
import "./style.css";

export default function Notespage() {
  const [viewSelection, setViewSelection] = React.useState("img"); // 'img' or 'txt'
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quiz", { state: { quiz: jsonrepair(data.groqQuestions) } });
  };

  return (
    <Box display="flex" flexDirection="column" height="100vh">
      <Box mt={4} display="flex" justifyContent="center" gap={2}>
        <button
          className={`button-color-3 ${
            viewSelection === "img" ? "active" : ""
          }`}
          onClick={() => setViewSelection("img")}
        >
          View Image
        </button>

        <button
          className={`button-color-3 ${
            viewSelection === "txt" ? "active" : ""
          }`}
          onClick={() => setViewSelection("txt")}
        >
          View Text
        </button>
      </Box>

      {/* Scrollable container for markdown content */}
      <Box
        sx={{ 
          flexGrow: 1, 
          overflowY: "auto", 
          padding: 3 
        }}
      >
        {viewSelection === "txt" ? (
          <div style={{ overflowX: "scroll" }}>
            <ReactMarkdown>{data.groqSummary}</ReactMarkdown>
          </div>
        ) : (
          <Mindmap markdown={data.groqSummary} />
        )}
      </Box>

      {/* Sticky button container */}
      <Box 
        display="flex" 
        justifyContent="center" 
        position="sticky" 
        bottom={10}
        bgcolor="background.paper" // Optional: background color for better visibility
      >
        <button className="button-color-1" onClick={handleClick}>
          Go to Quiz
        </button>
      </Box>
    </Box>
  );
}

