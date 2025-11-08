import styled from "styled-components";

export const Wrap = styled.footer`
  width: 100%;
  background: #e9edf4;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

export const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 56px 24px 40px;
  box-sizing: border-box;
`;

// 로고 + 카테고리
export const Upper = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  flex-shrink: 0;
`;

export const Logo = styled.img`
  display: block;
  width: 500px
  max-width: 100%;
  height: auto;
  object-fit: contain;
`;

// 카테고리 4개
export const Columns = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
`;

// 카테고리별 스타일
export const Col = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 12px;
  min-width: 160px;
`;

export const Title = styled.h3`
  margin: 0 0 6px;
  font-size: 18px;
  font-weight: 700;
  color: #111827;
`;

export const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
`;

export const Item = styled.li``;

export const A = styled.a`
  display: inline-block;
  font-size: 14px;
  color: #374151;
  text-decoration: none;

  &:hover {
    color: #111827;
    text-decoration: underline;
  }
`;

export const Bottom = styled.div`
  display: flex;
  gap: 18px;
  align-items: center;
  justify-content: center;
  border-top: 1px solid rgba(0, 0, 0, 0.06);
  margin-top: 40px;
  padding-top: 16px;
  color: #4b5563;
  font-size: 13px;
  flex-wrap: wrap;
`;

export const BottomLink = styled.a`
  color: #374151;
  text-decoration: none;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
