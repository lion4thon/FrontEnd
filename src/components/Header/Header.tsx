// src/components/Header/Header.tsx
import { useState } from "react";
import H from "./Header.styles";
import BK from "../../assets/MOV.svg";

import Dialog from "../Dialog/Dialog";
import LoginModalBody from "../Account/LoginModal";
import { useAuth } from "../../providers/AuthProvider";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const handleOpenLogin = () => setOpenLogin(true);
  const handleCloseLogin = () => setOpenLogin(false);

  return (
    <>
      <H.Container>
        <H.Inner>
          <H.Logo src={BK} alt="MOV Logo" />
          <H.NavMenu>
            <H.NavItem>홈</H.NavItem>
            <H.NavItem onClick={() => navigate("/create")}>패키지 생성</H.NavItem>
            <H.NavItem>패스</H.NavItem>
            <H.NavItem onClick={() => navigate("/mypage")}>마이페이지</H.NavItem>
          </H.NavMenu>

          <H.UserMenu>
            {isLoggedIn ? (
              // 5번: 로그인 상태일 때 – 로그아웃 버튼만 노출
              <H.LoginButton type="button" onClick={logout}>
                로그아웃
              </H.LoginButton>
            ) : (
              // 비로그인 상태 – 회원가입 / 로그인 버튼
              <>
                <H.SignUp>회원가입</H.SignUp>
                <H.LoginButton type="button" onClick={handleOpenLogin}>
                  로그인
                </H.LoginButton>
              </>
            )}
          </H.UserMenu>
        </H.Inner>
      </H.Container>

      {/* 로그인 모달 */}
      <Dialog open={openLogin} onClose={handleCloseLogin}>
        <LoginModalBody
          onClose={handleCloseLogin}
          onSuccess={handleCloseLogin} // 로그인 성공 -> 상태는 refresh()에서 갱신, 모달만 닫기
        />
      </Dialog>
    </>
  );
}
