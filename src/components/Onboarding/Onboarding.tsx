import React from "react";
import * as S from "./Onboarding.styles";
import "../../styles/styleguide.css";
import vector64 from "../../assets/vector-64.png";
import frame122 from "../../assets/Frame-122.png";
import Header from "../Header/Header";

const Onboarding: React.FC = () => {
  return (
    <>
      <Header />
      <S.Container>
        <S.Inner>
          <S.TextSection>
            <S.Title>
              내 몸의 감각을 깨우는
              <br />
              가벼운 첫걸음,
              <br />
              <S.GradientText>Feel the Move!</S.GradientText>
            </S.Title>

            <S.Description>
              다양한 운동을 부담 없이 즐기며, 나에게 맞는 운동을 탐색해 보세요.
            </S.Description>

            <S.Button>
              <S.ButtonText>MOV 시작하기</S.ButtonText>
              <S.VectorIcon src={vector64} alt="Vector" />
            </S.Button>
          </S.TextSection>
        </S.Inner>

        <S.RightVisual>
          <img src={frame122} alt="Hero collage" />
        </S.RightVisual>
      </S.Container>
    </>
  );
};

export default Onboarding;
