import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-top: 15px;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: all 0.2s ease;

  background-color: ${(props) =>
        props.variant === "add" ? "#28a745" : "#dc3545"};

  &:hover {
    background-color: ${(props) =>
        props.variant === "add" ? "#218838" : "#c82333"};
  }
`;


const CardButton = ({ type = "button", variant = "add", children, onClick, ...props }) => {
    return (
        <StyledButton variant={variant} onClick={onClick}>
            <button type={type} {...props} style={{ background: "transparent", border: "none", color: "inherit", cursor: "pointer", fontWeight: "bold" }}>
                {children}
            </button>
        </StyledButton>
    );
};

export default CardButton;
