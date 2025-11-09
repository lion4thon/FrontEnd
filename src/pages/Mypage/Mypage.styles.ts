import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #f3f7ff;
  overflow: hidden;
`;

export const HeaderPlaceholder = styled.div`
  height: 90px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 56px 120px;
  box-sizing: border-box;
`;

export const MainLayout = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 710px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  background: #f7f8ff;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  overflow: hidden;
  height: 822px;
  position: relative;
`;

// Profile Section
export const ProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 710px;
  padding: 24px;
  background: #f7f8ff;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
`;

export const ProfileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
`;

export const ProfileDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 67px;
  flex: 1;
`;

export const UserName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0.52px;
  color: #1a1a1a;
`;

export const ProfileActions = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
`;

export const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 10px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
`;

export const ActionText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #666a76;
`;

export const EditIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/0r3eo5Zdq6.png")
    no-repeat center;
  background-size: cover;
`;

export const SurveyIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/6aRGOpLDi5.png")
    no-repeat center;
  background-size: cover;
`;

// Section
export const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 710px;
  padding: 24px;
  background: #f7f8ff;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
`;

export const SectionHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding-top: 0;
`;

export const SectionTitle = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  flex: 1;
`;

export const NavigationButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 56px;
`;

export const NavButton = styled.button<{ direction: "left" | "right" }>`
  width: 24px;
  height: 24px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/e8nmmpVe7a.png")
    no-repeat center;
  background-size: cover;
  cursor: pointer;
  border: none;
  padding: 0;
  flex-shrink: 0;
  
  ${({ direction }) =>
    direction === "left" &&
    `
    transform: rotate(180deg);
  `}
`;

// Package Cards
export const PackageGrid = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  padding-top: 8px;
  scroll-behavior: smooth;
  
  /* Hide scrollbar */
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

export const PackageCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 480px;
  padding: 12px;
  background: #f7f8ff;
  border-radius: 28px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

export const CompletedPackageCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 480px;
  padding: 12px;
  background: #f7f8ff;
  border: 1px solid #6180ff;
  border-radius: 28px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
`;

export const CompletedPackageContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const StoragePackageCard = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 480px;
  padding: 12px 16px 12px 12px;
  background: #f7f8ff;
  border: 1px solid #c1c5d0;
  border-radius: 28px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  flex-shrink: 0;
  position: relative;
`;

export const PackageThumbnail = styled.img`
  width: 104px;
  height: 104px;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const PackageInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0;
  flex: 1;
  min-width: 0;
`;

export const PackageTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PackageTitle = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  white-space: nowrap;
`;

export const ChevronIcon = styled.div`
  width: 7px;
  height: 11px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/ypihPogJur.png")
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const PackageDescription = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 18.2px;
  color: #7d808d;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  max-width: 277px;
  height: 35px;
`;

export const ActionButtons = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 0;
  margin-top: -16px;
  border-top: 0.5px solid #c1c5d0;
  padding-top: 16px;
`;

export const ActionButtonSmall = styled.button`
  flex: 1;
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #000000;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  text-align: center;
`;

export const StoragePackageInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px 0 0;
  flex: 1;
  min-width: 0;
`;

export const StoragePackageContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
  padding: 8px 0;
  flex: 1;
  min-width: 0;
`;

export const StoragePackagePriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  width: 57px;
  padding: 6px 0;
`;

export const Price = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #2c2e35;
  white-space: nowrap;
  flex: 1;
`;

export const CartIcon = styled.div`
  position: absolute;
  width: 28px;
  height: 28px;
  top: 11px;
  right: 16px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/9hQwQtQ10O.png")
    no-repeat center;
  background-size: cover;
  cursor: pointer;
  overflow: hidden;
`;

// Reports/Reviews Section
export const TabHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 16px 24px;
  border-bottom: 0.5px solid #c1c5d0;
`;

export const TabButton = styled.button<{ active: boolean }>`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: ${({ active }) => (active ? 600 : 400)};
  line-height: 27px;
  letter-spacing: 0.18px;
  color: ${({ active }) => (active ? "#1a1a1a" : "#7d808d")};
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
`;

export const TabIndicator = styled.div<{ position: "left" | "right" }>`
  position: absolute;
  width: 48px;
  height: 4px;
  top: 55px;
  left: ${({ position }) => (position === "left" ? "23.5px" : "87px")};
  background: #2c2e35;
  transition: left 0.3s ease;
  z-index: 1;
`;

export const ReportList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  
  /* 스크롤바 스타일 - 오른쪽에 표시됨 (기본 동작) */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #9a9eac;
    border-radius: 20px;
    
    &:hover {
      background: #7d808d;
    }
  }
  
  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: #9a9eac transparent;
`;

export const ReportCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 24px;
  background: #f7f8ff;
  border-top: 0.5px solid #c1c5d0;
  position: relative;
  
  &:first-child {
    border-top: none;
  }
`;

export const ReportThumbnail = styled.img`
  width: 160px;
  height: 160px;
  border-radius: 20px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ReportInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 0 12px;
  flex: 1;
`;

export const ReportDate = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #666a76;
`;

export const ReportTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

export const ReportTitle = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
`;

export const ReportChevron = styled.div`
  width: 6px;
  height: 11px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/KMEwQFk5tA.png")
    no-repeat center;
  background-size: cover;
`;


