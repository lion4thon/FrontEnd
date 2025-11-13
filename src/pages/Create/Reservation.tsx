import React from "react";
import * as S from "./Reservation.styles";
import "../../styles/styleguide.css";

interface ReservationProps {
  onPackageCreate: () => void;
}

export const Reservation: React.FC<ReservationProps> = ({
  onPackageCreate,
}) => {
  return (
    <S.MainContainer onClick={onPackageCreate}>
      <S.Login>패키지 생성하기</S.Login>
    </S.MainContainer>
  );
};
