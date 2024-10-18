import React, { useState } from 'react';
import { Button, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./style.css";
const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      console.log("Selected file:", selectedFile.name);
      const formData = new FormData();
      formData.append('form', selectedFile);
      // Here, you can add logic to upload the file to a server or handle it as needed.
      try {
        const response = await axios.post('https://6vw41x.buildship.run/add-document-chunks', formData, {
            headers: {
              'Content-Type': 'multipart/form-data', // Ensure correct content type
            },
          });
    
          console.log(response);
          navigate('/summary', {state: {data: response.data}})
        //   navigate('/quiz', {state: {quiz: response.data.groqQues}})
        //   navigate('/quiz')

      } catch(error) {
          console.log(error);
      }
    }
  };

  return (
    <Box sx={{py: 5}}>
        {selectedFile && <p>File selected: {selectedFile.name}</p>}
        <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        <input
            accept="image/*, application/pdf" // Accept only certain file types
            style={{ display: 'none' }} // Hide the default input
            id="upload-file"
            type="file"
            onChange={handleFileChange}
        />
        <label htmlFor="upload-file">
            <button component="span" class="button-color-2">
            Choose File
            </button>
        </label>
        
        <button
            class="button-color-1"
            onClick={handleUpload}
            disabled={!selectedFile} // Disable upload button if no file is selected
        >
            Upload
        </button>
        </Box>
    </Box>
  );
};

export default FileUpload;