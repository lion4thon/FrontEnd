// 공통 모달 프레임
import { useRef } from "react";
import styled from "styled-components";

type BaseModalProps = {
  children: React.ReactNode;
  onClose: () => void;
  labelledBy?: string;
  //   배경 클릭으로 닫기
  backdropClosable?: boolean;
};

export default function BaseModal({
  children,
  onClose,
  labelledBy,
  backdropClosable = false,
}: BaseModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (!backdropClosable) return;
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <Backdrop onMouseDown={handleBackdropClick}>
      <Panel
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        ref={panelRef}
      >
        {children}
      </Panel>
    </Backdrop>
  );
}

// 스타일
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Panel = styled.div`
  width: min(500px, 92vw);
  background: #f7f8ff;
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
  padding: 40px 48px;
  position: relative;
  outline: none;
  animation: fadeIn 0.18s ease-out;

  @keyframes fadeIn {
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
