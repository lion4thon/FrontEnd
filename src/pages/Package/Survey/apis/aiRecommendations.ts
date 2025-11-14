// src/pages/Package/Survey/apis/aiRecommendations.ts
import { api } from "../../../../lib/api";

/** 공통 API 응답 래퍼 */
interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  timestamp: string;
  data: T;
}


export interface AiRecommendationRequest {
  purpose: string;
  preferred_time: string;
  preferred_intensity: string;
  travel_time: string;
  environment: string;
  /** 운동 종목 이름 리스트 (예: ["웨이트 & 크로스핏", "실내 수영"]) */
  preferred_sports: string[];
  recovery_level: string;
  /** "이만원대" 같은 가격대 텍스트 */
  budget_range: string;
  avoid_factors: string[];
}

/** 추천 패키지 1개 */
export interface AiRecommendation {
  name: string;
  price: number;
  intensity: "LOW" | "MID" | "HIGH";
  pass_id: number;
  purposeTag: string;
  predicted_score: number;
  image_url: string;
}

/** /api/ai/recommendations 의 data 필드 */
export interface AiRecommendationResponse {
  recommendations: AiRecommendation[];
  total_count: number;
}


/** AI 추천 패키지 조회 */
export async function getAiRecommendations(
  payload: AiRecommendationRequest
): Promise<AiRecommendationResponse> {
  const res = await api.post<ApiResponse<AiRecommendationResponse>>(
    "/api/ai/recommendations",
    payload
  );

  // 서버 공통 응답에서 data만 꺼내서 반환
  return res.data.data;
}