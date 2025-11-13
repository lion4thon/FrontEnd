import Dialog from "../Dialog/Dialog";
import movLogo from "../../assets/Required_mov.svg"; // 경로 맞춰주세요
import * as S from "./style/SurveyRequiredModal.style";

import closeIcon from "../../assets/close.svg";

type Props = {
  open: boolean;
  onClose: () => void;
  onGoSurvey: () => void; // 설문 페이지로 이동
};

export default function SurveyRequiredModal({ open, onClose, onGoSurvey }: Props) {
  return (
      <S.Backdrop onClick={onClose}>
    <Dialog open={open} onClose={onClose} labelledById="survey-required-title" title="">
        <div onClick={(e) => e.stopPropagation()}>
          <S.Wrap>
            <S.Close onClick={onClose} src={closeIcon} alt="닫기"/>
            <S.Logo src={movLogo} alt="MOV" />
            <h3 id="survey-required-title">
              AI 추천 패키지는 간단한 설문을 통해 이용가능해요.
              <br />
              산초님에 대해 알려주실래요?
            </h3>
          </S.Wrap>
          <S.PrimaryBtn type="button" onClick={onGoSurvey}>
            설문하러 가기
          </S.PrimaryBtn>
        </div>
    </Dialog>
      </S.Backdrop>
  );
}
