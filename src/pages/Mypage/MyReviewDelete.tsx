import React, { useEffect } from "react";
import * as S from "./MyReviewDelete.styles";

interface MyReviewDeleteProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function MyReviewDelete({
  open,
  onClose,
  onConfirm,
}: MyReviewDeleteProps) {
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

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <S.Backdrop onMouseDown={handleBackdrop}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon />
        </S.CloseButton>

        <S.ContentContainer>
          <S.LogoIcon>
            <S.Vector1 />
            <S.Vector2 />
            <S.Vector3 />
            <S.ClipPathGroup>
              <S.Group>
                <S.ClipPathGroupInner>
                  <S.GroupInner>
                    <S.Rectangle />
                  </S.GroupInner>
                </S.ClipPathGroupInner>
              </S.Group>
            </S.ClipPathGroup>
          </S.LogoIcon>

          <S.TitleSection>
            <S.Title>리뷰를 삭제하시겠어요?</S.Title>
          </S.TitleSection>

          <S.ButtonSection>
            <S.DeleteButton onClick={handleConfirm}>
              <S.ButtonText>리뷰 삭제</S.ButtonText>
            </S.DeleteButton>
            <S.CancelButton onClick={onClose}>
              <S.ButtonTextCancel>취소</S.ButtonTextCancel>
            </S.CancelButton>
          </S.ButtonSection>
        </S.ContentContainer>
      </S.ModalContent>
    </S.Backdrop>
  );
}
