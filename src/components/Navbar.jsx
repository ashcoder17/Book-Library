import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 30px;
  padding: 15px 40px;
  background-color: #34495e;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); 
  align-items: center;
  height: 60px;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  font-weight: 500; 
  padding: 10px 15px; 
  border-radius: 5px; 
  transition: all 0.3s ease; 
  display: flex;
  align-items: center;
  height: 100%; 

  &:hover {
    background-color: #1abc9c;
    color: #fff;
    transform: translateY(-2px); 
  }

  &.active {
    color: #e74c3c;
    font-weight: 600;
    background-color: transparent;
    border-bottom: 3px solid #e74c3c;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/books">All Books</StyledLink>
      <StyledLink to="/add">Add Book</StyledLink>
      <StyledLink to="/mybooks">My Books</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  );
};

export default Navbar;
