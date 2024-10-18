import React from "react";
import FileUpload from "./FileUpload";
import { Typography, Box } from "@mui/material";

export default function Homepage() {
  return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          width: "50%",
          justifyContent: "center",
          alignItems: "left",
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Find it Hard to Revise Course Slides?
        </Typography>

        <Typography variant="h5" sx={{ my: 5 }}>
          Course Slides are Too Big to Read? Upload it! We will generate a mind
          map for you.
        </Typography>

        <FileUpload sx={{ my: 5 }} />
      </Box>
  );
}
