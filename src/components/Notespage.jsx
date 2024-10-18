import React from 'react'
import { useLocation } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { Paper, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Mindmap from './Mindmap';

export default function Notespage() {
  const location = useLocation();
  const { data } = location.state || {};
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/quiz', {state: {quiz: data.groqQuestions}})
  }

  return (
    
      <Box >
        {/* Render markdown content */}
        <Box sx={{height: 700}}>
          <Mindmap markdown={data.groqSummary} />
        </Box>
        <ReactMarkdown>{data.groqSummary}</ReactMarkdown>

        {/* Add a button to navigate to the quiz page */}
        <Box mt={4} display="flex" justifyContent="center">
          <Button variant="contained" color="primary" onClick={handleClick}>
            Go to Quiz
          </Button>
        </Box>
      </Box>
  )
}
