import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import axios from "axios";

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
    <div>
      <div className="mb-2">
        {selectedFile ? (
          <>File selected: {selectedFile.name}</>
        ) : (
          <div style={{ visibility: "hidden" }}>space</div>
        )}
      </div>
      <div>
        <div class="d-flex gap-3 justify-content-md-start justify-content-between">
            <div className="w-100">
              <input
                accept="image/*, application/pdf"
                style={{ display: "none" }}
                id="upload-file"
                type="file"
                onChange={handleFileChange}
              />
              <button type="button" class="btn btn-primary btn-lg">
                <label htmlFor="upload-file" style={{ cursor: "pointer" }}>
                  Choose File
                </label>
              </button>
            </div>
            <div className="w-100">
              <button
                type="button"
                class="btn btn-secondary btn-lg"
                onClick={handleUpload}
                disabled={!selectedFile || isLoading}
                style={{ opacity: isLoading ? 0.7 : 1 }}
              >
                {isLoading ? "Uploading..." : "Upload"}
              </button>

              {isLoading && (
                <CircularProgress
                  size={50}
                  sx={{
                    position: "absolute",
                    top: "30%",
                    left: 160,
                    marginTop: "-12px",
                  }}
                />
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
