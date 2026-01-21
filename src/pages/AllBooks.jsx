import React, { useState, useEffect } from "react";
import PageWrapper from "../components/PageWrapper";
import styled, { keyframes } from "styled-components";

const shine = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const Container = styled.div`
  margin: 60px auto;
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  font-family: "Poppins", sans-serif;
  text-align: center;
  padding: 20px;
`;

const Heading = styled.h2`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(90deg, #ff416c, #ff4b2b, #ffe259);
  background-size: 200% auto;
  color: transparent;
  -webkit-background-clip: text;
  background-clip: text;
  animation: ${shine} 3s linear infinite;
  margin-bottom: 30px;
`;

const CategoryGrid = styled.div`
  display: grid;
  gap: 30px;
  grid-template-columns: repeat(2, 1fr);

  @media (min-width: 480px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1024px) {
    grid-template-columns: repeat(5, 1fr);
  }
`;

const CategoryCard = styled.div`
  background: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: bold;
  font-size: 1.3rem;
  color: #3498db;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
  }
`;

const PlaceholderText = styled.p`
  font-size: 1.1rem;
  color: #777;
  font-weight: 500;
`;

const AllBooks = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = () => {
      setTimeout(() => {
        setCategories([
          "Fiction",
          "Non-fiction",
          "Sci-Fi",
          "Biography",
          "Mystery",
          "Fantasy",
          "Self-help",
          "Historical"
        ]);
        setLoading(false);
      }, 1000);
    };

    fetchCategories();
  }, []);

  return (
    <PageWrapper>
      <Container>
        <Heading>Library Catalog</Heading>

        {loading ? (
          <PlaceholderText>Loading categories...</PlaceholderText>
        ) : (
          <CategoryGrid>
            {categories.map((category, index) => (
              <CategoryCard key={index}>
                {category}
              </CategoryCard>
            ))}
          </CategoryGrid>
        )}
      </Container>
    </PageWrapper>
  );
};

export default AllBooks;
