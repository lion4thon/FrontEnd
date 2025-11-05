import H from "./Header.styles.ts";
import BK from "../../assets/BK.png";

export default function Header() {
  return (
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
          <H.LoginButton>로그인</H.LoginButton>
        </H.UserMenu>
      </H.Inner>
    </H.Container>
  );
}
