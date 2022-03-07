import styled, { createGlobalStyle } from "styled-components";

export const AppWrapper = styled.div`
  color: #ffffff;
  font-family: "Akaya Telivigala", cursive;
  font-family: "Bebas Neue", cursive;
  font-family: "Oswald", sans-serif;
  margin: auto;
  width: 100vw;
`;

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #222222;
  margin: 0px;
  padding: 0px;
  width: 100vw;
  }`;

export default GlobalStyle;
