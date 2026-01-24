import styled, { keyframes } from "styled-components";
import Mosaic from "./Mosaic";
import withImageLoading from "../components/hoc/withImageLoading";


const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const floatParticle = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0.2; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
`;

const CardWrapper = styled.div`
  width: 100%;
  aspect-ratio: 2 / 3;
  position: relative;
`;

const Card = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transform: scale(1);
  transition: transform 0.35s ease, box-shadow 0.35s ease;
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.25);

  &:hover {
    transform: scale(1.08);
    z-index: 10;
    box-shadow: 0 25px 55px rgba(0, 0, 0, 0.45);
  }

  /* shimmer overlay on hover */
  &:hover::after {
    opacity: 1;
    animation: ${shimmer} 2.5s linear infinite;
  }

  &:hover .overlay {
    opacity: 1;
    transform: translateY(0);
  }

  &:hover img {
    transform: scale(1.06) rotate(0.5deg);
  }

  /* shimmer overlay (hidden by default) */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      120deg,
      rgba(255, 255, 255, 0.04) 0%,
      rgba(255, 255, 255, 0.15) 50%,
      rgba(255, 255, 255, 0.04) 100%
    );
    background-size: 200% 100%;
    opacity: 0;
    pointer-events: none;
    z-index: 2;
  }
`;

const Particle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  border-radius: 50%;
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  opacity: 0.3;
  filter: blur(2px);
  animation: ${floatParticle} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  z-index: 1;
`;

const BookImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.35s ease;
`;

const SpinnerWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 16px;

  background: linear-gradient(
    to top,
    rgba(0, 0, 0, 0.85),
    rgba(0, 0, 0, 0.5),
    rgba(0, 0, 0, 0.2),
    transparent
  );

  opacity: 0;
  transform: translateY(10px);
  transition: opacity 0.3s ease, transform 0.3s ease;
  z-index: 3;
`;

const Title = styled.h5`
  margin: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Author = styled.p`
  margin: 4px 0 0;
  color: #ccc;
  font-size: 0.85rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ButtonWrapper = styled.div`
  margin-top: 8px;
  display: flex;
  justify-content: center;
`;

const BookImageWithLoading = withImageLoading(BookImage);

const particleColors = ["#ff416c", "#ff4b2b", "#ffe259", "#00c6ff", "#0072ff"];

const BookCard = ({ isbn, thumbnail, title, author, onClick }) => {
  const particles = Array.from({ length: 5 }, () => ({
    size: Math.random() * 6 + 3,
    top: Math.random() * 100,
    left: Math.random() * 100,
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
    duration: Math.random() * 10 + 6,
    delay: Math.random() * 4,
  }));

  return (
    <CardWrapper>
        <Card onClick={onClick}>
          {particles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
          <Mosaic thumbnail={thumbnail} blur={14} tileSize={140} opacity={0.35}>
            <BookImageWithLoading src={thumbnail} alt={title} />
            <Overlay className="overlay">
              <Title title={title}>{title}</Title>
              <Author title={author}>{author}</Author>
            </Overlay>
          </Mosaic>
        </Card>
    </CardWrapper>
  );
};

export default BookCard;
