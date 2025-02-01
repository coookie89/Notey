import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const file_id = response.data.file_id;
        console.log(response.data.file_id);
        return file_id;
      } catch (error) {
        console.log(error);
        return null;
      }
    }
  };

  const processNotes = async () => {
    const file_id = await handleUpload();

    if (!file_id) {
      console.log("File upload failed. Cannot proceed with processing.");
      return;
    }

    try {
      const response = await axios.get(`http://127.0.0.1:8000/process/${file_id}`, { responseType: "text" });
      console.log("Processing response:", response.data);
      navigate("/summary", { state: { data: response.data } });
    } catch (error) {
      console.log("Processing error:", error);
    } finally {
      setIsLoading(false); // Stop loading regardless of success/failure
    }
  };

  return (
    <div>
      <div className="mb-2">
        {/* display selected file name if any */}
        {selectedFile ? (
          <>File selected: {selectedFile.name}</>
        ) : (
          <div style={{ visibility: "hidden" }}>space</div>
        )}
      </div>
      <div>
        <div className="d-flex gap-3 justify-content-md-start justify-content-between">
          {/* btn1: choose file */}
          <div className="w-100">
            <input
              accept="image/*, application/pdf"
              id="upload-file"
              type="file"
              onChange={handleFileChange}
              hidden
            />
            <label className="btn-primary btn-lg" htmlFor="upload-file">
              <div>Choose File</div>
            </label>
          </div>
          {/* btn2: upload file */}
          <div className="w-100">
            <button
              type="button"
              className="btn btn-secondary btn-lg"
              onClick={processNotes}
              disabled={!selectedFile || isLoading}
              style={{ opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <>
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <span role="status">Loading...</span>
                </>
              ) : (
                "Upload"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUpload;
