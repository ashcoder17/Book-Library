import styled from "styled-components";

const BookGrid = styled.div`
  display: grid;
  gap: 24px; /* slightly larger gap for breathing space */
  justify-content: center;

  grid-template-columns: repeat(2, minmax(140px, 1fr));

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, minmax(160px, 1fr));
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, minmax(180px, 1fr));
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, minmax(200px, 1fr));
  }

  @media (min-width: 1280px) {
    grid-template-columns: repeat(6, minmax(220px, 1fr));
  }

  @media (min-width: 1600px) {
    grid-template-columns: repeat(7, minmax(240px, 1fr));
  }
`;

export default BookGrid;
