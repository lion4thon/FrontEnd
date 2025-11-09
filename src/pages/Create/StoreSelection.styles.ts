import styled from "styled-components";

export const Frame = styled.div`
  align-items: flex-start;
  background-color: var(--bg-white);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 20px;
  box-shadow: var(--drop-shadow);
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  position: relative;
`;

export const Div = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const TextWrapper2 = styled.div`
  color: var(--black);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

export const Element = styled.p`
  color: transparent;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

export const Span = styled.span`
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
`;

export const TextWrapper3 = styled.span`
  color: #666a76;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
`;

export const Div2 = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const SportButton = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--gray-100);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 24px 32px;
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-200);
  }
`;

export const TextWrapper4 = styled.div<{ $hasSelected?: boolean }>`
  color: ${(props) => (props.$hasSelected ? "#1a1a1a" : "var(--gray-500)")};
  flex: 1;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -0.5px;
  position: relative;
`;

export const Icon = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;
  transition: transform 0.2s ease;

  img {
    width: 18px;
    height: 10px;
    object-fit: contain;
    transform: ${(props) => (props.$isOpen ? "rotate(180deg)" : "rotate(0deg)")};
    transition: transform 0.2s ease;
  }
`;

export const PriceDiv = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--gray-100);
  border: 2px solid;
  border-color: #4367ff;
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 24px 32px;
  position: relative;
  width: 100%;
`;

export const PriceValue = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 4px;
  position: relative;
  min-width: 0;
`;

export const PriceNumber = styled.span`
  height: 36px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.52px;
`;

export const PriceUnit = styled.span`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 16px;
  height: 29px;
  color: #2c2e35;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const TextWrapper5 = styled.div`
  color: var(--gray-500);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -0.5px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

export const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const DropdownMenu = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  position: absolute;
  top: calc(100% + 16px);
  left: 0;
  right: 0;
  z-index: 100;
  background: #eef1f8;
  border-radius: 28px;
  overflow: hidden;
  max-height: 560px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
`;

export const DropdownHeader = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 10px;
  padding: 24px 32px 24px 24px;
  background: #f7f8ff;
  border-radius: 28px 28px 0 0;
  border-bottom: 0.5px solid #c1c5d0;
`;

export const DropdownHeaderText = styled.div`
  flex: 1;
  height: 27px;
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const DropdownList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 0 0 28px 28px;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c5d0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9a9eac;
  }
`;

export const DropdownItem = styled.div<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  padding: 24px;
  background: ${(props) => (props.$isSelected ? "#e2e6ed" : "transparent")};
  border-top: ${(props) => (props.$isSelected ? "0.5px solid #c1c5d0" : "none")};
  border-bottom: ${(props) => (props.$isSelected ? "0.5px solid #c1c5d0" : "none")};
  cursor: pointer;
  position: relative;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${(props) => (props.$isSelected ? "#e2e6ed" : "#e8ebf0")};
  }

  &:first-child {
    border-top: none;
  }
`;

export const SelectedIndicator = styled.div`
  position: absolute;
  width: 4px;
  height: calc(100% - 7px);
  top: 3.5px;
  right: 0;
  background: #9a9eac;
  border-radius: 20px;
`;

export const SportItemText = styled.span`
  flex: 1;
  height: 27px;
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

// 매장 선택 관련 스타일
export const StoreSelectionContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const StoreSelectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  position: relative;
  background: #eef1f8;
  border-radius: 28px;
  overflow: hidden;
`;

export const StoreSelectionHeader = styled.div<{ $isOpen?: boolean }>`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 10px;
  height: 75px;
  padding: 24px 32px 24px 24px;
  background: #f7f8ff;
  border-radius: ${(props) => (props.$isOpen ? "28px 28px 0 0" : "28px")};
  cursor: pointer;
  z-index: 1;
`;

export const SportTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 4px 4px 12px;
  background: #f7f8ff;
  border: 1px solid #4367ff;
  border-radius: 20px;
`;

export const SportTagText = styled.span`
  height: 27px;
  color: #4367ff;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: 600;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const CloseIcon = styled.div`
  width: 9px;
  height: 9px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/1LUYNxvVaw.png)
    no-repeat center;
  background-size: cover;
`;

export const StoreSelectText = styled.span`
  flex-grow: 1;
  height: 27px;
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const StoreDropdownList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
  padding: 16px 24px;
  max-height: 500px;
  overflow-y: auto;
  border-radius: 0 0 28px 28px;
  background: #eef1f8;
  width: 100%;
  box-sizing: border-box;

  /* 스크롤바 스타일링 */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: #c1c5d0;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #9a9eac;
  }
`;

export const StoreCard = styled.div<{ $isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  gap: 16px;
  position: relative;
  padding: 16px 24px 16px 16px;
  background: ${(props) => (props.$isSelected ? "#f3f7ff" : "#f7f8ff")};
  border: ${(props) => (props.$isSelected ? "1px solid #8896ff" : "none")};
  border-radius: 20px;
  transition: all 0.2s ease;
  width: 100%;
  min-height: 132px;
  box-sizing: border-box;

  &:hover {
    background: ${(props) => (props.$isSelected ? "#f3f7ff" : "#f0f3f9")};
  }
`;

export const StoreSelectedIndicator = styled.div`
  position: absolute;
  width: 4px;
  height: calc(100% - 32px);
  top: 16px;
  right: 0;
  background: #9a9eac;
  border-radius: 20px;
`;

export const StoreCardContent = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const StoreImage = styled.img`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  object-fit: cover;
`;

export const StoreInfo = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex: 1;
  gap: 16px;
  position: relative;
  min-width: 0;
  width: 100%;
  justify-content: space-between;
`;

export const StoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  gap: 4px;
  position: relative;
  min-width: 0;
`;

export const StoreNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const StoreName = styled.span`
  height: 27px;
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const StoreVerifiedIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/omauM5Rndc.png)
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const StoreAddress = styled.div`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
  width: 100%;
`;

export const StoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
  position: relative;
  flex-shrink: 0;
  min-width: fit-content;
`;

export const StoreDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  flex-wrap: nowrap;
`;

export const StoreDescription = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const StorePrice = styled.span`
  height: 36px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.52px;
`;

export const AddToCartButton = styled.button<{ $isSelected: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  background: ${(props) => (props.$isSelected ? "#8896ff" : "#4367ff")};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  height: 27px;
  color: #ffffff;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;

  &:hover {
    background: ${(props) => (props.$isSelected ? "#8896ff" : "#3655e6")};
  }
`;

// 선택된 매장 카드 스타일
export const SelectedStoreCard = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  gap: 16px;
  position: relative;
  padding: 16px 24px 16px 16px;
  background: #f7f8ff;
  border-radius: 20px;
  width: 100%;
  box-sizing: border-box;
`;

export const SelectedStoreImage = styled.img`
  flex-shrink: 0;
  width: 120px;
  height: 120px;
  border-radius: 12px;
  object-fit: cover;
`;

export const SelectedStoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  align-self: stretch;
  flex: 1;
  gap: 0;
  position: relative;
  padding: 8px 0;
  min-width: 0;
`;

export const SelectedStoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  position: relative;
  width: 100%;
`;

export const SelectedSportTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 12px;
  background: #f7f8ff;
  border: 1px solid #4367ff;
  border-radius: 20px;
  width: fit-content;
`;

export const SelectedSportTagText = styled.span`
  height: 27px;
  color: #4367ff;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const SelectedStoreNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const SelectedStoreName = styled.span`
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

export const SelectedStoreVerifiedIcon = styled.div`
  width: 26px;
  height: 26px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/bnnYiHEesO.png)
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const SelectedStoreAddress = styled.div`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const SelectedStoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  align-self: stretch;
  width: 100%;
`;

export const SelectedStoreDetailRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  flex-wrap: nowrap;
`;

export const SelectedStoreDescription = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const SelectedStorePrice = styled.span`
  height: 36px;
  color: #1a1a1a;
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: -0.52px;
`;

export const SelectedStorePriceUnit = styled.span`
  height: 29px;
  color: #2c2e35;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const RemoveStoreButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;

export const RemoveStoreIcon = styled.div`
  width: 17.414px;
  height: 17.414px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/9LqLC6Gihr.png)
    no-repeat center;
  background-size: cover;
`;
