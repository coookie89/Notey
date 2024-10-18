import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './components/Homepage';
import Quizpage from './components/Quizpage'
import Notespage from './components/Notespage';

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: 'Quicksand, sans-serif',  // Use the Quicksand font
      fontSize: 14,  // Default font size for body text (in pixels)
  
      body1: {
        fontSize: '1rem',  // Font size for body1 (paragraph text)
      },
      button: {
        fontSize: '1rem',  // Font size for buttons
        fontWeight: 'bold',
      },
    },
  });
  
  return (
    <ThemeProvider theme={theme}> 
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/summary" element={<Notespage />} />
            <Route path="/quiz" element={<Quizpage />} />
          </Routes>

        </Router>
    </ThemeProvider>
  );
}

export default App;
