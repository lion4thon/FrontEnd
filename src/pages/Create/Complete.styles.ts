import styled from "styled-components";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(64, 67, 77, 0.6);
  z-index: 1000;
  backdrop-filter: blur(2px);
`;

export const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  min-height: 444.554px;
  padding: 60px 40px 40px 40px;
  background: #f7f8ff;
  border-radius: 20px;
  z-index: 1001;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  animation: fadeIn 0.18s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -48%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 64px;
`;

export const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 67.854px;
  height: 44.554px;
`;

export const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const MessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 4px;
`;

export const MessageText = styled.div`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  text-align: center;
  color: #1a1a1a;
  letter-spacing: 0.18px;
  white-space: pre-line;
`;

export const PackageName = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;
  color: #1a1a1a;
  letter-spacing: 0.18px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 16px;
`;

export const AddToCartButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 51px;
  padding: 12px 0;
  background: #4367ff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #3555e6;
    filter: brightness(0.95);
  }

  &:active:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const SaveToStorageButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 51px;
  padding: 12px 0;
  background: #e2e6ed;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background: #d4d9e2;
    filter: brightness(0.95);
  }

  &:active:not(:disabled) {
    filter: brightness(0.9);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

export const ButtonText = styled.span<{ $variant?: "primary" | "secondary" }>`
  font-family: "Pretendard", sans-serif;
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.18px;
  color: ${(props) => (props.$variant === "secondary" ? "#666a76" : "#ffffff")};
`;
