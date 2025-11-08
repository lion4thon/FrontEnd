import styled from "styled-components";

export const Page = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background: ${({ theme }) => theme.colors.bgWhite};
  & > * {
    width: 100%;
    max-width: 1200px;
  }
`;
// margin: 0 auto;

/* 가운데 정렬되는 공통 콘텐츠 래퍼 */
export const Content = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  box-sizing: border-box;
`;

export const Greeting = styled.section`
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
    padding-left: 20px;
  }
`;

export const Spacer = styled.div`
  height: 24px;
`;

export const SectionTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  gap: 6px;

  &::before {
    display: inline-block;
  }
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 240px); /* 4열 고정 */
  gap: 20px;
  justify-content: center; /* 전체 그리드 가운데 정렬 */
  width: 1200px;
`;

export const HeaderPlaceholder = styled.div`
  height: 90px;
`;
