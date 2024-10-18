import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";
import { Typography, Box } from "@mui/material";

const AnimatedWord = () => {
  const words = ["Revise", "Study", "Review", "Learn", "Reread"];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, 3000); // Change word every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        display: "inline-block",
        color: "rgb(239, 137, 101)", // You can change this color
      }}
      className={isAnimating ? "word-animation" : ""}
      onAnimationEnd={() => setIsAnimating(false)}
    >
      {words[currentIndex]}
    </span>
  );
};

export default function Homepage() {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        px: 4,
      }}
    >
      {/* Left Column */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "60%",
          justifyContent: "center",
          alignItems: "left",
          pr: 4,
        }}
      >
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Find it Hard to <AnimatedWord />
        </Typography>
        <Typography variant="h3" sx={{ fontWeight: "bold" }}>
          Course Slides?
        </Typography>

        <Typography variant="h5" sx={{ my: 5 }}>
          Course Slides are Too Big to Read? Upload it! We will generate a mind
          map for you.
        </Typography>

        <FileUpload sx={{ my: 5 }} />
      </Box>

      {/* Right Column */}
      <Box
        sx={{
          display: "flex",
          width: "50%",
          justifyContent: "center",
          alignItems: "center",
          pl: 4,
        }}
      >
        <Box
          component="img"
          src="/Homepage3.png"
          alt="Study illustration"
          sx={{
            maxWidth: "130%",
            maxHeight: "120vh",
            objectFit: "contain",
            animation: "float 3s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": {
                transform: "translateY(0)",
              },
              "50%": {
                transform: "translateY(-10px)",
              },
            },
          }}
        />
      </Box>
    </Box>
  );
}