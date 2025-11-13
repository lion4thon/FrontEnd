/**
 * PayModal
 * 패키지 결제 확인 모달 컴포넌트
 */

import React from "react";
import * as S from "./PayModal.style";
import { useNavigate } from "react-router-dom";

export interface PayModalProps {
  open: boolean;
  amount: number;
  onClose: () => void;
  onConfirm: () => void;
  isProcessing?: boolean;
}

const PayModal: React.FC<PayModalProps> = ({
  open,
  amount,
  onClose,
  onConfirm,
  isProcessing,
}) => {

  const navigate = useNavigate();

  if (!open) return null;


  const formattedAmount = amount.toLocaleString();

  const handleBackdropClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target === e.currentTarget && !isProcessing) {
      onClose();
    }
  };

  return (
    <S.Backdrop onClick={handleBackdropClick}>
      <S.Container>
        <S.Title>결제를 진행해 주세요.</S.Title>
        <S.Description>
          결제를 진행하면 선택한 패키지로 예약이 완료됩니다.
        </S.Description>
        <S.ButtonWrapper>
          <S.PayButton
            type="button"
            onClick={() => {
              onConfirm();
              navigate("/package");
            }}
            disabled={isProcessing}
          >
            {isProcessing ? "결제 처리 중..." : `${formattedAmount}원 결제하기`}
          </S.PayButton>
        </S.ButtonWrapper>
      </S.Container>
    </S.Backdrop>
  );
};

export default PayModal;