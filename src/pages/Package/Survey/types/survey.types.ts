// src/types/survey.types.ts
export interface SurveyRequest {
  purpose: string;
  preferredTime: string;
  price: number;
  preferredIntensity: string;
  recoveryCondition: string;
  preferredEnvironment: string;
  timeRange: string;
  avoidFactors?: string[];
  interestedSportIds?: number[];
}

export interface SurveyDto {
  surveyId: number;
  userId: number;
  purpose: string;
  preferredTime: string;
  price: number;
  preferredIntensity: string;
  recoveryCondition: string;
  preferredEnvironment: string;
  timeRange: string;
  avoidFactors: string[];
  interestedSportIds: number[];
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  timestamp: string;
  data: T;
}