import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

// Контейнер для навигационной панели
const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #282c34;
  padding: 10px;
`;

// Стили для ссылок
const Link = styled(NavLink)`
  color: white;
  text-decoration: none;
  font-size: 18px;
  margin: 0 10px;

  /* Стили для активных ссылок */
  &.active {
    color: #61dafb;
    font-weight: bold;
  }
`;

const Navbar: React.FC = () => {
  return (
    <NavbarContainer>
      <Link to="/products" className={"active"}>
        Products
      </Link>
      <Link to="/create-product" className={"active"}>
        Create Product
      </Link>
    </NavbarContainer>
  );
};

export default Navbar;
