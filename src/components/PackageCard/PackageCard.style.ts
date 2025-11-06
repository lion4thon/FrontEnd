import styled from "styled-components";

/* 공통 값 */
const radiusCard = "24px";
const radiusInner = "18px";

export const Card = styled.div`
  cursor: pointer;
  width: 240px;
  height: 392px;
  padding: 9px 10px 16px 10px;
  box-sizing: border-box;
  border-radius: ${radiusCard};
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid rgba(26, 26, 26, 0.06);
  box-shadow: 4px 4px 20px 0px #00000026;

  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform 0.18s ease, box-shadow 0.18s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 18px 44px #00000026;
  }

  z-index: 999;
`;

/* 이미지 래퍼 */
export const ThumbWrap = styled.div`
  position: relative;
  width: 224px;
  height: 255px;
  border-radius: ${radiusInner};
  overflow: hidden;
  background: #d9d9d9;

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 55%,
      rgba(244, 247, 255, 0.85) 88%,
      ${({ theme }) => theme.colors.gray50} 100%
    );
    pointer-events: none;
  }
`;

export const Thumb = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
`;

/* 상단 배지 */
export const Badge = styled.span`
  position: absolute;
  top: 10px;
  left: 10px;
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 6px 14px rgba(67, 104, 255, 0.25);
`;

export const Info = styled.div`
  width: 100%;
  padding: 14px 6px 0;
`;

export const Title = styled.h3`
  font-size: 17px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.black};
  line-height: 1.4;
`;

export const Meta = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  color: ${({ theme }) => theme.colors.gray600};
  font-size: 13px;
`;

export const Dot = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
`;

// 내용 태그
export const Tags = styled.ul`
  margin: 5px 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  li {
    height: 28px;
    display: inline-flex;
    align-items: center;
    padding: 0 10px;
    border-radius: 999px;
    background: linear-gradient(
        ${({ theme }) => theme.colors.gray50},
        ${({ theme }) => theme.colors.gray50}
      )
      padding-box;
    border: 1px solid ${({ theme }) => theme.colors.borderPrimary};
    color: ${({ theme }) => theme.colors.gray700};
    font-size: 14px;
    font-weight: 500;
  }
`;

export const PriceRow = styled.div`
  margin-top: 12px;
  display: flex;
  align-items: baseline;
  gap: 6px;

  span {
    color: ${({ theme }) => theme.colors.gray600};
    font-size: 12px;
    font-weight: 600;
  }
`;
