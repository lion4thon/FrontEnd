import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    ::-webkit-scrollbar {
      display: none;
    }
  }

  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    color: #1a1a1a;
    display: flex;
    justify-content: center;
    width: 100%;
    max-width: 1440px;
    min-width: 320px;
    margin: 0 auto;
  }

  #root {
    width: 100%;
    display: flex;
    justify-content: center;
    overflow: hidden;
  }
`;
