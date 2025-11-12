import { createContext, useContext, useEffect, useState } from "react";

type AuthState = {
  isLoggedIn: boolean;
  surveyCompleted: boolean;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [surveyCompleted, setSurveyCompleted] = useState<boolean>(false);

  // 실제 연동 시: /api/me, /api/survey/status 등으로 교체
  const refresh = async () => {
    try {
      // 임시 더미
      setIsLoggedIn(true); // 로그인 가정
      setSurveyCompleted(false); // 설문 미완 가정
      // ---------------------------------
    } catch (e) {
      console.error(e);
      setIsLoggedIn(false);
      setSurveyCompleted(false);
    }
  };

  useEffect(() => {
    void refresh();
  }, []);

  const value: AuthState = { isLoggedIn, surveyCompleted, refresh };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
