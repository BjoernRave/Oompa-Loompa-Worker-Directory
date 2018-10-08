import React from "react";
import OompaLogo from "../images/logo-umpa-loompa.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default () => {
  return (
    <Header>
      <Link to="/">
        <Logo src={OompaLogo} alt="Oompa Lumpa Logo" />
      </Link>
      <h2>Oompa Loompa Crew</h2>
    </Header>
  );
};

const Header = styled.div`
  display: flex;
  flex-direction: row;
  position: fixed;
  top: 0;
  background-color: #23bab5;
  width: 100%;
`;

const Logo = styled.img`
  height: 50px;
  padding: 5px 20px;
`;
