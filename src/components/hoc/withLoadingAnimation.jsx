import React from "react";
import styled, { keyframes } from "styled-components";

const bounce = keyframes`
  0%, 80%, 100% { transform: scale(0); opacity: 0.3; }
  40% { transform: scale(1); opacity: 1; }
`;

const LoaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  padding: 60px;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #ff416c, #ff4b2b);
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out both;
  animation-delay: ${(props) => props.delay};
`;

const withLoadingAnimation = (WrappedComponent) => {
    return ({ loading, ...props }) => {
        if (loading) {
            return (
                <LoaderWrapper>
                    <Dot delay="0s" />
                    <Dot delay="0.2s" />
                    <Dot delay="0.4s" />
                </LoaderWrapper>
            );
        }

        return <WrappedComponent {...props} />;
    };
};

export default withLoadingAnimation;
