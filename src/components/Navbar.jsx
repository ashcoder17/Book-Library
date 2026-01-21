import { NavLink } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "./ThemeContext";

const glow = keyframes`
  0% { text-shadow: 0 0 4px rgba(229,9,20,0.4); }
  50% { text-shadow: 0 0 12px rgba(229,9,20,0.8); }
  100% { text-shadow: 0 0 4px rgba(229,9,20,0.4); }
`;

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 80px;
  height: 70px;
  background-color: #121212;
  border-bottom: 1px solid #222;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: box-shadow 0.3s ease, backdrop-filter 0.3s ease;

  &.scrolled {
    box-shadow: 0 6px 20px rgba(0,0,0,0.7);
    backdrop-filter: blur(6px);
  }
`;

const LinksWrapper = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500;
  padding: 10px 15px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  height: 100%;
  transition: all 0.3s ease;

  &:hover {
    color: #fff;
    transform: translateY(-2px);
    background: linear-gradient(90deg, #e50914, #ff1a2d);
    box-shadow: 0 0 8px rgba(229,9,20,0.6);
    animation: ${glow} 1s infinite;
  }

  &.active {
    color: #e50914;
    font-weight: 600;
    background: transparent;
    border-bottom: 3px solid #e50914;
  }
`;

const DarkModeButton = styled.button`
  padding: 8px 16px;
  font-size: 14px;
  background-color: #e50914;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.25s ease, transform 0.2s ease;

  &:hover {
    background-color: #ff1a2d;
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 4px 12px rgba(229,9,20,0.6);
  }
`;

const Brand = styled.div`
  font-size: 1.8rem;
  font-weight: 700;
  color: #e50914;
  letter-spacing: 1px;
  user-select: none;
`;

const Navbar = () => {
  const { darkMode, toggleDarkMode } = useContext(ThemeContext);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Nav className={scrolled ? "scrolled" : ""}>
      <Brand>MyBooks</Brand>
      <LinksWrapper>
        <StyledLink to="/">Home</StyledLink>
        <StyledLink to="/books">All Books</StyledLink>
        <StyledLink to="/add">Add Book</StyledLink>
        <StyledLink to="/mybooks">My Books</StyledLink>
        <StyledLink to="/about">About</StyledLink>
        <DarkModeButton onClick={toggleDarkMode}>
          {darkMode ? "☀️" : "🌙"}
        </DarkModeButton>
      </LinksWrapper>
    </Nav>
  );
};

export default Navbar;
