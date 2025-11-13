import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import ReportCreate from "./ReportCreate";
import type { ReportData } from "./ReportCreate";
import * as S from "./Report.styles";
import type { CompletedPackage } from "./Mypage.types";
import { createReport } from "../../utils/api";
import { ApiError } from "../../utils/api";

const numberIcons: Record<number, string> = {
  1: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/DwNfOC03zW.png",
  2: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/hT0JnvFWQf.png",
  3: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/YcjxYBk3R7.png",
  4: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/upH7NBVX0X.png",
  5: "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/fTZUm6b1Rq.png",
};

type Intensity = "low" | "medium" | "high";
type Condition = "diet" | "strength" | null;
type BodyPart =
  | "shoulder"
  | "arm"
  | "chest"
  | "back"
  | "abdomen"
  | "waist"
  | "lowerBody";
type Mood =
  | "vitality"
  | "refreshing"
  | "calm"
  | "invigorating"
  | "achievement"
  | "fatigue"
  | "lethargy";

export default function Report() {
  const location = useLocation();
  const packageData = (location.state as { package: CompletedPackage } | null)
    ?.package;

  const [intensity, setIntensity] = useState<Intensity | null>("low");
  const [condition, setCondition] = useState<Condition>(null);
  const [bodyParts, setBodyParts] = useState<BodyPart[]>([]);
  const [moods, setMoods] = useState<Mood[]>([]);
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // TODO: API 연결 시 사용자 이름으로 교체
  const userName = "산초";

  // 날짜 포맷팅 (예: "10월 31일")
  const formatDate = (date: Date): string => {
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return `${month}월 ${day}일`;
  };

  // 리포트 제목 생성 (예: "10월 31일 필라테스 세션 리포트")
  const generateReportTitle = (date: Date): string => {
    // 패키지 제목에서 운동 종류 추출 (예: "필라테스", "헬스 트레이닝", "요가")
    // 실제로는 패키지 데이터에서 운동 종류를 가져와야 함
    const exerciseType = "필라테스"; // TODO: 패키지 데이터에서 추출
    return `${formatDate(date)} ${exerciseType} 세션 리포트`;
  };

  // 운동 강도를 한글로 변환
  const intensityToKorean = (intensity: Intensity): string => {
    const mapping: Record<Intensity, string> = {
      low: "낮음",
      medium: "보통",
      high: "높음",
    };
    return mapping[intensity];
  };

  // 몸의 컨디션을 한글로 변환
  const conditionToKorean = (condition: Condition): string => {
    if (!condition) return "";
    const mapping: Record<"diet" | "strength", string> = {
      diet: "다이어트",
      strength: "체력 증진",
    };
    return mapping[condition];
  };

  // 자극 부위를 한글로 변환
  const bodyPartToKorean = (bodyPart: BodyPart): string => {
    const mapping: Record<BodyPart, string> = {
      shoulder: "어깨",
      arm: "팔",
      chest: "가슴",
      back: "등",
      abdomen: "복부",
      waist: "허리",
      lowerBody: "하체",
    };
    return mapping[bodyPart];
  };

  // 기분/에너지를 한글로 변환
  const moodToKorean = (mood: Mood): string => {
    const mapping: Record<Mood, string> = {
      vitality: "활력",
      refreshing: "개운함",
      calm: "차분함",
      invigorating: "상쾌함",
      achievement: "성취감",
      fatigue: "피로함",
      lethargy: "무기력",
    };
    return mapping[mood];
  };

  const handleBodyPartToggle = (part: BodyPart) => {
    setBodyParts((prev) =>
      prev.includes(part) ? prev.filter((p) => p !== part) : [...prev, part]
    );
  };

  const handleMoodToggle = (mood: Mood) => {
    setMoods((prev) => {
      if (prev.includes(mood)) {
        return prev.filter((m) => m !== mood);
      } else if (prev.length < 2) {
        return [...prev, mood];
      }
      return prev;
    });
  };

  const handleSubmit = () => {
    if (!packageData) return;

    // 리포트 데이터 생성
    if (!intensity) {
      // intensity가 선택되지 않았으면 모달을 열지 않음
      alert("운동 강도를 선택해주세요.");
      return;
    }

    // 모달 열기
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveReport = async () => {
    if (!packageData || !intensity) {
      alert("필수 항목을 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);

      // 데이터 변환
      const workoutIntensity = intensityToKorean(intensity);
      const postWorkoutCondition = conditionToKorean(condition);
      const muscleActivationAreas = bodyParts.map(bodyPartToKorean);
      const postWorkoutMood = moods.map(moodToKorean);

      // API 요청 데이터 생성
      // postWorkoutCondition이 없으면 기본값 "중" 사용 (API Response 예시 참고)
      const request = {
        passId: packageData.id,
        workoutIntensity,
        postWorkoutCondition: postWorkoutCondition || "중",
        muscleActivationAreas,
        postWorkoutMood,
        oneLineNote: comment.trim(),
      };

      // API 호출
      const response = await createReport(request);

      if (response.isSuccess) {
        console.log("리포트 저장 성공:", response.data);
        alert("리포트가 성공적으로 저장되었습니다.");
        // 모달 닫기
        setIsModalOpen(false);
        // TODO: 성공 시 처리 (예: 마이페이지로 이동)
        // navigate("/mypage");
      } else {
        throw new Error(response.message || "리포트 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error("리포트 저장 실패:", error);
      if (error instanceof ApiError) {
        alert(error.message || "리포트 저장에 실패했습니다.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("리포트 저장에 실패했습니다.");
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!packageData) {
    return (
      <>
        <Header />
        <S.Container>
          <S.Content>
            <S.HeaderSection>
              <S.Title>패키지 정보를 찾을 수 없습니다.</S.Title>
            </S.HeaderSection>
          </S.Content>
        </S.Container>
      </>
    );
  }

  const reportData: ReportData | null =
    packageData && intensity
      ? {
          package: packageData,
          intensity,
          condition,
          bodyParts,
          moods,
          comment,
          date: formatDate(new Date()),
          reportTitle: generateReportTitle(new Date()),
        }
      : null;

  return (
    <>
      <Header />
      <ReportCreate
        open={isModalOpen}
        onClose={handleCloseModal}
        reportData={reportData}
        onSave={handleSaveReport}
        isSubmitting={isSubmitting}
      />
      <S.Container>
        <S.Content>
          <S.HeaderSection>
            <S.Title>
              {userName}님!
              <br />
              오늘의 운동 상태를 기록하고 리포트를 생성해 보세요.
            </S.Title>
          </S.HeaderSection>

          <S.SectionsContainer>
            {/* Section 1: 운동 강도 */}
            <S.Section>
              <S.SectionNumberWrapper>
                <S.SectionNumberBg $bgImage={numberIcons[1]} />
                <S.SectionNumberText>1</S.SectionNumberText>
              </S.SectionNumberWrapper>
              <S.SectionContent>
                <S.Question>오늘 느낀 운동의 강도는 어땠나요?</S.Question>
                <S.ButtonGroup>
                  <S.OptionButton
                    selected={intensity === "low"}
                    onClick={() => setIntensity("low")}
                  >
                    낮음
                  </S.OptionButton>
                  <S.OptionButton
                    selected={intensity === "medium"}
                    onClick={() => setIntensity("medium")}
                  >
                    보통
                  </S.OptionButton>
                  <S.OptionButton
                    selected={intensity === "high"}
                    onClick={() => setIntensity("high")}
                  >
                    높음
                  </S.OptionButton>
                </S.ButtonGroup>
              </S.SectionContent>
            </S.Section>

            {/* Section 2: 몸의 컨디션 */}
            <S.Section>
              <S.SectionNumberWrapper>
                <S.SectionNumberBg $bgImage={numberIcons[2]} />
                <S.SectionNumberText>2</S.SectionNumberText>
              </S.SectionNumberWrapper>
              <S.SectionContent>
                <S.Question>운동 후 몸의 컨디션은 어떤가요?</S.Question>
                <S.ButtonGroup>
                  <S.OptionButton
                    selected={condition === "diet"}
                    onClick={() => setCondition("diet")}
                  >
                    다이어트
                  </S.OptionButton>
                  <S.OptionButton
                    selected={condition === "strength"}
                    onClick={() => setCondition("strength")}
                  >
                    체력 증진
                  </S.OptionButton>
                </S.ButtonGroup>
              </S.SectionContent>
            </S.Section>

            {/* Section 3: 자극이 느껴진 부위 */}
            <S.Section>
              <S.SectionNumberWrapper>
                <S.SectionNumberBg $bgImage={numberIcons[3]} />
                <S.SectionNumberText>3</S.SectionNumberText>
              </S.SectionNumberWrapper>
              <S.SectionContent>
                <S.QuestionWrapper>
                  <S.Question>주로 자극이 느껴진 부위는 어디인가요?</S.Question>
                  <S.Subtitle>복수 선택이 가능해요.</S.Subtitle>
                </S.QuestionWrapper>
                <S.ButtonGroup>
                  <S.OptionButton
                    selected={bodyParts.includes("shoulder")}
                    onClick={() => handleBodyPartToggle("shoulder")}
                  >
                    어깨
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("arm")}
                    onClick={() => handleBodyPartToggle("arm")}
                  >
                    팔
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("chest")}
                    onClick={() => handleBodyPartToggle("chest")}
                  >
                    가슴
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("back")}
                    onClick={() => handleBodyPartToggle("back")}
                  >
                    등
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("abdomen")}
                    onClick={() => handleBodyPartToggle("abdomen")}
                  >
                    복부
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("waist")}
                    onClick={() => handleBodyPartToggle("waist")}
                  >
                    허리
                  </S.OptionButton>
                  <S.OptionButton
                    selected={bodyParts.includes("lowerBody")}
                    onClick={() => handleBodyPartToggle("lowerBody")}
                  >
                    하체
                  </S.OptionButton>
                </S.ButtonGroup>
              </S.SectionContent>
            </S.Section>

            {/* Section 4: 운동 후 기분이나 에너지 */}
            <S.Section>
              <S.SectionNumberWrapper>
                <S.SectionNumberBg $bgImage={numberIcons[4]} />
                <S.SectionNumberText>4</S.SectionNumberText>
              </S.SectionNumberWrapper>
              <S.SectionContent>
                <S.QuestionWrapper>
                  <S.Question>
                    운동 후 기분이나 에너지는 어떻게 변했나요?
                  </S.Question>
                  <S.Subtitle>최대 2개를 선택할 수 있어요.</S.Subtitle>
                </S.QuestionWrapper>
                <S.ButtonGroup>
                  <S.OptionButton
                    selected={moods.includes("vitality")}
                    onClick={() => handleMoodToggle("vitality")}
                    disabled={!moods.includes("vitality") && moods.length >= 2}
                  >
                    활력
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("refreshing")}
                    onClick={() => handleMoodToggle("refreshing")}
                    disabled={
                      !moods.includes("refreshing") && moods.length >= 2
                    }
                  >
                    개운함
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("calm")}
                    onClick={() => handleMoodToggle("calm")}
                    disabled={!moods.includes("calm") && moods.length >= 2}
                  >
                    차분함
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("invigorating")}
                    onClick={() => handleMoodToggle("invigorating")}
                    disabled={
                      !moods.includes("invigorating") && moods.length >= 2
                    }
                  >
                    상쾌함
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("achievement")}
                    onClick={() => handleMoodToggle("achievement")}
                    disabled={
                      !moods.includes("achievement") && moods.length >= 2
                    }
                  >
                    성취감
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("fatigue")}
                    onClick={() => handleMoodToggle("fatigue")}
                    disabled={!moods.includes("fatigue") && moods.length >= 2}
                  >
                    피로함
                  </S.OptionButton>
                  <S.OptionButton
                    selected={moods.includes("lethargy")}
                    onClick={() => handleMoodToggle("lethargy")}
                    disabled={!moods.includes("lethargy") && moods.length >= 2}
                  >
                    무기력
                  </S.OptionButton>
                </S.ButtonGroup>
              </S.SectionContent>
            </S.Section>

            {/* Section 5: 한 줄 기록 */}
            <S.Section $last>
              <S.SectionNumberWrapper>
                <S.SectionNumberBg $bgImage={numberIcons[5]} />
                <S.SectionNumberText>5</S.SectionNumberText>
              </S.SectionNumberWrapper>
              <S.SectionContent>
                <S.Question>
                  오늘 운동에 대한 한 줄 기록을 남겨주세요.
                </S.Question>
                <S.TextInput
                  placeholder="코멘트 작성하기"
                  value={comment}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setComment(e.target.value)
                  }
                />
              </S.SectionContent>
            </S.Section>
          </S.SectionsContainer>

          <S.SubmitButtonContainer>
            <S.SubmitButton onClick={handleSubmit}>제출하기</S.SubmitButton>
          </S.SubmitButtonContainer>
        </S.Content>
      </S.Container>
    </>
  );
}
