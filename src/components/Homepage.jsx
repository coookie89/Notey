import React, { useState, useEffect } from "react";
import FileUpload from "./FileUpload";

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
    <div className="main">
      <div className="d-flex gap-5 align-items-center flex-md-row flex-column">
        <div className="w-100">
          <h1 className="mb-4">Notey</h1>
          <h2 className="mb-4">
            Find it Hard to <AnimatedWord /> Course Slides?
          </h2>

          <h5 className="mb-4">
            Course Slides are <b>Too Big to Read?</b>
            &nbsp;<b>Upload it!</b> We generate a mind map for you.
          </h5>

          <FileUpload/>
        </div>
        <div className="w-100">
          <img
            src="Homepage3.png"
            className="img-fluid float-animation"
            alt="..."
          />
        </div>
      </div>
    </div>
  );
}
