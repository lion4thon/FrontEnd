import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import AppLayout from "./layouts/AppLayout";
import Onboarding from "./components/Onboarding/Onboarding";
import PackagePage from "./pages/Package/PackagePage";
import SurveyPage from "./pages/Package/Survey/SurveyPage";
<<<<<<< Updated upstream
=======
import Create from "./pages/Create/Create";
import CartPage from "./pages/Cart/CartPage";
// import ReserveCalendarModal from "./components/Modal/ReserveModal";
>>>>>>> Stashed changes

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Onboarding />} />
            <Route path="/package" element={<PackagePage />} />
            <Route path="/package/survey" element={<SurveyPage />} />
            <Route path="/package/survey/:page" element={<SurveyPage />} />
<<<<<<< Updated upstream
=======
            <Route path="/create" element={<Create />} />
            <Route path="/cart" element={<CartPage />} />
            {/* <Route path="/reserve" element={<ReserveCalendarModal />} /> */}
>>>>>>> Stashed changes
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
