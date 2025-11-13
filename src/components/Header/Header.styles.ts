import styled from "styled-components";

const H = {
  // 전체 헤더 영역
  Container: styled.header`
    display: flex;
    align-items: center;
    height: 90px;
    width: 100vw;
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
    padding: 0;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

    box-sizing: border-box; /* FIX: 패딩 포함한 폭 계산 안정화 */

    /* FIX: 상위/전역에서 writing-mode가 흘러올 때 강제 가로 레이아웃 */
    &,
    & * {
      writing-mode: horizontal-tb;
      text-orientation: mixed;
    }
  `,

  // 내부 flex 영역
  Inner: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0;
    width: 100%;
    padding: 0 120px;
    box-sizing: border-box;
    position: relative;
  `,

  // 로고 이미지
  Logo: styled.img`
    width: 240px;
    height: auto;
    flex-shrink: 0;
    margin-left: 0;
  `,

  // 중앙 네비게이션 메뉴
  NavMenu: styled.nav`
    display: flex;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    align-items: center;
    gap: 80px;
    white-space: nowrap; /* FIX: 한글이 문자 단위 줄바꿈 되는 현상 방지 */
  `,

  NavItem: styled.a`
    font-family: "Pretendard", sans-serif;
    font-size: 18px;
    font-weight: 500;
    line-height: 150%;
    color: var(--black);
    cursor: pointer;
    transition: all 0.2s ease;

    white-space: nowrap; /* FIX: 메뉴 텍스트 강제 단어 줄바꿈 방지 */

    &:hover {
      color: var(--primary-03);
    }
  `,

  // 우측 로그인/회원가입 영역
  UserMenu: styled.div`
    display: flex;
    flex-shrink: 0;
    justify-content: flex-end;
    align-items: center;
    gap: 32px;

    white-space: nowrap; /* FIX: 버튼/텍스트 세로 깨짐 방지 */
    flex-wrap: nowrap; /* FIX: 좁을 때도 줄바꿈 금지 */
  `,

  SignUp: styled.span`
    font-family: var(--caption-font-family);
    font-size: var(--caption-font-size);
    font-weight: var(--caption-font-weight);
    color: #333333;
    cursor: pointer;

    white-space: nowrap; /* FIX */
    line-height: 1; /* FIX: 수직 정렬 흔들림 방지 */
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

    white-space: nowrap; /* FIX: '로그인' 세로로 갈라짐 방지 */
    line-height: 1; /* FIX: 버튼 내부 수직 가운데 안정화 */

    &:hover {
      background-color: var(--primary-02);
    }
  `,
};

export default H;
