import type { QuestionSchema, SurveyKey } from "./survey.state";

export const QUESTIONS: QuestionSchema[] = [
  {
    key: "goal",
    kind: "single",
    required: true,
    title: "운동의 목적은 무엇인가요?",
    subtitle: "단일 선택만 가능해요.",
    options: [
      "다이어트",
      "회복(통증완화, 재활 등)",
      "체력 증진",
      "스트레스 해소",
      "취미 탐색",
    ],
  },

  {
    key: "time",
    kind: "single",
    required: true,
    title: "주로 어떤 시간에 운동하는 걸 선호하시나요?",
    subtitle: "단일 선택만 가능해요.",
    options: [
      "새벽(05시~07시)",
      "오전(07시~12시)",
      "오후(12시~18시)",
      "저녁(18시~23시)",
      "심야(23시~05시)",
    ],
  },

  {
    key: "intensity",
    kind: "single",
    required: true,
    title: "운동의 강도는 어느 정도를 선호하시나요?",
    subtitle: "단일 선택만 가능해요.",
    options: [
      "가벼운 웜업 위주",
      "살짝 땀이 나는 정도",
      "땀이 흐를 정도의 중강도",
      "끝나면 기진맥진 고강도",
    ],
  },

  {
    key: "moveTime",
    kind: "single",
    required: true,
    title: "운동을 위한 이동 가능 시간은 어느 정도인가요?",
    subtitle: "단일 선택만 가능해요.",
    options: ["10분 이내", "10~20분", "30분 이내", "30분 이상도 가능"],
  },

  {
    key: "env",
    kind: "single",
    required: true,
    title: "어떤 환경에서 운동하시는 걸 더 선호하시나요?",
    subtitle: "단일 선택만 가능해요.",
    options: ["실내", "실외", "상관없음"],
  },

  {
    key: "interest",
    kind: "multi",
    required: false,
    title: "최근 관심있는 운동 종목이 있으신가요?",
    subtitle: "복수 선택이 가능해요.",
    options: [
      "헬스/PT",
      "필라테스",
      "요가",
      "수영",
      "클라이밍",
      "크로스핏",
      "F45",
      "파워리프팅",
    ],
  },

  {
    key: "recovery",
    kind: "single",
    required: true,
    title: "운동 후 회복 정도는 어떠신가요?",
    subtitle: "단일 선택만 가능해요.",
    options: ["매우 지침/피로함", "평범함", "높음/컨디션 양호"],
  },

  {
    key: "sessionTime",
    kind: "single",
    required: true,
    title: "1회 기준 패키지의 권역의 적정 수준은 얼마라고 생각하시나요?",
    subtitle: "단일 선택만 가능해요.",
    options: [
      "새벽(05시~07시)",
      "오전(07시~12시)",
      "오후(12시~18시)",
      "저녁(18시~23시)",
      "심야(23시~05시)",
    ],
  },

  {
    key: "risk",
    kind: "multi",
    required: false,
    title: "피하고 싶은 요소가 있다면 알려주세요.",
    subtitle: "복수 선택이 가능",
    options: [
      "가벼운 웜업 위주",
      "살짝 땀이 나는 정도",
      "땀이 흐를 정도의 중강도",
      "끝나면 기진맥진 고강도",
    ],
  },
];

export const PAGE_GROUPS: { title: string; keys: SurveyKey[] }[] = [
  { title: "진행-01", keys: ["goal", "time", "intensity"] },
  { title: "진행-02", keys: ["moveTime", "env", "interest"] },
  { title: "진행-03", keys: ["recovery", "sessionTime", "risk"] },
];
