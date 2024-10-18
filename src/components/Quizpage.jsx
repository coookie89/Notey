import React from 'react'
import { useLocation } from 'react-router-dom';
import { Box, Button, Typography, Radio, RadioGroup, FormControlLabel, FormControl, Paper } from '@mui/material';
// import ReactMarkdown from 'react-markdown';

export default function Quizpage() {
  const location = useLocation();
  const { quiz } = location.state || {};
  const quizObject = JSON.parse(quiz);
  const [userAnswers, setUserAnswers] = React.useState(Array(quizObject.questions.length).fill(null)); // Track user answers
    const [submitted, setSubmitted] = React.useState(false); // Track submission status

    // Handle answer selection
    const handleAnswerChange = (questionIndex, option) => {
    const newAnswers = [...userAnswers];
    newAnswers[questionIndex] = option; // Update selected answer for the question
    setUserAnswers(newAnswers);
    };

    // Handle quiz submission
    const handleSubmit = () => {
    setSubmitted(true); // Mark quiz as submitted
    };

    // Reset the quiz
    const handleReset = () => {
    setUserAnswers(Array(quizObject.questions.length).fill(null)); // Reset all answers
    setSubmitted(false); // Unsubmit the quiz
    };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      bgcolor="#f5f5f5"
      p={2}
    >
      <Paper elevation={3} sx={{ padding: 4, maxWidth: 800, width: '100%' }}>


    <Box p={4}>
      <Typography variant="h4" gutterBottom>Quiz Session</Typography>

      {/* Render each question */}
      {quizObject.questions.map((question, questionIndex) => (
        <Box key={questionIndex} mb={4}>
          <Typography variant="h6">{questionIndex + 1}. {question.question}</Typography>

          <FormControl component="fieldset">
            <RadioGroup
              value={userAnswers[questionIndex] !== null ? userAnswers[questionIndex] : ""}
              onChange={(e) => handleAnswerChange(questionIndex, e.target.value)}
            >
              {question.options.map((option, optionIndex) => (
                <FormControlLabel
                  key={optionIndex}
                  value={option}
                  control={<Radio />}
                  label={option}
                  disabled={submitted} // Disable options after submission
                />
              ))}
            </RadioGroup>
          </FormControl>

          {/* Display correct answer and feedback after submission */}
          {submitted && (
            <Typography variant="body1" color={userAnswers[questionIndex] === question.correct ? "green" : "red"}>
              {userAnswers[questionIndex] === question.correct
                ? "Correct!"
                : `Incorrect. The correct answer is: ${question.correct}`}
            </Typography>
          )}
        </Box>
      ))}

        {/* Submit or Reset Buttons */}
        {!submitted ? (
                <Button variant="contained" color="primary" onClick={handleSubmit} disabled={userAnswers.includes(null)}>
                Submit
                </Button>
            ) : (
                <Button variant="contained" color="secondary" onClick={handleReset}>
                Reset Quiz
                </Button>
            )}
            </Box>

      </Paper>
    </Box>
  )
}
