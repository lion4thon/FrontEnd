import React, { useEffect, useState } from "react";
import * as S from "./MyReviewCreate.styles";
import type { CompletedPackage, Store } from "./Mypage.types";

export type ReviewCreateData = {
  package: CompletedPackage;
  stores: Store[];
};

interface MyReviewCreateProps {
  open: boolean;
  onClose: () => void;
  reviewData: ReviewCreateData | null;
  onSave?: (reviewContent: string) => void;
}

export default function MyReviewCreate({
  open,
  onClose,
  reviewData,
  onSave,
}: MyReviewCreateProps) {
  const [reviewText, setReviewText] = useState("");
  const [selectedStoreId, setSelectedStoreId] = useState<number | null>(null);

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

  // 모달이 열릴 때 리뷰 텍스트 초기화
  useEffect(() => {
    if (open) {
      setReviewText("");
      setSelectedStoreId(null);
    }
  }, [open]);

  if (!open || !reviewData) return null;

  const isSaveEnabled = reviewText.trim().length > 0;

  const handleSave = () => {
    if (!isSaveEnabled) return;

    // TODO: API 호출로 리뷰 저장
    console.log("리뷰 저장 완료:", {
      packageId: reviewData.package.id,
      storeId: selectedStoreId,
      reviewText: reviewText.trim(),
    });

    // 콜백 실행 (리뷰 내용 전달)
    if (onSave) {
      onSave(reviewText.trim());
    }

    // 모달 닫기
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleStoreSelect = (storeId: number) => {
    setSelectedStoreId(storeId);
  };

  return (
    <S.Backdrop onMouseDown={handleBackdrop}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon />
        </S.CloseButton>

        <S.Header>
          <S.PackageTitle>{reviewData.package.title}</S.PackageTitle>
        </S.Header>

        <S.MessageSection>
          <S.MessageText>
            매장을 선택해야 리뷰를 작성할 수 있어요.
          </S.MessageText>
        </S.MessageSection>

        <S.StoresSection>
          {reviewData.stores.map((store) => (
            <S.StoreCard
              key={store.id}
              $selected={selectedStoreId === store.id}
              onClick={() => handleStoreSelect(store.id)}
            >
              <S.StoreImage src={store.image} alt={store.name} />
              <S.StoreInfo>
                <S.StoreName>{store.name}</S.StoreName>
              </S.StoreInfo>
            </S.StoreCard>
          ))}
        </S.StoresSection>

        <S.ReviewInputSection>
          <S.ReviewLabel>매장 이용 리뷰를 남겨주세요</S.ReviewLabel>
          <S.ReviewTextarea
            placeholder="리뷰를 작성해주세요"
            value={reviewText}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setReviewText(e.target.value)
            }
          />
        </S.ReviewInputSection>

        <S.SaveButton onClick={handleSave} disabled={!isSaveEnabled}>
          리뷰 등록
        </S.SaveButton>
      </S.ModalContent>
    </S.Backdrop>
  );
}
