// import { createGlobalStyle } from "styled-components";

// export const GlobalStyle = createGlobalStyle`
//   * {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//     ::-webkit-scrollbar {
//       display: none;
//     }
//   }

//   body {
//     font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
//     background-color: ${({ theme }) => theme.colors.bgWhite};
//     color: #1a1a1a;
//     display: flex;
//     justify-content: center;
//     width: 100%;
//     max-width: 1440px;
//     min-width: 320px;
//     margin: 0 auto;
//   }

//   #root {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     overflow: hidden;
//   }
// `;

// GlobalStyle.ts
import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
    @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Regular.woff2') format('woff2');
    font-weight: 400;
    font-style: normal;
    font-display: swap;
  }

  @font-face {
    font-family: 'Pretendard';
    src: url('/fonts/Pretendard-Bold.woff2') format('woff2');
    font-weight: 700;
    font-style: normal;
    font-display: swap;
  }
  
  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  ::-webkit-scrollbar { display: none; }

  html, body, #root {
    width: 100%;
    min-height: 100%;
  }

  body {
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, sans-serif;
    background-color: ${({ theme }) => theme.colors.bgWhite};
    color: #1a1a1a;

    /* ✅ 고정폭 제거 + 항상 가운데 */
    display: block;
    max-width: none;
    margin: 0 auto;

    /* ✅ 가로 초과 강제 차단 */
    overflow-x: hidden;
  }

  #root {
    width: 100%;
    display: block;
    overflow: clip;
  }

  img, video, canvas {
    max-width: 100%;
    height: auto;
  }
`;
