import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  display: flex;
  gap: 20px;
  padding: 12px 24px;
  background-color: #2c3e50;
`;

const StyledLink = styled(NavLink)`
  color: white;
  text-decoration: none;

  &.active {
    border-bottom: 2px solid white;
  }
`;

const Navbar = () => {
  return (
    <Nav>
      <StyledLink to="/">Home</StyledLink>
      <StyledLink to="/books">All Books</StyledLink>
      <StyledLink to="/add">Add Book</StyledLink>
      <StyledLink to="/about">About</StyledLink>
    </Nav>
  );
};

export default Navbar;
