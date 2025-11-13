// src/pages/Package/Survey/survey.mapper.ts
import type { SurveyAnswerMap } from "./survey.state";
import type { SurveyRequest } from "./types/survey.types";

export function buildSurveyRequest(state: Partial<SurveyAnswerMap>): SurveyRequest {
  return {
    purpose: state.goal ?? "",
    preferredTime: state.time ?? "",

    // price는 현재 질문에 없으니까 기본값 넣거나,
    // 따로 price 질문을 만들었으면 그 state에서 가져오기
    price: 50000,

    preferredIntensity: state.intensity ?? "",
    recoveryCondition: state.recovery ?? "",
    preferredEnvironment: state.env ?? "",
    timeRange: state.moveTime ?? "",

    avoidFactors: state.risk ?? [],
    interestedSportIds: (state.interest ?? []).map(Number),
  };
}