import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PageWrapper from "../components/PageWrapper";

const HomeWrapper = styled.div`
  padding: 40px;
  font-family: Arial, sans-serif;
`;

const Section = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 40px 20px;
  margin-bottom: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: scale(1.02);
  }
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 20px;
  text-align: center;
  z-index: 2; 
`;

const SectionDescription = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  text-align: center;
  margin-bottom: 20px;
  z-index: 2;
`;

const StyledButton = styled(Link)`
  background-color: #3498db;
  color: white;
  padding: 15px 30px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 18px;
  transition: background-color 0.3s;
  z-index: 2;

  &:hover {
    background-color: #2980b9;
  }
`;

const Mosaic = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${(props) =>
    `linear-gradient(135deg, ${props.color1}, ${props.color2})`};
  z-index: 1;
  opacity: 0.8;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 2;
`;

const Home = () => (
  <PageWrapper>
    <HomeWrapper>

      <Section>
        <Mosaic color1="#C0FDFB" color2="#FEE9E1" />
        <ContentWrapper>
          <SectionTitle>Welcome to My Book Library 📚</SectionTitle>
          <SectionDescription>
            Manage your book collection, discover new books, and keep your library up-to-date.
          </SectionDescription>
          <StyledButton to="/books">Explore All Books</StyledButton>
        </ContentWrapper>
      </Section>

      <Section>
        <Mosaic color1="#FEE9E1" color2="#90E0EF" />
        <ContentWrapper>
          <SectionTitle>Add a New Book</SectionTitle>
          <SectionDescription>
            Want to add a new book to your library? Use this section to add your personal collection.
          </SectionDescription>
          <StyledButton to="/add">Add Book</StyledButton>
        </ContentWrapper>
      </Section>

      <Section>
        <Mosaic color1="#90E0EF" color2="#F8F7FF" />
        <ContentWrapper>
          <SectionTitle>My Book Collection</SectionTitle>
          <SectionDescription>
            View and manage all the books you have added to your personal library.
          </SectionDescription>
          <StyledButton to="/mybooks">View My Books</StyledButton>
        </ContentWrapper>
      </Section>

      <Section>
        <Mosaic color1="#F8F7FF" color2="#C0FDFB" />
        <ContentWrapper>
          <SectionTitle>About This App</SectionTitle>
          <SectionDescription>
            Learn more about how this app works and how you can manage your book collection effortlessly.
          </SectionDescription>
          <StyledButton to="/about">Learn More</StyledButton>
        </ContentWrapper>
      </Section>
    </HomeWrapper>
  </PageWrapper>
);

export default Home;
