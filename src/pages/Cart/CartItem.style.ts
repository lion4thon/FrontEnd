import styled from "styled-components";

export const Box = styled.div<{ $open: boolean; $confirmed?: boolean }>`
  /* 확정 전에는 파란 단색, 확정 후에는 그라데이션 */
  border: 1.5px solid
    ${({ $open, $confirmed }) =>
      $confirmed ? "transparent" : $open ? "#6f7cff" : "#b7c4ff"};
  border-radius: 28px;
  background: ${({ $confirmed }) =>
    $confirmed
      ? `
        /* 내부 면은 기존 배경, 외곽선만 그라데이션 */
        linear-gradient(#f9faff, #f9faff) padding-box,
        linear-gradient(135deg, #6f7cff 0%, #37d1c9 100%) border-box
      `
      : "#f9faff"};
  transition: border-color 0.25s ease, box-shadow 0.25s ease,
    background 0.25s ease;
  overflow: hidden;
`;

export const Header = styled.div`
  display: grid;
  grid-template-columns: 160px 1fr 28px;
  gap: 14px;
  align-items: center;
  padding: 8px;
  cursor: pointer;
`;

export const ThumbWrap = styled.div`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  border: 0.5px solid #c1c6d1;
  overflow: hidden;
  flex-shrink: 0;
`;

export const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 0;
`;

export const Title = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #151a2b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Desc = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #7d818e;
  line-height: 1.5;
  max-height: 3.2em;
  overflow: hidden;
`;

export const PriceBig = styled.strong`
  font-size: 22px;
  font-weight: 500;
  color: #2c2f36;
`;

export const RemoveBtn = styled.button`
  position: relative;
  bottom: 60px;
  border: 0;
  background: transparent;
  font-size: 20px;
  color: #8e95a9;
  cursor: pointer;
`;

export const Divider = styled.div`
  height: 1px;
  background: #dfe4fb;
  margin: 4px 16px 0;
`;

export const FooterToggle = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 0 16px;
  background: transparent;
  border: 0;
  cursor: pointer;

  span {
    font-size: 16px;
    font-weight: 600;
    color: #3d59ff;
    letter-spacing: -0.2px;
  }

  &:focus-visible {
    outline: 2px solid rgba(93, 118, 255, 0.5);
    outline-offset: 3px;
    border-radius: 12px;
  }
`;

export const CaretIcon = styled.img<{ $open: boolean }>`
  object-fit: contain;
  opacity: 0.9;
  transition: transform 0.18s ease;
`;

export const Dropdown = styled.div<{ $open: boolean }>`
  background: #f6f8ff;
  border-top: 1px solid #e4e8f6;
  padding: ${({ $open }) => ($open ? "0px 16px 16px" : "0 16px")};
  max-height: ${({ $open }) => ($open ? "999px" : "0")};
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  transition: max-height 0.28s ease, opacity 0.18s ease, padding 0.28s ease;
  overflow: hidden;

  ul {
    margin: 0;
    padding: 0;
    list-style: none;
    overflow: hidden;
  }

  li + li {
    border-top: 1px solid #e7ecfb;
  }
`;

export const PrimaryCTA = styled.button`
  width: 100%;
  padding: 12px 0;
  margin-top: 12px;
  border-radius: 20px;
  border: 1px solid #cfd7ff;
  background: #5562ff;
  color: #fff;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
  text-align: center;
  transition: transform 0.15s ease, box-shadow 0.15s ease, filter 0.15s ease;

  &:disabled {
    background: #bfc9ff;
    border-color: #d7dcff;
    cursor: not-allowed;
    box-shadow: none;
    filter: none;
  }
`;

// 패키지 안 세션
export const SessRow = styled.div`
  display: grid;
  grid-template-columns: 100px 1fr auto;
  gap: 12px;
  align-items: start;
  padding: 14px 0;
  background: transparent;
`;

export const SessThumb = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  object-fit: cover;
`;

export const SessInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-width: 0;
`;

export const Category = styled.span`
  align-self: flex-start;
  display: inline-flex;
  padding: 4px 8px;
  border: 1px solid #4a63ff;
  border-radius: 999px;
  font-size: 14px;
  color: #4a63ff;
  font-weight: 600;
  flex: none;
  white-space: nowrap;
`;

export const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
  flex-wrap: nowrap;
`;

export const SessTitle = styled.h4`
  margin: 0;
  font-size: 18px;
  font-weight: 500;
  color: #2c2f36;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: none;
  max-width: 220px;
`;

export const GoIcon = styled.img.attrs({ alt: "더보기" })`
  flex-shrink: 0;
  object-fit: contain;
  margin-left: 4px;
  transform: translateY(1px);
  opacity: 0.6;
`;

export const Address = styled.p`
  margin: 0;
  font-size: 14px;
  font-weight: 500;
  color: #7d818e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 14px;
  font-weight: 500;
  color: #7d818e;
`;

export const SessPrice = styled.b`
  margin-left: 6px;
  font-size: 14px;
  font-weight: 500;
  color: #2c2f36;
`;

// 예약 내역
export const RightCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-self: end;
  align-self: end;
  text-align: right;
`;

export const DateChip = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 4px 4px 4px 12px;
  border-radius: 999px;
  border: 1.5px solid #7e8cff;
  background: transparent;
  color: #1a2a57;
  font-weight: 600;
  font-size: 14px;
  white-space: nowrap;d
  cursor: pointer;
`;

export const DateChipCheck = styled.span`
  width: 26px;
  height: 26px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #7e8cff;
  color: #fff;
  font-weight: 900;

  img {
    width: 28px;
    height: 28px;
    object-fit: contain;
  }
`;

export const ReserveBtn = styled.button`
  padding: 8px 16px;
  border-radius: 26px;
  border: 0;
  background: #5a73ff;
  color: #fff;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.15s ease, box-shadow 0.15s ease;
`;
