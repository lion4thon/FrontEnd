import { useMemo, useReducer } from "react";

// 타입 선언
export type QuestionKind = "single" | "multi";

export type SurveyKey =
  | "goal"
  | "time"
  | "intensity"
  | "moveTime"
  | "env"
  | "interest"
  | "recovery"
  | "sessionTime"
  | "risk";

export type SurveyAnswerMap = {
  goal: string;
  time: string;
  intensity: string;
  moveTime: string;
  env: string;
  interest: string[];
  recovery: string;
  sessionTime: string;
  risk: string[];
};

export type SurveyState = Partial<SurveyAnswerMap>;

export type BaseQuestion<K extends SurveyKey> = {
  key: K;
  title: string;
  subtitle?: string;
  required?: boolean;
};

export type SingleQuestion<K extends SurveyKey> = BaseQuestion<K> & {
  kind: "single";
  options: string[];
};

export type MultiQuestion<K extends SurveyKey> = BaseQuestion<K> & {
  kind: "multi";
  options: string[];
  maxSelect?: number;
};

export type QuestionSchema =
  | SingleQuestion<
      | "goal"
      | "time"
      | "intensity"
      | "moveTime"
      | "env"
      | "recovery"
      | "sessionTime"
    >
  | MultiQuestion<"interest" | "risk">;

export type SingleKey = Extract<QuestionSchema, { kind: "single" }>["key"];
export type MultiKey = Extract<QuestionSchema, { kind: "multi" }>["key"];

// 상태 기능(태그 선택)
type Action<K extends SurveyKey = SurveyKey> =
  | { type: "SET"; key: K; value: SurveyAnswerMap[K] }
  | { type: "CLEAR"; key: K }
  | { type: "RESET" };

const STORAGE = "mov-survey-v5";

function reducer<S extends SurveyState>(state: S, action: Action): S {
  switch (action.type) {
    case "SET":
      return { ...state, [action.key]: action.value } as S;
    case "CLEAR": {
      const next = { ...state } as Record<string, unknown>;
      delete next[action.key];
      return next as S;
    }
    case "RESET":
      return {} as S;
    default:
      return state;
  }
}

export function useSurveyState() {
  const [state, dispatch] = useReducer(
    reducer<SurveyState>,
    (() => {
      try {
        return JSON.parse(localStorage.getItem(STORAGE) ?? "{}") as SurveyState;
      } catch {
        return {};
      }
    })()
  );

  const setAnswer = <K extends SurveyKey>(key: K, value: SurveyAnswerMap[K]) =>
    dispatch({ type: "SET", key, value });

  const clearAnswer = <K extends SurveyKey>(key: K) =>
    dispatch({ type: "CLEAR", key });

  useMemo(() => {
    localStorage.setItem(STORAGE, JSON.stringify(state));
  }, [state]);

  return {
    state,
    setAnswer,
    clearAnswer,
    reset: () => dispatch({ type: "RESET" }),
  };
}
