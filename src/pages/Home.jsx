import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import PageWrapper from "../components/PageWrapper";
import { ThemeContext } from "../components/ThemeContext";

const fadeInUp = keyframes`
  0% { opacity: 0; transform: translateY(20px);}
  100% { opacity: 1; transform: translateY(0);}
`;

const gradientShift = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const floatUp = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0.3; }
  50% { opacity: 0.6; }
  100% { transform: translateY(-200px) rotate(360deg); opacity: 0; }
`;

const floatDiamond = keyframes`
  0% { transform: translateY(0) rotate(45deg); opacity: 0.2; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-150px) rotate(405deg); opacity: 0; }
`;

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 60px;
  padding: 60px 20px;
  min-height: 100vh;
  transition: background 0.3s, color 0.3s;
`;

const Hero = styled.div`
  position: relative;
  border-radius: 16px;
  padding: 100px 40px;
  text-align: center;
  overflow: hidden;
  animation: ${fadeInUp} 0.8s ease forwards;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(270deg, #ff416c, #ff4b2b, #ff416c);
    background-size: 600% 600%;
    animation: ${gradientShift} 12s ease infinite;
    opacity: 0.12;
    z-index: 0;
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
  opacity: 0.4;
  filter: blur(8px);
  animation: ${floatUp} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
`;

const DiamondParticle = styled.div`
  position: absolute;
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  background: ${({ color }) => color};
  transform: rotate(45deg);
  top: ${({ top }) => top}%;
  left: ${({ left }) => left}%;
  opacity: 0.25;
  filter: blur(2px);
  animation: ${floatDiamond} ${({ duration }) => duration}s linear infinite;
  animation-delay: ${({ delay }) => delay}s;
  z-index: 0;
`;

const HeroTitle = styled.h1`
  font-size: 52px;
  margin-bottom: 20px;
  color: #e50914;
  position: relative;
  z-index: 2;
`;

const HeroSubtitle = styled.p`
  font-size: 20px;
  margin-bottom: 40px;
  color: ${({ darkMode }) => (darkMode ? "#ccc" : "#555")};
  position: relative;
  z-index: 2;
`;

const HeroButton = styled(Link)`
  background-color: #e50914;
  color: #fff;
  padding: 18px 40px;
  font-size: 20px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  position: relative;
  z-index: 2;
  box-shadow: 0 6px 20px rgba(233, 9, 20, 0.5);
  transition: all 0.3s ease;

  &:hover {
    background-color: #ff1a2d;
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(233, 9, 20, 0.7);
  }
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 40px;
`;

const Card = styled(Link)`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  height: 350px;
  border-radius: 16px;
  padding: 20px;
  color: #fff;
  text-decoration: none;
  position: relative;
  overflow: hidden;
  box-shadow: ${({ darkMode }) =>
    darkMode
      ? "0 12px 30px rgba(0,0,0,0.7)"
      : "0 12px 30px rgba(0,0,0,0.25)"};
  transition: all 0.4s ease;

  &:hover {
    transform: scale(1.05);
  }

  &:before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.4), rgba(0,0,0,0.1));
    z-index: 0;
    transition: all 0.4s ease;
  }
`;

const CardContent = styled.div`
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-size: 26px;
  margin-bottom: 10px;
`;

const CardDescription = styled.p`
  font-size: 16px;
`;

const colors = [
  { bg1: "#ff7e5f", bg2: "#feb47b" },
  { bg1: "#6a11cb", bg2: "#2575fc" },
  { bg1: "#43cea2", bg2: "#185a9d" },
];

const particleColors = ["#ff416c", "#ff4b2b", "#ffe259", "#00c6ff", "#0072ff"];

const Home = () => {
  const { darkMode } = useContext(ThemeContext);

  useEffect(() => {
    document.body.style.background = darkMode ? "#1e1e1e" : "#f5f5f5";
    document.body.style.color = darkMode ? "#e0e0e0" : "#121212";
  }, [darkMode]);

  const heroParticles = Array.from({ length: 15 }, (_, i) => ({
    size: Math.random() * 40 + 20,
    top: Math.random() * 100,
    left: Math.random() * 100,
    color: particleColors[Math.floor(Math.random() * particleColors.length)],
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 10,
  }));

  const generateDiamondParticles = () =>
    Array.from({ length: 4 }, () => ({
      size: Math.random() * 12 + 6,
      top: Math.random() * 100,
      left: Math.random() * 100,
      color: particleColors[Math.floor(Math.random() * particleColors.length)],
      duration: Math.random() * 8 + 5,
      delay: Math.random() * 3,
    }));
  return (
    <PageWrapper>
      <HomeWrapper>
        <Hero>
          {heroParticles.map((p, i) => (
            <Particle key={i} {...p} />
          ))}
          <HeroTitle>Welcome to My Book Library 📚</HeroTitle>
          <HeroSubtitle darkMode={darkMode}>
            Discover, add, and manage your personal book collection effortlessly.
          </HeroSubtitle>
          <HeroButton to="/books">Explore Books</HeroButton>
        </Hero>

        <SectionGrid>
          {colors.map((c, idx) => {
            const links = ["/add", "/mybooks", "/about"];
            const titles = ["Add a New Book", "My Book Collection", "About This App"];
            const descs = [
              "Add your personal collection quickly.",
              "View and manage all your books.",
              "Learn how to use the library efficiently.",
            ];
            const diamondParticles = generateDiamondParticles();

            return (
              <Card
                key={idx}
                to={links[idx]}
                darkMode={darkMode}
                style={{
                  background: `linear-gradient(135deg, ${c.bg1}, ${c.bg2})`,
                }}
              >
                {diamondParticles.map((p, i) => (
                  <DiamondParticle key={i} {...p} />
                ))}
                <CardContent>
                  <CardTitle>{titles[idx]}</CardTitle>
                  <CardDescription>{descs[idx]}</CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </SectionGrid>
      </HomeWrapper>
    </PageWrapper>
  );
};

export default Home;
