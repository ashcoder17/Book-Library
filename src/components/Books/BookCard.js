// src/components/Books/BookCard.js
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Card = styled.div`
  border: 1px solid #ddd;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  width: 200px;
`;

const BookCard = ({ book }) => {
  return (
    <Card>
      <h3>{book.title}</h3>
      <p>Author: {book.author}</p>
      <Link to={`/book/${book.id}`}>View Details</Link>
    </Card>
  );
};

export default BookCard;