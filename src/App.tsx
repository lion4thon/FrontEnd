import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import Onboarding from "./components/Onboarding/Onboarding";
import PackagePage from "./pages/Package/PackagePage";

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/package" element={<PackagePage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
