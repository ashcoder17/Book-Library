import { Link } from "react-router-dom";
import styled from "styled-components";

const CardWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Card = styled.div`
  border: 2px solid rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  background-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(2px);
  padding: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden; 
`;

const Section = styled.div`
  width: 100%;
  text-align: center;
  padding-bottom: 10px;
  margin-bottom: 10px;
  border-bottom: 1px solid #ccc;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const BookImage = styled.img`
  max-width: 100%;
  max-height: 150px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
`;

const Title = styled.h5`
  margin: 0;
  font-size: 1rem;
`;

const Author = styled.p`
  margin: 0;
  font-size: 0.9rem;
`;

const BookCard = ({ isbn, thumbnail, title, author }) => {
  return (
    <CardWrapper>
      <Link to={`/book/${isbn}`} style={{ textDecoration: "none", width: "100%" }}>
        <Card>
          <Section>
            <BookImage src={thumbnail} alt="Book Cover" />
          </Section>

          <Section title={title}>
            <Title>{title}</Title>
          </Section>

          <Section title={author}>
            <Author>{author}</Author>
          </Section>
        </Card>
      </Link>
    </CardWrapper>
  );
};

export default BookCard;
