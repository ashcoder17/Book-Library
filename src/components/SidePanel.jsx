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
  width: 440px;
  max-width: 90vw;
  height: calc(100% - var(--navbar-height, 70px));
  background: #ffffff;
  z-index: 100;
  box-shadow: -12px 0 40px rgba(0,0,0,0.22);
  animation: ${slideIn} 0.35s ease forwards;
  display: flex;
  flex-direction: column;
  padding: 26px;
  gap: 14px;
  overflow: hidden;
  border-top-left-radius: 18px;
  border-bottom-left-radius: 18px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 14px;
  right: 14px;
  border: none;
  background: transparent;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  color: #999;

  &:hover {
    color: #333;
  }
`;

const CoverWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 6px;
  background: linear-gradient(135deg, #ff416c20, #ff4b2b20); /* subtle gradient behind cover */
  border-radius: 14px;
  padding: 12px;
`;

const Thumbnail = styled.img`
  width: 50%;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
`;

const Title = styled.h3`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 4px; /* reduced space to author */
`;

const Author = styled.p`
  font-size: 1rem;
  color: #666;
  margin-top: 0;
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

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(
    to right,
    transparent,
    rgba(0,0,0,0.12),
    transparent
  );
  margin: 6px 0;
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
  background: ${(p) =>
    p.variant === "remove"
      ? "#333"
      : "linear-gradient(135deg,#ff416c,#ff4b2b)"};
  color: #fff;
`;

const SidePanel = ({ book, onClose, inLibrary, onAdd, onRemove }) => {
  if (!book) return null;

  return (
    <>
      <Backdrop />
      <Panel>
        <CloseButton onClick={onClose}>×</CloseButton>

        <CoverWrapper>
          <Thumbnail src={book.thumbnail} alt={book.title} />
        </CoverWrapper>

        <Title>{book.title}</Title>
        <Author>{book.author}</Author>

        <Divider />

        <ButtonRow>
          {!inLibrary ? (
            <ActionButton onClick={() => onAdd(book)}>
              Add to Library
            </ActionButton>
          ) : (
            <ActionButton
              variant="remove"
              onClick={() => onRemove(book.title)}
            >
              Remove from Library
            </ActionButton>
          )}
        </ButtonRow>

        <Description>{book.description}</Description>
      </Panel>
    </>
  );
};

export default SidePanel;
