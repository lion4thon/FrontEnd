import { useState } from "react";
import H from "./Header.styles.ts";
import BK from "../../assets/MOV.svg";

import Dialog from "../../components/Dialog/Dialog";
import LoginModalBody from "../../components/Account/LoginModal";

export default function Header() {
  const [openLogin, setOpenLogin] = useState(false);

  return (
    <>
      <H.Container>
        <H.Inner>
          <H.Logo src={BK} alt="BK Logo" />
          <H.NavMenu>
            <H.NavItem>패키지</H.NavItem>
            <H.NavItem>생성</H.NavItem>
            <H.NavItem>패스</H.NavItem>
            <H.NavItem>마이페이지</H.NavItem>
          </H.NavMenu>
          <H.UserMenu>
            <H.SignUp>회원가입</H.SignUp>
            <H.LoginButton onClick={() => setOpenLogin(true)}>
              로그인
            </H.LoginButton>
          </H.UserMenu>
        </H.Inner>
      </H.Container>

      {/* 로그인 모달 */}
      <Dialog open={openLogin} onClose={() => setOpenLogin(false)}>
        <LoginModalBody
          onClose={() => setOpenLogin(false)}
          onSuccess={() => {
            // TODO: 로그인 성공 후 처리(토스트/상태 갱신 등)
            setOpenLogin(false);
            console.log("로그인 성공");
          }}
        />
      </Dialog>
    </>
  );
}
