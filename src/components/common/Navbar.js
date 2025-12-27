// src/components/Common/Navbar.js
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background: #333;
  padding: 1rem;
  display: flex;
  gap: 20px;
  a { color: white; text-decoration: none; font-weight: bold; }
  a:hover { color: #ffbc00; }
`;

const Navbar = () => (
  <Nav>
    <Link to="/">Home</Link>
    <Link to="/all-books">All Books</Link>
    <Link to="/add-book">Add Book</Link>
    <Link to="/about">About</Link>
  </Nav>
);

export default Navbar;