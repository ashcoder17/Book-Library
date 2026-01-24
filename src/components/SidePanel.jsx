import React from "react";
import styled, { keyframes } from "styled-components";

const slideIn = keyframes`
  from { transform: translateX(100%); }
  to { transform: translateX(0); }
`;

const Backdrop = styled.div`
  position: fixed;
  top: var(--navbar-height, 70px);
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0,0,0,0.3);
  z-index: 90;
`;

const Panel = styled.div`
  position: fixed;
  top: var(--navbar-height, 70px);
  right: 0;
  width: 360px;
  max-width: 90vw;
  height: calc(100% - var(--navbar-height, 70px));
  background: #ffffff;
  z-index: 100;
  box-shadow: -8px 0 30px rgba(0,0,0,0.2);
  animation: ${slideIn} 0.35s ease forwards;

  display: flex;
  flex-direction: column;
  padding: 20px;
  gap: 14px;
  overflow: hidden;
`;
const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 700;
`;

const Author = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Description = styled.p`
  font-size: 0.95rem;
  line-height: 1.4;
  color: #444;

  flex: 1;    
  min-height: 0;      
  overflow-y: auto;     
  margin: 0;
`;

const Thumbnail = styled.img`
  width: 50%;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
`;

const ButtonRow = styled.div`
  display: flex;
  gap: 10px;
  flex-shrink: 0;
`;

const ActionButton = styled.button`
  flex: 1;
  padding: 10px 14px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  background: ${(p) => (p.variant === "remove" ? "#333" : "linear-gradient(135deg,#ff416c,#ff4b2b)")};
  color: #fff;
`;

const SidePanel = ({ book, onClose, inLibrary, onAdd, onRemove }) => {
  console.log("SidePanel book:", book); // Debugging line
  if (!book) return null;
  return (   
    <>
      <Backdrop onClick={onClose} />
      <Panel>
          <>
            <Thumbnail src={book.thumbnail} alt={book.title} />
            <Title>{book.title}</Title>
            <Author>{book.author}</Author>
            <Description>
              {book.description}
            </Description>
            <ButtonRow>
              {!inLibrary ? (
                <ActionButton onClick={() => onAdd(book)}>
                  Add to Library
                </ActionButton>
              ) : (
                <ActionButton variant="remove" onClick={() => onRemove(book.title)}>
                  Remove from Library
                </ActionButton>
              )}
            </ButtonRow>
          </>
      </Panel>
    </>
  )
};

export default SidePanel;
