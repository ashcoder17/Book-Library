// withImageLoading.jsx
import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Spinner animation
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

// Spinner styled component
const Spinner = styled.div`
  border: 4px solid rgba(255, 255, 255, 0.3);
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

// Wrapper for image + spinner
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

// HOC
const withImageLoading = (WrappedImage) => {
  return ({ src, alt, ...props }) => {
    const [loaded, setLoaded] = useState(false);

    return (
      <ImageWrapper>
        {!loaded && <Spinner />}
        <WrappedImage
          src={src}
          alt={alt}
          {...props}
          onLoad={() => setLoaded(true)}
          style={{
            display: loaded ? "block" : "none",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </ImageWrapper>
    );
  };
};

export default withImageLoading;
