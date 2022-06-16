import React from "react";
import styled from "styled-components";

const HeaderLogo = () => {
  return <Logo>Fundraiser</Logo>;
};

const Logo = styled.h1`
  font-weight: bold;
  font-size: 32px;
  margin-left: 12px;
  box-sizing: border-box;
  cursor: pointer;
`;

export default HeaderLogo;
