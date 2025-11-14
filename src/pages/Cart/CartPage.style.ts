import styled from "styled-components";

export const Container = styled.div`
  --header-h: 90px; /* 프로젝트 헤더 높이에 맞춰 조정 */

  width: 100%;
  max-width: 1160px;
  margin: 0 auto;

  height: 100dvh; /* 화면 스크롤 잠금용: 컨테이너를 뷰포트 높이에 고정 */
  overflow: visible; /* 바깥 스크롤 금지 */

  padding: 24px 20px 24px;
  box-sizing: border-box;
  background: #f5f7fd;
  text-align: left;
`;

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 360px; /* 좌: 가변, 우: 360px */
  gap: 24px;
  min-height: 0; /* 내부 스크롤 위한 축소 허용 */
`;

export const LeftCol = styled.div`
  position: sticky;
  top: calc(var(--header-h) + 20px);
  align-self: start;

  height: calc(100dvh - (var(--header-h) + 20px + 24px)); /* 오프셋 고려 */
  min-height: 0;
`;

export const Panel = styled.section`
  background: #ffffff;
  border: 1px solid #e1e6f3;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(33, 61, 117, 0.06);
  overflow: hidden;

  display: flex;
  flex-direction: column;
  height: 100%;
  text-align: left;
`;

export const PanelHeader = styled.h2`
  margin: 0;
  padding: 18px 22px;
  font-size: 22px;
  font-weight: 900;
  color: #151a2b;
  border-bottom: 1px solid #eef2fb;

  position: sticky;
  top: 0;
  z-index: 1;
  background: #fff;
`;

export const OrderList = styled.ul`
  margin: 0;
  padding: 18px 22px;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 14px;
  overflow: auto; /* 리스트만 스크롤 */
  flex: 1;
  min-height: 0;
  background-color: #eef1f9;
`;

export const OrderFooter = styled.div`
  padding: 16px 22px 22px;

  position: sticky;
  bottom: 0;
  z-index: 1;
  background: #fff;
  box-shadow: 0 -6px 12px rgba(20, 40, 80, 0.04);
`;

export const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px;
  border: 1px solid #e2e7f5;
  border-radius: 14px;
  background: #f8faff;

  span {
    font-size: 14px;
    color: #667399;
    font-weight: 700;
  }
  strong {
    font-size: 18px;
    font-weight: 900;
    color: #151a2b;
  }
`;

export const RightCol = styled.aside``;

export const RightPanel = styled.section`
  position: sticky;
  background: #ffffff;
  border: 1px solid #e1e6f3;
  border-radius: 18px;
  box-shadow: 0 8px 24px rgba(33, 61, 117, 0.06);
  padding: 0;
  text-align: left;
  overflow: hidden;
`;

export const RightHeader = styled.h2`
  margin: 0;
  padding: 20px 24px;
  font-size: 22px;
  font-weight: 900;
  color: #151a2b;
  border-bottom: 1px solid #eef2fb;
`;

export const RightBody = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Section = styled.div`
  display: grid;
  /* grid-template-columns: 120px 1fr auto; */
  grid-template-columns: 68px 1fr auto;
  align-items: flex-start;
  padding: 16px 24px;
  border-top: 1px solid #eef2fb;
`;

export const RowLabel = styled.div`
  font-size: 14px;
  font-weight: 800;
  color: #5f6b88;
`;

export const RowContent = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 4px;
  font-size: 15px;
  color: #1a2745;
  line-height: 1.4;
  text-align: center;

  .ok {
    color: #416ef0;
    font-weight: 700;
  }
`;

export const OkRow = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: flex-end;
  gap: 6px;
  font-size: 15px;
  color: #416ef0;
  font-weight: 700;

  img {
    width: 18px;
    height: 18px;
    object-fit: contain;
  }
`;

export const RowTail = styled.div`
  text-align: right;
  align-self: center;

  b {
    font-size: 14px;
    font-weight: 800;
    color: #1a2745;
    white-space: nowrap;
  }
`;

export const TotalPrice = styled.strong`
  font-size: 22px;
  font-weight: 900;
  color: #151a2b;
  white-space: nowrap;
`;

export const PayWrap = styled.div`
  position: fixed;
  right: calc(
    (100vw - min(100vw, 1160px)) / 2 + 20px
  ); /* 컨테이너 내부 오른쪽 20px */
  margin-top: 10px;
  width: 360px; /* 오른쪽 컬럼과 동일 */
  //   z-index: 20;
`;

export const PayButton = styled.button`
  width: 100%;
  height: 64px;
  border-radius: 18px;
  border: none;
  background: #5a73ff;
  color: #fff;
  font-weight: 900;
  font-size: 19px;
  cursor: pointer;
  text-align: center;
  box-shadow: 0 10px 24px rgba(90, 115, 255, 0.26);

  &:disabled {
    background: #c9d2ff;
    cursor: not-allowed;
    box-shadow: none;
  }
`;
