// src/apis/survey.api.ts
import {api} from "../../../../lib/api"; // 이미 쓰고 있는 axios 인스턴스
import type { ApiResponse, SurveyDto, SurveyRequest } from "../types/survey.types";

export async function createSurvey(body: SurveyRequest) {
  const res = await api.post<ApiResponse<SurveyDto>>("/api/survey", body);
  return res.data.data; // SurveyDto 만 리턴
}