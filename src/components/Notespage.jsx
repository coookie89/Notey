import React from "react";
import { useLocation } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Mindmap from "./Mindmap";
import { jsonrepair } from "jsonrepair";
import "./style.css";

export default function Notespage() {
  const [view_selection, set_view_selection] = React.useState("img"); // either img or txt
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/quiz", { state: { quiz: jsonrepair(data.groqQuestions) } });
  };

  return (
    <Box>
      <Box mt={4} display="flex" justifyContent="center">
        <button
          className="button-color-3"
          onClick={() => set_view_selection("img")}
        >
          View Image
        </button>
        <button
          className="button-color-3"
          onClick={() => set_view_selection("txt")}
        >
          View Text
        </button>
      </Box>

      <Box sx={{ height: 650 }}>
        {view_selection === "txt" ? (
          <div sx={{ overflowx: "scroll" }}>
            <ReactMarkdown>{data.groqSummary}</ReactMarkdown>
          </div>
        ) : (
          /* Render markdown content */
          <Mindmap markdown={data.groqSummary} />
        )}
      </Box>

      {/* Add a button to navigate to the quiz page */}
      <Box display="flex" justifyContent="center">
        <button className="button-color-1" onClick={handleClick}>
          Go to Quiz
        </button>
      </Box>
    </Box>
  );
}
