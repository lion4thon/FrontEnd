import { useModal } from "../../hooks/useModal";
import H from "./Header.styles.ts";
import BK from "../../assets/MOV.svg";

export default function Header() {
  const { open } = useModal();

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
          <H.LoginButton
            onClick={() =>
              open("LoginModal", {
                onSuccess: () => console.log("로그인 성공"),
              })
            }
          >
            로그인
          </H.LoginButton>
        </H.UserMenu>
      </H.Inner>
    </H.Container>
  );
}
