import React from "react";
import * as S from "./Description.styles";
import "../../styles/styleguide.css";

export const Description: React.FC = () => {
  return (
    <S.Frame>
      <S.FrameWrapper>
        <S.DivWrapper>
          <S.TextWrapper>
            내가 원하는 운동만 담아,
            <br />
            직접 나만의 체험 패키지를 구성해보세요.
          </S.TextWrapper>
        </S.DivWrapper>
      </S.FrameWrapper>
      <S.Div>
        단일 종목도 선택 가능하지만, 기본적으로 2~3종목 구성을 권장드려요.
      </S.Div>
    </S.Frame>
  );
};
