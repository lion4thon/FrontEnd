import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/theme";
import { GlobalStyle } from "./styles/GlobalStyle";

import AppLayout from "./layouts/AppLayout";
import Onboarding from "./components/Onboarding/Onboarding";
import PackagePage from "./pages/Package/PackagePage";
import SurveyPage from "./pages/Package/Survey/SurveyPage";
import Create from "./pages/Create/Create";
import StoreInformation from "./pages/Create/StoreInformation";
import Mypage from "./pages/Mypage/Mypage";
import Report from "./pages/Mypage/Report";
import { getAccessToken, setAccessToken } from "./utils/auth";

export default function App() {
  // 개발 환경에서 토큰이 없으면 자동으로 설정 (백엔드 팀원이 제공한 토큰)
  useEffect(() => {
    if (import.meta.env.DEV) {
      const token = getAccessToken();
      if (!token) {
        // 백엔드 팀원이 제공한 토큰
        const devToken =
          "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJuYWV1bm1pbjEyMyIsImlkIjoxLCJhdXRoIjoiUk9MRV9VU0VSIiwiZXhwIjoxNzYzMDQyMDA3fQ.u3ljwHGTMTaqSNutmlIfJIbXAQFnK0nxpcjfoJp9kml-WobwTY9404hxtf4k-58rW4B3YqpkPXZYMB9ND9h6xQ";
        setAccessToken(devToken);
        console.log("[DEV] Access token has been set automatically");
      }
    }
  }, []);

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
            <Route path="/create" element={<Create />} />
            <Route
              path="/create/store/:storeId"
              element={<StoreInformation />}
            />
            <Route path="/mypage" element={<Mypage />} />
            <Route path="/mypage/report" element={<Report />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}
