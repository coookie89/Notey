import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, CircularProgress } from '@mui/material';
import axios from 'axios';

const FileUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    console.log(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (selectedFile) {
      setIsLoading(true); // Start loading
      console.log("Selected file:", selectedFile.name);
      const formData = new FormData();
      formData.append("form", selectedFile);
      
      try {
        const response = await axios.post(
          "https://6vw41x.buildship.run/add-document-chunks",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response);
        navigate("/summary", { state: { data: response.data } });
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false); // Stop loading regardless of success/failure
      }
    }
  };

  return (
    <Box sx={{ py: 5 }}>
      {selectedFile && (
        <Typography variant="h8">
          File selected: {selectedFile.name}
        </Typography>
      )}
      <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
        <input
          accept="image/*, application/pdf"
          style={{ display: "none" }}
          id="upload-file"
          type="file"
          onChange={handleFileChange}
        />

        <button component="span" className="button-color-2">
          <label
            htmlFor="upload-file"
            style={{
              width: "100%",
              height: "100%",
              cursor: "pointer",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Choose File
          </label>
        </button>

        <Box position="relative">
          <button
            className="button-color-1"
            onClick={handleUpload}
            disabled={!selectedFile || isLoading}
            style={{ opacity: isLoading ? 0.7 : 1 }}
          >
            {isLoading ? 'Uploading...' : 'Upload'}
          </button>
          {isLoading && (
            <CircularProgress
              size={50}
              sx={{
                position: 'absolute',
                top: '30%',
                left: 160,
                marginTop: '-12px',
              }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default FileUpload;