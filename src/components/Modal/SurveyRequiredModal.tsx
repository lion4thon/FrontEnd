import Dialog from "../Dialog/Dialog";
import styled from "styled-components";
import movLogo from "../../assets/Required_mov.svg"; // 경로 맞춰주세요

type Props = {
  open: boolean;
  onClose: () => void;
  onGoSurvey: () => void; // 설문 페이지로 이동
};

export default function SurveyRequiredModal({
  open,
  onClose,
  onGoSurvey,
}: Props) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      labelledById="survey-required-title"
      title=""
    >
      <Wrap>
        <Logo src={movLogo} alt="MOV" />
        <h3 id="survey-required-title">
          AI 추천 패키지는 간단한 설문을 통해 이용가능해요.
          <br />
          산초님에 대해 알려주실래요?
        </h3>
      </Wrap>
      <PrimaryBtn type="button" onClick={onGoSurvey}>
        설문하러 가기
      </PrimaryBtn>
    </Dialog>
  );
}

const Wrap = styled.div`
  text-align: center;
  padding: 8px 4px 16px;
  h3 {
    margin-top: 12px;
    font-size: 18px;
    line-height: 1.6;
    color: #151a2b;
    font-weight: 500;
  }
`;
const Logo = styled.img`
  width: 72px;
  height: 72px;
  margin: 0 auto;
  display: block;
`;
const PrimaryBtn = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 10px;
  font-weight: 600;
  background: linear-gradient(
    94deg,
    #476afc 0%,
    #8896ff 42%,
    #c5d6ff 71%,
    #81dece 93%,
    #4ce5a7 100%
  );
  color: #fff;
  border: 0;
  cursor: pointer;
`;
