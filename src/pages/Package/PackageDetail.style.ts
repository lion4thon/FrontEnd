import styled from "styled-components";

export const Page = styled.div`
  min-height: 100vh;
  background: #eef2ff;
`;

export const Content = styled.main`
  max-width: 1160px;
  margin: 0 auto;
  padding: 32px 24px 80px;
`;

/* 뒤로가기 */
export const BackRow = styled.div`
  margin-bottom: 16px;

  button {
    border: none;
    background: transparent;
    font-size: 14px;
    color: ${({ theme }) => theme.colors.primary};
    cursor: pointer;
  }
`;

export const StateText = styled.p`
  padding: 40px 0;
  text-align: center;
  color: #6b7280;
  font-size: 15px;
`;

export const HeroCard = styled.section`
  display: flex;
  align-items: stretch;
  gap: 32px;

  padding: 10px;

  background: #f9fafb;
  border-radius: 32px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  margin-bottom: 32px;
`;

export const HeroThumbnail = styled.div`
  border-radius: 28px;
  overflow: hidden;
  background: #e5e7eb;
  position: relative;

  /* 16:9에 가까운 비율 */
  aspect-ratio: 16 / 9;

  img {
    width: 200px;
    height: 220px;
    object-fit: cover;
  }

  .gradient {
    width: 200px;
    height: 220px;
    background: linear-gradient(to bottom, #111827, #d1d5db);
  }
`;

export const HeroContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;
`;

// 태그
export const TagRow = styled.div`
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
  margin-bottom: 12px;
`;

export const TagChip = styled.span`
  padding: 4px 12px;
  border-radius: 20px;
  border: 1px solid ${({ theme }) => theme.colors.primary};
  font-size: 18px;
  background: ${({ theme }) => theme.colors.bgWhite};
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h1`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
  margin-bottom: 8px;
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: #4b5563;
  max-width: 680px;
`;

// 가격 + 버튼
export const HeroBottomRow = styled.div`
  margin-top: 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const PriceText = styled.p`
  font-size: 24px;
  font-weight: 700;
  color: #111827;
`;

export const ButtonRow = styled.div`
  display: flex;
  gap: 12px;
  padding-right: 10px;
`;

// 버튼 공통
const BaseButton = styled.button`
  border-radius: 20px;
  padding: 12px 16px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: 0.12s ease-out;

  &:active {
    transform: translateY(1px);
  }
`;

export const SecondaryButton = styled(BaseButton)`
  background: #ffffff;
  color: ${({ theme }) => theme.colors.primary};
  border: 1px solid #c7d2fe;

  &:hover {
    background: #eef2ff;
  }
`;

export const PrimaryButton = styled(BaseButton)`
  background: ${({ theme }) => theme.colors.primary};
  color: #ffffff;
  border: none;

  &:hover {
    background: #4338ca;
  }
`;

// 패키지 내역 리스트
export const SectionTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-top: 32px;
  margin-bottom: 16px;
`;

export const EmptyFacilities = styled.div`
  padding: 20px 24px;
  border-radius: 20px;
  background: #f3f4ff;
  font-size: 14px;
  color: #4b5563;
`;

export const FacilityList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

/* 개별 시설 카드 */
export const FacilityCard = styled.div`
  display: grid;
  grid-template-columns: 96px 1fr auto;
  align-items: center;
  gap: 16px;

  padding: 14px 20px;
  border-radius: 24px;
  background: #ffffff;
  border: 1px solid #d4ddff;
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.06);
`;

export const FacilityThumb = styled.div`
  width: 96px;
  height: 72px;
  border-radius: 18px;
  overflow: hidden;
  background: #e5e7eb;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e5e7eb, #f3f4f6);
  }
`;

export const FacilityInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

export const FacilityHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FacilityTag = styled.span`
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  background: #eef2ff;
  color: ${({ theme }) => theme.colors.primary};
`;

export const FacilityName = styled.p`
  font-size: 14px;
  font-weight: 600;
`;

export const FacilityMeta = styled.div`
  font-size: 12px;
  color: #6b7280;
  display: flex;
  flex-direction: column;
`;

export const FacilityPrice = styled.div`
  align-self: flex-end;
  font-size: 14px;
  font-weight: 600;
  color: #111827;
  white-space: nowrap;
  padding-left: 12px;
`;
