import styled from "styled-components";

export const SearchInput = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--bg-white);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 16px 16px;
  position: relative;
  width: 100%;

  &.view {
    border: 0.5px solid !important;
    left: unset !important;
    top: unset !important;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 46px;
    height: 46px;
    object-fit: contain;
  }
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--black);
  flex: 1;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  outline: none;
  position: relative;

  &::placeholder {
    color: var(--gray-400);
  }
`;

export const SearchContainer = styled.div`
  position: relative;
  width: 100%;
`;

export const SearchResultsDropdown = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 1000;
  background: #eef1f8;
  border-radius: 20px;
  overflow: hidden;
  max-height: 560px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
`;

export const SearchResultHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 24px 24px 16px 24px;
  position: relative;
`;

export const SearchResultText = styled.span`
  height: 27px;
  color: #2c2e35;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: 0.18px;
`;

export const SearchResultList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 0 24px 24px 24px;
  /* max-height: 480px; */
  max-height: 412px;
  overflow-y: auto;

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

export const SearchStoreCard = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px 16px 16px;
  background: #f3f7ff;
  border: 1px solid #dfe5ff;
  border-radius: 20px;
  position: relative;
  width: 100%;
  box-sizing: border-box;
  min-height: 132px;
`;

export const SearchStoreImage = styled.img`
  flex-shrink: 0;
  width: 100px;
  height: 100px;
  border-radius: 20px;
  object-fit: cover;
`;

export const SearchStoreInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  gap: 16px;
  position: relative;
  justify-content: space-between;
  min-width: 0;
`;

export const SearchStoreHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  flex: 1;
  gap: 4px;
  position: relative;
  min-width: 0;
`;

export const SearchStoreNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
`;

export const SearchStoreName = styled.span`
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

export const SearchStoreVerifiedIcon = styled.div`
  width: 24px;
  height: 24px;
  background: url(https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/Z02BOq5Hiz.png)
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const SearchStoreAddress = styled.div`
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

export const SearchStoreDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 16px;
  position: relative;
  flex-shrink: 0;
  min-width: fit-content;
`;

export const SearchStoreDetailRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 16px;
  position: relative;
  flex-wrap: nowrap;
`;

export const SearchStoreDescription = styled.span`
  height: 21px;
  color: #7d808d;
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  text-align: left;
  white-space: nowrap;
`;

export const SearchStorePrice = styled.span`
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

export const SearchAddToCartButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px 16px;
  background: #4367ff;
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
    background: #3655e6;
  }
`;

