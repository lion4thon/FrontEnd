import React from "react";
import * as S from "./DivWrapper.styles";
import searchIcon from "../../../assets/Vector.png";

interface DivWrapperProps {
  className?: string;
  placeholder?: string;
}

export const DivWrapper: React.FC<DivWrapperProps> = ({
  className,
  placeholder = "원하는 매장을 직접 검색해서 패키지에 추가하세요",
}) => {
  return (
    <S.SearchInput className={className}>
      <S.Icon>
        <img src={searchIcon} alt="검색" />
      </S.Icon>
      <S.Input type="text" placeholder={placeholder} />
    </S.SearchInput>
  );
};
