import React from "react";
import * as S from "./StoreSelection.styles";
import { DivWrapper } from "./StoreSelection/DivWrapper";
import "../../styles/styleguide.css";
import vector65 from "../../assets/Vector 65.png";

export const StoreSelection: React.FC = () => {
  return (
    <S.Frame>
      <S.Div>
        <S.TextWrapper2>매장 검색</S.TextWrapper2>
        <DivWrapper
          className="view"
          placeholder="원하는 매장을 직접 검색해서 패키지에 추가하세요"
        />
      </S.Div>

      <S.Div>
        <S.Element>
          <S.Span>패키지에 담을 종목을 선택하세요. </S.Span>
          <S.TextWrapper3>(최소 1개)</S.TextWrapper3>
        </S.Element>

        <S.Div2>
          <S.SportButton>
            <S.TextWrapper4>종목 선택</S.TextWrapper4>
            <S.Icon>
              <img src={vector65} alt="dropdown" />
            </S.Icon>
          </S.SportButton>

          <S.SportButton>
            <S.TextWrapper4>종목 선택</S.TextWrapper4>
            <S.Icon>
              <img src={vector65} alt="dropdown" />
            </S.Icon>
          </S.SportButton>

          <S.SportButton>
            <S.TextWrapper4>종목 선택</S.TextWrapper4>
            <S.Icon>
              <img src={vector65} alt="dropdown" />
            </S.Icon>
          </S.SportButton>
        </S.Div2>
      </S.Div>

      <S.PriceDiv>
        <S.TextWrapper4>패키지 가격</S.TextWrapper4>
        <S.TextWrapper5>-</S.TextWrapper5>
        <S.TextWrapper5>원</S.TextWrapper5>
      </S.PriceDiv>
    </S.Frame>
  );
};
