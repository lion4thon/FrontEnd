import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// 페이지 import
import PackagePage from "../src/pages/Package/PackagePage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/package" element={<PackagePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
