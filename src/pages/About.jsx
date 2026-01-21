import React from "react";
import styled, { keyframes } from "styled-components";
import PageWrapper from "../components/PageWrapper";


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
  max-width: 1000px;
  display: flex;
  flex-direction: column;
  gap: 35px;
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
  margin-bottom: 20px;
`;

const Description = styled.div`
  background: #fff;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  animation: ${fadeInUp} 1s ease-out;
`;

const SubHeading = styled.h3`
  font-size: 1.8rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 700;
`;

const Text = styled.p`
  font-size: 1.2rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 15px;
  text-align: left;
  letter-spacing: 0.5px;
`;

const TechnologyList = styled.ul`
  display: flex;
  justify-content: center;
  gap: 30px;
  flex-wrap: wrap;
  margin-top: 15px;
`;

const TechnologyItem = styled.li`
  font-size: 1.1rem;
  color: #3498db;
  font-weight: 500;
  transition: color 0.3s ease;

  &:hover {
    color: #ff416c;
  }
`;

const About = () => (
  <PageWrapper>
    <Container>
      <Heading>About This Project</Heading>

      <Description>
        <SubHeading>Overview</SubHeading>
        <Text>
          This <b>Library Management System</b> is an interactive web application built with <b>React</b>. It allows users to manage their book collection, search for books by different criteria, and add them to their personal library.
          Users can also remove books and keep track of their favorite books in a clean and minimalistic interface.
        </Text>

        <SubHeading>Features</SubHeading>
        <Text>
          The system includes features such as:
          <ul style={{ textAlign: "left", marginTop: "10px" }}>
            <li>- Search for books by Title, Author, or ISBN</li>
            <li>- Sort books by Relevance, Newest, or Rating</li>
            <li>- Add books to your library and remove them at any time</li>
            <li>- View your personal library and browse your collection easily</li>
            <li>- Responsive design for both mobile and desktop devices</li>
          </ul>
        </Text>

        <SubHeading>Technology Stack</SubHeading>
        <Text>
          This project is built using modern web technologies:
        </Text>

        <TechnologyList>
          <TechnologyItem>React</TechnologyItem>
          <TechnologyItem>Styled-components</TechnologyItem>
          <TechnologyItem>React Router</TechnologyItem>
          <TechnologyItem>Local Storage API</TechnologyItem>
          <TechnologyItem>JavaScript (ES6+)</TechnologyItem>
        </TechnologyList>

        <SubHeading>How It Works</SubHeading>
        <Text>
          This system uses the Local Storage API to store and retrieve your book collection, ensuring your data is saved across page reloads. The books are fetched from an external API (or locally) and dynamically displayed based on your search and sorting preferences.
        </Text>
      </Description>
    </Container>
  </PageWrapper>
);

export default About;
