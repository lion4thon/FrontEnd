import { useEffect } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";

type DialogProps = {
  open: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children?: React.ReactNode;
  actions?: React.ReactNode;
  backdropClosable?: boolean;
  labelledById?: string;
};

export default function Dialog({
  open,
  onClose,
  title,
  children,
  actions,
  backdropClosable = false,
  labelledById,
}: DialogProps) {
  // 바디 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent) => {
    if (!backdropClosable) return;
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <Backdrop onMouseDown={handleBackdrop}>
      <Panel role="dialog" aria-modal="true" aria-labelledby={labelledById}>
        {title || actions ? (
          <HeaderFooterLayout>
            {title && <Title id={labelledById}>{title}</Title>}
            {children && <Body>{children}</Body>}
            {actions && <Actions>{actions}</Actions>}
          </HeaderFooterLayout>
        ) : (
          children
        )}
      </Panel>
    </Backdrop>,
    document.body
  );
}

// 스타일
const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(19, 22, 31, 0.48);
  display: grid;
  place-items: center;
  z-index: 9998; /* ✅ 아주 높게 */
`;

const Panel = styled.div`
  position: fixed; /* ✅ 안전하게 고정 */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: min(500px, 92vw);
  max-height: 85vh;
  overflow: auto;

  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 24px 64px rgba(0, 0, 0, 0.28);
  padding: 28px 24px 24px;
  z-index: 9999; /* ✅ Backdrop 위 */

  animation: fadeIn 160ms ease-out;
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, calc(-50% + 8px));
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%);
    }
  }
`;

const HeaderFooterLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;
`;

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 18px;
  line-height: 1.5;
  font-weight: 700;
  color: #151a2b;
`;

const Body = styled.div`
  text-align: center;
  font-size: 15px;
  line-height: 1.7;
  color: #596072;
`;

const Actions = styled.div`
  margin-top: 6px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

// 공용버튼 동일
export const Btn = styled.button<{
  variant?: "primary" | "secondary" | "ghost";
}>`
  height: 47px;
  min-width: 360px;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;

  ${({ variant }) =>
    variant === "primary"
      ? `
        background:#4368FF;
        color:#fff;
        &:hover{ filter:brightness(0.98); }
        &:active{ filter:brightness(0.96); }
      `
      : `
        background:#ECEFF3;
        color:#8A90A3;
        &:hover{ filter:brightness(0.99); }
        &:active{ filter:brightness(0.97); }
      `}

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;
