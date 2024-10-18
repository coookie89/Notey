import React, { useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { Box, Popper, Paper, CircularProgress } from "@mui/material";
import Mindmap from "./Mindmap";
import { jsonrepair } from "jsonrepair";
import axios from "axios";
import "./style.css";

// Custom wrapper component for ReactMarkdown with selection handling
const SelectableMarkdown = ({ children, onTextSelect }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [selectedText, setSelectedText] = useState("");
    const [popupContent, setPopupContent] = useState(null); // Change to null to start
    const [isLoading, setIsLoading] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  
    const handleTextSelection = async (event) => {
      const selection = window.getSelection();
      const text = selection.toString().trim();
  
      if (text.length > 0) {
        // Get selection coordinates
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        
        setSelectedText(text);
        setAnchorEl(event.currentTarget);
        setPopupPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + (rect.width / 2) + window.scrollX,
        });
  
        // Make API call
        setIsLoading(true);
        try {
          const response = await axios.post('https://6vw41x.buildship.run/search', {
            id: "aGIHfScA6PlOINfa9SlV-0", 
            selectedText: text,
            search: false,
            search_query: ""
          });
  
          // Log the entire response for debugging
          console.log(response.data);
  
          // Set the response content, ensure it's an object
          setPopupContent(response.data);
        } catch (error) {
          console.error("API call failed:", error);
          setPopupContent({ summary_selected: "Failed to load explanation." }); // Set a fallback message
        } finally {
          setIsLoading(false);
        }
      } else {
        setAnchorEl(null);
      }
    };
  
    const handleClickAway = () => {
      setAnchorEl(null);
      setSelectedText("");
      setPopupContent(null);
    };
  
    return (
      <div 
        onMouseUp={handleTextSelection}
        onClick={(e) => e.target === e.currentTarget && handleClickAway()}
      >
        {children}
        
        <Popper 
          open={Boolean(anchorEl)} 
          anchorEl={anchorEl}
          placement="bottom"
          style={{
            position: 'absolute',
            top: popupPosition.top,
            left: popupPosition.left,
            transform: 'translateX(-50%)',
            zIndex: 1300
          }}
        >
          <Paper 
            sx={{ 
              p: 2, 
              maxWidth: 600,
              overflowY: 'auto',
              boxShadow: 3,
              bgcolor: 'background.paper',
              borderRadius: 1,
              whiteSpace: 'normal',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -10,
                left: '50%',
                transform: 'translateX(-50%)',
                borderWidth: '0 10px 10px 10px',
                borderStyle: 'solid',
                borderColor: 'transparent transparent background.paper transparent',
              }
            }}
          >
            {isLoading ? (
              <Box display="flex" justifyContent="center" p={1}>
                <CircularProgress size={30} />
              </Box>
            ) : (
              <div>
                {popupContent ? popupContent.summary_selected : "No explanation available."}
              </div>
            )}
          </Paper>
        </Popper>
      </div>
    );
  };
  

export default function Notespage() {
  const [viewSelection, setViewSelection] = React.useState("img");
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
          className={`button-color-3 ${viewSelection === "img" ? "active" : ""}`}
          onClick={() => setViewSelection("img")}
        >
          View Image
        </button>

        <button
          className={`button-color-3 ${viewSelection === "txt" ? "active" : ""}`}
          onClick={() => setViewSelection("txt")}
        >
          View Text
        </button>
      </Box>

      <Box sx={{ flexGrow: 1, overflowY: "auto", padding: 3 }}>
        {viewSelection === "txt" ? (
          <div style={{ overflowX: "scroll" }}>
            <SelectableMarkdown>
              <ReactMarkdown>{data.groqSummary}</ReactMarkdown>
            </SelectableMarkdown>
          </div>
        ) : (
          <Mindmap markdown={data.groqSummary} />
        )}
      </Box>

      <Box 
        display="flex" 
        justifyContent="center" 
        position="sticky" 
        bottom={10}
        bgcolor="background.paper"
      >
        <button className="button-color-1" onClick={handleClick}>
          Go to Quiz
        </button>
      </Box>
    </Box>
  );
}