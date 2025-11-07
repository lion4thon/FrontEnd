import React from "react";
import * as S from "./AI.styles";
import "../../styles/styleguide.css";
import rectangleIcon from "../../assets/Rectangle.png";

export const AI: React.FC = () => {
  return (
    <S.MainContainer>
      <S.Frame2>
        <S.Symbol>
          <S.AIIcon src={rectangleIcon} alt="AI Icon" />
        </S.Symbol>
        <S.SimpleSurvey>
          <S.SimpleSurveyText>
            간단한 설문을 통해 <br />
          </S.SimpleSurveyText>
          <S.PerfectFitExercise>지금 나에게 딱 맞는 운동</S.PerfectFitExercise>
          <S.MovRecommendation>을 MOV가 추천해드릴게요. </S.MovRecommendation>
        </S.SimpleSurvey>
      </S.Frame2>
      <S.Frame1>
        <S.SurveyProgress>설문 진행하기</S.SurveyProgress>
      </S.Frame1>
    </S.MainContainer>
  );
};

