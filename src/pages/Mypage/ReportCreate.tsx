import React, { useEffect } from "react";
import * as S from "./ReportCreate.styles";
import type { CompletedPackage } from "./Mypage.types";

export type ReportData = {
  package: CompletedPackage;
  intensity: "low" | "medium" | "high";
  condition: "diet" | "strength" | null;
  bodyParts: string[];
  moods: string[];
  comment: string;
  date: string;
  reportTitle: string;
};

interface ReportCreateProps {
  open: boolean;
  onClose: () => void;
  reportData: ReportData | null;
  onSave?: () => void;
}

const getIntensityText = (intensity: "low" | "medium" | "high"): string => {
  const map = {
    low: "낮음",
    medium: "중간",
    high: "높음",
  };
  return map[intensity] || "중간";
};

const getConditionText = (condition: "diet" | "strength" | null): string => {
  if (!condition) return "-";
  const map = {
    diet: "다이어트",
    strength: "체력 증진",
  };
  return map[condition] || "-";
};

const getBodyPartText = (bodyParts: string[]): string => {
  if (bodyParts.length === 0) return "-";
  const map: Record<string, string> = {
    shoulder: "어깨",
    arm: "팔",
    chest: "가슴",
    back: "등",
    abdomen: "복부",
    waist: "허리",
    lowerBody: "하체",
  };
  return bodyParts.map((part) => map[part] || part).join(", ");
};

const getMoodText = (moods: string[]): string => {
  if (moods.length === 0) return "-";
  const map: Record<string, string> = {
    vitality: "활력",
    refreshing: "개운함",
    calm: "차분",
    invigorating: "상쾌함",
    achievement: "성취감",
    fatigue: "피로함",
    lethargy: "무기력",
  };
  return moods.map((mood) => map[mood] || mood).join(", ");
};

export default function ReportCreate({
  open,
  onClose,
  reportData,
  onSave,
}: ReportCreateProps) {
  const [reportTitle, setReportTitle] = React.useState("");

  // 바디 스크롤 잠금 + ESC 닫기
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  // 모달이 열릴 때 리포트 제목 초기화 (빈 문자열로 시작)
  useEffect(() => {
    if (open) {
      setReportTitle("");
    }
  }, [open]);

  if (!open || !reportData) return null;

  const isSaveEnabled = reportTitle.trim().length > 0;

  const handleSave = () => {
    if (!isSaveEnabled) return;

    // TODO: API 호출로 리포트 저장
    const reportDataWithTitle = {
      ...reportData,
      reportTitle: reportTitle.trim(),
    };
    console.log("리포트 저장:", reportDataWithTitle);
    if (onSave) {
      onSave();
    }
    onClose();
  };

  const handleBackdrop = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <S.Backdrop onMouseDown={handleBackdrop}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <S.CloseIcon />
        </S.CloseButton>

        <S.Header>
          <S.Title>리포트 생성</S.Title>
        </S.Header>

        <S.PackageCard>
          <S.PackageThumbnail
            src={reportData.package.thumbnail}
            alt={reportData.package.title}
          />
          <S.PackageInfo>
            <S.PackageTitleRow>
              <S.PackageTitle>{reportData.package.title}</S.PackageTitle>
              <S.ChevronIcon />
            </S.PackageTitleRow>
            <S.PackageDescription>
              {reportData.package.description}
            </S.PackageDescription>
          </S.PackageInfo>
        </S.PackageCard>

        <S.ReportTitleCard>
          <S.ReportTitleInput
            type="text"
            placeholder={reportData.reportTitle || "리포트 이름을 입력하세요"}
            value={reportTitle}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setReportTitle(e.target.value)
            }
          />
        </S.ReportTitleCard>

        <S.SummaryCard>
          <S.SummaryTitle>오늘의 운동 요약</S.SummaryTitle>
          <S.SummaryContent>
            <S.SummaryRow>
              <S.SummaryLabel>운동 강도</S.SummaryLabel>
              <S.SummaryLabel>컨디션</S.SummaryLabel>
              <S.SummaryLabel>자극 부위</S.SummaryLabel>
              <S.SummaryLabel>감정 변화</S.SummaryLabel>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryValue>
                {getIntensityText(reportData.intensity)}
              </S.SummaryValue>
              <S.SummaryValue>
                {getConditionText(reportData.condition)}
              </S.SummaryValue>
              <S.SummaryValue>
                {getBodyPartText(reportData.bodyParts)}
              </S.SummaryValue>
              <S.SummaryValue>{getMoodText(reportData.moods)}</S.SummaryValue>
            </S.SummaryRow>
          </S.SummaryContent>
        </S.SummaryCard>

        <S.FeedbackCard>
          <S.FeedbackTitle>피드백 & 코멘트</S.FeedbackTitle>
          <S.FeedbackContent>
            {reportData.comment || "코멘트가 없습니다."}
          </S.FeedbackContent>
        </S.FeedbackCard>

        <S.SaveButton onClick={handleSave} disabled={!isSaveEnabled}>
          리포트 저장
        </S.SaveButton>
      </S.ModalContent>
    </S.Backdrop>
  );
}
