import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  min-height: calc(100vh - 90px);
  margin-top: 90px;
  background: #f3f7ff;
  padding: 56px 120px;
  box-sizing: border-box;
`;

export const ContentWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  max-width: 1440px;
  margin: 0 auto;
  width: 100%;
`;

// 좌측: 매장 정보 섹션
export const StoreInfoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
  max-width: 710px;
  background: #f7f8ff;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
`;

export const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 24px;
  border-bottom: 0.5px solid #7d808d;
  gap: 10px;
`;

export const StoreNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  height: 36px;
`;

export const StoreVerifiedIcon = styled.div`
  width: 35px;
  height: 35px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/56GiA6JuRU.png)
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const StoreName = styled.span`
  height: 36px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.52px;
`;

export const StoreImages = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 16px 24px 24px 24px;
  gap: 16px;
`;

export const ImageNavigation = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  gap: 8px;
`;

export const NavButton = styled.button<{ disabled?: boolean }>`
  width: 30px;
  height: 30px;
  background: transparent;
  border: none;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  transition: opacity 0.2s ease;

  &:hover:not(:disabled) {
    opacity: 0.8;
  }
`;

export const NavButtonLeftIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/gBe5aOQAEE.png)
    no-repeat center;
  background-size: cover;
  opacity: 0.8;
`;

export const NavButtonRightIcon = styled.div`
  width: 30px;
  height: 30px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/gBe5aOQAEE.png)
    no-repeat center;
  background-size: cover;
  transform: scaleX(-1);
  opacity: 0.8;
`;

export const ImageGrid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */

  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Edge */
  }

  &::-ms-overflow-style {
    display: none; /* IE and Edge */
  }
`;

export const StoreImage = styled.img`
  flex-shrink: 0;
  width: 200px;
  height: 200px;
  border-radius: 20px;
  object-fit: cover;
`;

export const TabMenu = styled.div`
  display: flex;
  align-items: flex-end;
  width: 100%;
  padding: 16px 24px;
  border-top: 0.5px solid #7d808d;
  gap: 36px;
`;

export const TabButton = styled.button<{ active?: boolean }>`
  height: 27px;
  color: ${({ active }) => (active ? "#1a1a1a" : "#7d808d")};
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  position: relative;

  &::after {
    content: "";
    position: absolute;
    bottom: -16px;
    left: 0;
    width: ${({ active }) => (active ? "68px" : "0")};
    height: 4px;
    background: #2c2e35;
    transition: width 0.3s ease;
  }
`;

export const StoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  padding: 24px 48px 24px 24px;
  gap: 16px;
  flex: 1;
`;

export const DetailRow = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  gap: 8px;
`;

export const DetailIcon = styled.div`
  flex-shrink: 0;
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const MapIcon = styled.div`
  width: 27px;
  height: 27px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/mo7UOjGjjp.png)
    no-repeat center;
  background-size: cover;
`;

export const DirectionIcon = styled.div`
  width: 27px;
  height: 27px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/C57uR57SNV.png)
    no-repeat center;
  background-size: cover;
`;

export const ClockIcon = styled.div`
  width: 27px;
  height: 27px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/v1PbLQ9GxJ.png)
    no-repeat center;
  background-size: cover;
`;

export const PhoneIcon = styled.div`
  width: 27px;
  height: 27px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/YuTTXiQPRf.png)
    no-repeat center;
  background-size: cover;
`;

export const ChatIcon = styled.div`
  width: 27px;
  height: 27px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/GQiDGxzGeQ.png)
    no-repeat center;
  background-size: cover;
`;

export const DetailText = styled.span`
  height: 27px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const DetailContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 8px;
`;

export const DirectionsText = styled.div<{ $expanded?: boolean }>`
  width: 100%;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  letter-spacing: 0.18px;
  ${({ $expanded }) =>
    $expanded
      ? `
    max-height: none;
    overflow: visible;
    display: block;
  `
      : `
    max-height: 80px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `}
`;

export const DescriptionText = styled.div<{ $expanded?: boolean }>`
  width: 100%;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  letter-spacing: 0.18px;
  ${({ $expanded }) =>
    $expanded
      ? `
    max-height: none;
    overflow: visible;
    display: block;
  `
      : `
    max-height: 80px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `}
`;

export const BusinessHoursRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const BusinessHours = styled.span`
  height: 27px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const DropdownIcon = styled.div`
  width: 16px;
  height: 9px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/8GY9PtoKOZ.png)
    no-repeat center;
  background-size: cover;
`;

export const MoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 59px;
  cursor: pointer;
  gap: 4px;
  background: none;
  border: none;
  padding: 0;
`;

export const MoreText = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const MoreIcon = styled.div<{ $expanded?: boolean }>`
  width: 22px;
  height: 22px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/PvJ0hkwSxZ.png)
    no-repeat center;
  background-size: cover;
  transform: ${({ $expanded }) =>
    $expanded ? "rotate(180deg)" : "rotate(0deg)"};
  transition: transform 0.2s ease;
`;

export const MapPlaceholder = styled.div`
  width: 100%;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #e1e5f1;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
`;

// 우측: 리뷰 섹션
export const ReviewSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  min-width: 0;
  max-width: 714px;
  gap: 16px;
  width: 100%;
  height: 100%;
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background: #f7f8ff;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  overflow-y: auto;
  overflow-x: hidden;
  flex: 1;
  min-height: 0;
  position: relative;

  /* 스크롤바 스타일링 - 오른쪽 상단부터 시작 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f7f8ff;
    border-radius: 0 20px 20px 0;
    margin-top: 0;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c5d0;
    border-radius: 4px;
    margin-top: 0;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9a9eac;
  }

  /* Firefox 스크롤바 */
  scrollbar-width: thin;
  scrollbar-color: #c1c5d0 #f7f8ff;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 24px;
  gap: 16px;
  box-sizing: border-box;
  flex-shrink: 0;
  background: #f7f8ff;
  border-bottom: 0.5px solid #c1c5d0;
`;

export const ReviewTitle = styled.span`
  height: 36px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.52px;
  flex: 1;
`;

export const SortMenu = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex: 1;
  gap: 4px;
`;

export const SortButton = styled.button<{ active?: boolean }>`
  height: 21px;
  color: ${({ active }) => (active ? "#1a1a1a" : "#7d808d")};
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const SortSeparator = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  flex: 1;
`;

export const ReviewItem = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 16px;
  background: #f3f7ff;
  border-top: 0.5px solid #c1c5d0;
  gap: 16px;

  &:first-child {
    border-top: none;
  }
`;

export const ReviewAvatar = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  flex-shrink: 0;
`;

export const AvatarImage = styled.div`
  width: 50px;
  height: 50px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  border-radius: 50%;
`;

export const ReviewContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1;
  gap: 8px;
`;

export const ReviewHeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
  gap: 8px;
`;

export const ReviewAuthor = styled.span`
  height: 27px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const ReviewDateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-left: auto;
`;

export const ReviewDate = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const ReviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 8px;
`;

export const ReviewAction = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
  cursor: pointer;
`;

export const ReviewActionSeparator = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const ReviewComment = styled.div<{ $expanded?: boolean }>`
  width: 100%;
  color: #2c2e35;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  letter-spacing: 0.18px;
  ${({ $expanded }) =>
    $expanded
      ? `
    max-height: none;
    overflow: visible;
    display: block;
  `
      : `
    max-height: 82px;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  `}
`;

export const ReviewCommentShort = styled.span`
  width: 100%;
  color: #2c2e35;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  text-align: left;
  letter-spacing: 0.18px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const ReviewFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
  gap: 4px;
  margin-top: 8px;
`;

export const HelpfulText = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const HelpfulButton = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  background: ${({ active }) => (active ? "#4367ff" : "transparent")};
  cursor: pointer;
  height: fit-content;
  transition: all 0.2s ease;

  &:hover {
    border-color: ${({ active }) => (active ? "#4367ff" : "#9a9eac")};
    background: ${({ active }) => (active ? "#3655e6" : "#f3f7ff")};
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ThumbsUpIcon = styled.div`
  width: 16px;
  height: 16px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

export const HelpfulCount = styled.span<{ active?: boolean }>`
  height: 21px;
  color: ${({ active }) => (active ? "#ffffff" : "#2c2e35")};
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.28px;
`;

export const Divider = styled.div`
  width: 4px;
  height: 72px;
  background: #9a9eac;
  border-radius: 20px;
  align-self: center;
  flex-shrink: 0;
`;

export const PackageButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
  padding: 12px 80px;
  background: #4367ff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;
  min-width: 0;

  &:hover {
    background: #3655e6;
  }
`;

export const PackageButtonText = styled.span`
  height: 36px;
  color: #ffffff;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.52px;
`;
