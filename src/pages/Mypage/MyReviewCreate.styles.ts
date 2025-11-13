import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(64, 67, 77, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 160ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  position: relative;
  width: 512px;
  min-height: 664px;
  max-height: 90vh;
  padding: 56px;
  background: #f7f8ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-sizing: border-box;
  overflow-y: auto;
  animation: slideUp 160ms ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 19.293px;
  right: 19.293px;
  width: 17.414px;
  height: 17.414px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const CloseIcon = styled.div`
  width: 17.414px;
  height: 17.414px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/cvefxHxZhi.png")
    no-repeat center;
  background-size: cover;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 4px;
`;

export const PackageTitle = styled.h2`
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: -0.52px;
  color: #1a1a1a;
  margin: 0;
  white-space: nowrap;
`;

export const MessageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  width: 100%;
`;

export const MessageText = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #2c2e35;
  white-space: nowrap;
`;

export const StoresSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

export const StoreCard = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 8px;
  background: #f3f7ff;
  border: 1px solid ${({ $selected }) => ($selected ? "#8896ff" : "#c1c5d0")};
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    border-color: #8896ff;
  }
`;

export const StoreImage = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 12px;
  object-fit: cover;
  flex-shrink: 0;
`;

export const StoreInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 4px;
  flex: 1;
  min-width: 0;
`;

export const StoreName = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  white-space: nowrap;
`;

export const ReviewInputSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  background: #f3f7ff;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  min-height: 190px;
`;

export const ReviewLabel = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
  white-space: nowrap;
`;

export const ReviewTextarea = styled.textarea`
  width: 100%;
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #2c2e35;
  resize: none;
  min-height: 120px;

  &::placeholder {
    color: #9a9eac;
  }

  &:focus {
    outline: none;
  }
`;

export const SaveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 51px;
  padding: 12px 0;
  background: #e2e6ed;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  cursor: not-allowed;
  transition: all 0.2s ease;

  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #666a76;
  white-space: nowrap;

  &:not(:disabled) {
    background: #4368ff;
    border-color: #4368ff;
    color: #ffffff;
    cursor: pointer;
  }

  &:not(:disabled):hover {
    background: #3a5ce6;
    border-color: #3a5ce6;
  }

  &:not(:disabled):active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 1;
    cursor: not-allowed;
  }
`;
