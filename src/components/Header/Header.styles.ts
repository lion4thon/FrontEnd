import styled from "styled-components";

const H = {
  // 전체 헤더 영역
  Container: styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90px;
    width: 100%;
    background-color: var(--primary-04);
    border-bottom: 1px solid transparent;
    border-image: linear-gradient(
        275deg,
        rgba(71, 106, 252, 1) 0%,
        rgba(136, 150, 255, 1) 42%,
        rgba(197, 214, 255, 1) 71%,
        rgba(129, 222, 206, 1) 93%,
        rgba(76, 229, 167, 1) 100%
      )
      1;
    padding: 10px 80px 10px 10px; /* slight left shift */
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
  `,

  // 내부 flex 영역
  Inner: styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 32px;
    width: 100%;
    max-width: 1440px;
  `,

  // 로고 이미지
  Logo: styled.img`
    flex: 1;
  `,

  // 중앙 네비게이션 메뉴
  NavMenu: styled.nav`
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    gap: 80px;
  `,

  NavItem: styled.a`
    font-family: "Pretendard", sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    color: var(--black);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      color: var(--primary-03);
    }
  `,

  // 우측 로그인/회원가입 영역
  UserMenu: styled.div`
    display: flex;
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;
  `,

  SignUp: styled.span`
    font-family: var(--caption-font-family);
    font-size: var(--caption-font-size);
    font-weight: var(--caption-font-weight);
    color: var(--gray-600);
    -webkit-text-stroke: 0.25px #ffffff;
    cursor: pointer;
  `,

  LoginButton: styled.button`
    background-color: var(--primary-03);
    border: none;
    border-radius: 30px;
    color: white;
    font-family: var(--caption-font-family);
    font-size: var(--caption-font-size);
    font-weight: var(--caption-font-weight);
    padding: 10px 25px;
    cursor: pointer;
    height: 42.75px;
    transition: all 0.2s ease;

    &:hover {
      background-color: var(--primary-02);
    }
  `,
};

export default H;
