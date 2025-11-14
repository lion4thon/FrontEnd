import styled from "styled-components";

export const Page = styled.main`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 88px 120px;
`;

// 헤더
export const Header = styled.header`
  margin-bottom: 24px;
`;

export const Title = styled.h1`
  width: 100%;
  margin: 40px 0 24px;
  text-align: left;

  h1 {
    font-family: "Pretendard";
    font-weight: 500;
    font-size: 26px;
    line-height: 140%;
    letter-spacing: 0.02em;
    color: #1a1a1a;
    margin-bottom: 8px;
  }
`;

// 설문진행률
export const Segments = styled.div<{ $count: number }>`
  display: grid;
  grid-template-columns: repeat(${({ $count }) => $count}, 1fr);
  gap: 24px;
  margin-top: 10px;
`;

export const SegTrack = styled.div`
  height: 8px;
  background: #e9ecf5;
  border-radius: 20px;
  overflow: hidden;
`;

export const SegFill = styled.div<{ $ratio: number }>`
  width: ${({ $ratio }) => Math.round($ratio * 100)}%;
  height: 100%;
  border-radius: 20px;
  transition: width 0.25s ease;
  background: ${({ theme }) => theme.colors.primary};
`;

// 본문
export const Section = styled.section`
  display: grid;
  gap: 24px;
`;

// 활성 이상만 테두리
export const Card = styled.article<{ $active?: boolean; $completed?: boolean }>`
  border-radius: 20px;
  padding: 28px;
  box-shadow: 0 1px 0 rgba(0, 0, 0, 0.02);

  ${({ $active, $completed, theme }) =>
    $active || $completed
      ? `
        background:
          linear-gradient(${theme.colors.gray50}, ${theme.colors.gray50}) padding-box,
          linear-gradient(
            275deg,
            rgba(71,106,252,1) 0%,
            rgba(136,150,255,1) 42%,
            rgba(197,214,255,1) 71%,
            rgba(129,222,206,1) 93%,
            rgba(76,229,167,1) 100%
          ) border-box;
        border: 1px solid transparent;
      `
      : `
        background: ${theme.colors.gray50};
        border: 1px solid ${theme.colors.gray300};
      `}
`;

export const Number = styled.div`
  color: #7a80a0;
  font-size: 13px;
  margin-bottom: 10px;
`;

// 하단 버튼
export const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  margin-top: 28px;
`;

export const NavBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 12px 18px;
  border-radius: 12px;
  font-size: 15px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.colors.gray100};
  }

  &:disabled {
    opacity: 0.55;
    cursor: default;
  }
`;
