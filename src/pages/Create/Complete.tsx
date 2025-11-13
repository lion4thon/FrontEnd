import React, { useEffect } from "react";
import * as S from "./Complete.styles";
import MOVLogo from "../../assets/Create_mov.svg";

interface CompleteProps {
  isOpen: boolean;
  onClose: () => void;
  packageName: string;
  onAddToCart: () => void;
  onSaveToStorage: () => void;
  isCreating?: boolean;
}

export const Complete: React.FC<CompleteProps> = ({
  isOpen,
  onClose,
  packageName,
  onAddToCart,
  onSaveToStorage,
  isCreating = false,
}) => {
  // 모달이 열릴 때 body 스크롤 잠금
  useEffect(() => {
    if (isOpen) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [isOpen]);

  // ESC 키로 모달 닫기
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleAddToCart = async () => {
    await onAddToCart();
    // API 호출이 성공하면 Create 컴포넌트에서 모달을 닫음
    // 실패하면 모달은 열린 채로 유지
  };

  const handleSaveToStorage = async () => {
    await onSaveToStorage();
    // API 호출이 성공하면 Create 컴포넌트에서 모달을 닫음
    // 실패하면 모달은 열린 채로 유지
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const displayPackageName = packageName.trim() || "패키지";

  return (
    <>
      <S.Overlay onClick={handleOverlayClick} />
      <S.ModalContainer>
        <S.ModalContent>
          <S.LogoContainer>
            <S.Logo src={MOVLogo} alt="MOV Logo" />
          </S.LogoContainer>
          <S.MessageContainer>
            <S.MessageText>
              <S.PackageName>[{displayPackageName}]</S.PackageName>
              {" 패키지 생성 완료!"}
              <br />
              장바구니에 담으시겠어요?
            </S.MessageText>
          </S.MessageContainer>
          <S.ButtonContainer>
            <S.AddToCartButton onClick={handleAddToCart} disabled={isCreating}>
              <S.ButtonText>
                {isCreating ? "처리 중..." : "장바구니에 담기"}
              </S.ButtonText>
            </S.AddToCartButton>
            <S.SaveToStorageButton
              onClick={handleSaveToStorage}
              disabled={isCreating}
            >
              <S.ButtonText $variant="secondary">
                {isCreating ? "처리 중..." : "보관함에 저장"}
              </S.ButtonText>
            </S.SaveToStorageButton>
          </S.ButtonContainer>
        </S.ModalContent>
      </S.ModalContainer>
    </>
  );
};

export default Complete;
