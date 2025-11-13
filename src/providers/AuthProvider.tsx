// src/providers/AuthProvider.tsx
import {
  createContext,
  useContext,
  useCallback,
  useState,
  useEffect,
} from "react";

type AuthState = {
  isLoggedIn: boolean;
  surveyCompleted: boolean;
  /** localStorage 기준으로 로그인 상태 동기화 */
  refresh: () => void;
  /** 설문 완료 여부를 프론트에서 업데이트할 때 사용 (설문 페이지에서 true로 세팅) */
  setSurveyCompleted: (v: boolean) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [surveyCompleted, _setSurveyCompleted] = useState(false);

  // 설문 완료 여부는 일단 localStorage에만 저장
  const setSurveyCompleted = useCallback((v: boolean) => {
    _setSurveyCompleted(v);
    localStorage.setItem("survey_completed", String(v));
  }, []);

  // 토큰/설문 상태를 localStorage 기준으로 동기화
  const refresh = useCallback(() => {
    const hasAccessToken = !!localStorage.getItem("access_token");
    setIsLoggedIn(hasAccessToken);

    const storedSurvey = localStorage.getItem("survey_completed");
    _setSurveyCompleted(storedSurvey === "true");
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("survey_completed");
    setIsLoggedIn(false);
    _setSurveyCompleted(false);
  }, []);

  // 앱 처음 켜질 때 한 번 localStorage 기준으로 상태 맞추기
  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        surveyCompleted,
        refresh,
        setSurveyCompleted,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
