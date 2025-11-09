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
  width: 700px;
  min-height: 664px;
  max-height: 90vh;
  padding: 56px;
  background: #f7f8ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  top: 23px;
  right: 23px;
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
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/hbFwn86Hm4.png")
    no-repeat center;
  background-size: cover;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 8px;
`;

export const Title = styled.h2`
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0.52px;
  color: #2c2e35;
  margin: 0;
`;

export const PackageCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 16px 12px 12px;
  background: #f7f8ff;
  border-radius: 28px;
  box-shadow: 4px 4px 20px 0 rgba(0, 0, 0, 0.15);
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
  gap: 4px;
  flex: 1;
  min-width: 0;
  padding: 8px 0 12px 0;
`;

export const PackageTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const PackageTitle = styled.span`
  font-family: Pretendard, var(--default-font-family);
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
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/79gDDYGNVe.png")
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const PackageDescription = styled.span`
  font-family: Pretendard, var(--default-font-family);
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
  max-width: 444px;
  height: 35px;
`;

export const ReportTitleCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 18px;
  background: #f3f7ff;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
`;

export const ReportTitleInput = styled.input`
  width: 100%;
  background: transparent;
  border: none;
  outline: none;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;

  &::placeholder {
    color: #9a9eac;
  }

  &:focus {
    outline: none;
  }
`;

export const SummaryCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 18px;
  background: #f3f7ff;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
`;

export const SummaryTitle = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const SummaryContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const SummaryRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
`;

export const SummaryLabel = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
  white-space: nowrap;
  flex: 1;
  min-width: 0;
`;

export const SummaryValue = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 600;
  line-height: 21px;
  color: #666a76;
  flex: 1;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const FeedbackCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 12px 18px;
  background: #f3f7ff;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  flex: 1;
  min-height: 108px;
`;

export const FeedbackTitle = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  white-space: nowrap;
  margin-bottom: 4px;
`;

export const FeedbackContent = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #7d808d;
  white-space: pre-wrap;
  word-break: break-word;
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
