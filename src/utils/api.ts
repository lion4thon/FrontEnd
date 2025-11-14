// API 호출 유틸리티

import { getAccessToken } from "./auth";
import type {
  StoreListResponse,
  FacilityDetailResponse,
  CreatePassRequest,
  CreatePassResponse,
  CreateReportRequest,
  CreateReportResponse,
  ReviewListResponse,
  MyPassResponse,
  CreateReviewRequest,
  CreateReviewResponse,
} from "../types/api";

// API 기본 URL (환경변수로 관리 가능)
// 개발 환경에서는 Vite proxy를 사용하므로 빈 문자열 (프록시가 /api로 시작하는 요청을 처리)
// 프로덕션에서는 실제 API 서버 URL 사용
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL
  // (import.meta.env.DEV ? "" : "http://localhost:8080");

/**
 * API 요청 옵션 타입
 */
interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: unknown;
  requiresAuth?: boolean;
}

/**
 * API 에러 클래스
 */
export class ApiError extends Error {
  status: number;
  code: string;
  timestamp?: string;

  constructor(
    status: number,
    code: string,
    message: string,
    timestamp?: string
  ) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.timestamp = timestamp;
  }
}

/**
 * API 호출 함수
 */
async function apiRequest<T>(
  endpoint: string,
  options: ApiRequestOptions = {}
): Promise<T> {
  const { method = "GET", headers = {}, body, requiresAuth = true } = options;

  // URL 구성
  const url = `${API_BASE_URL}${endpoint}`;

  // 헤더 구성
  const requestHeaders: Record<string, string> = {
    ...headers,
  };

  // Content-Type 설정
  if (body) {
    requestHeaders["Content-Type"] = "application/json";
  } else if (!requestHeaders["Content-Type"]) {
    // GET 요청에도 Content-Type 추가
    requestHeaders["Content-Type"] = "application/json";
  }

  // 인증 토큰 추가
  if (requiresAuth) {
    const token = getAccessToken();
    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    } else {
      // 토큰이 없을 때 경고 (개발 환경에서만)
      if (import.meta.env.DEV) {
        console.warn(
          "[API Warning] Access token is missing. API request may fail."
        );
      }
    }
  }

  // 요청 옵션 구성
  const requestOptions: RequestInit = {
    method,
    headers: requestHeaders,
  };

  // body가 있으면 추가
  if (body) {
    requestOptions.body = JSON.stringify(body);
  }

  try {
    // 디버깅을 위한 로그 (개발 환경에서만)
    if (import.meta.env.DEV) {
      const authHeader = requestHeaders.Authorization;
      console.log("[API Request]", {
        url,
        method,
        headers: requestHeaders,
        hasToken: !!getAccessToken(),
        authorizationHeader: authHeader
          ? `${authHeader.substring(0, 20)}...` // 토큰 일부만 표시 (보안)
          : "NOT SET",
        authorizationHeaderFull: authHeader || "NOT SET", // 전체 토큰 확인용 (개발 환경)
      });
    }

    const response = await fetch(url, requestOptions);

    // 응답이 JSON이 아닐 수 있으므로 먼저 텍스트로 읽기
    const responseText = await response.text();
    let responseData: unknown;

    try {
      responseData = JSON.parse(responseText);
    } catch {
      // JSON 파싱 실패 시 텍스트 그대로 사용
      responseData = responseText;
    }

    // 에러 처리
    if (!response.ok) {
      // 디버깅을 위한 로그 (개발 환경에서만)
      if (import.meta.env.DEV) {
        const authHeader = requestHeaders.Authorization;
        console.error("[API Error Response]", {
          status: response.status,
          statusText: response.statusText,
          url,
          requestHeaders: {
            ...requestHeaders,
            Authorization: authHeader
              ? `${authHeader.substring(0, 20)}...`
              : "NOT SET",
          },
          authorizationHeaderFull: authHeader || "NOT SET",
          responseData,
          responseText,
        });
      }

      if (typeof responseData === "object" && responseData !== null) {
        const errorData = responseData as {
          code?: string;
          message?: string;
          timestamp?: string;
          httpStatus?: number;
        };
        // 서버에서 반환한 에러 메시지 사용
        const errorMessage =
          errorData.message ||
          errorData.code ||
          `서버 오류가 발생했습니다. (${response.status})`;
        throw new ApiError(
          response.status,
          errorData.code || "UNKNOWN_ERROR",
          errorMessage,
          errorData.timestamp
        );
      }
      // JSON 파싱 실패 또는 텍스트 응답인 경우
      const errorMessage =
        typeof responseText === "string" && responseText.trim()
          ? responseText
          : `서버 오류가 발생했습니다. (${response.status} ${response.statusText})`;
      throw new ApiError(response.status, "UNKNOWN_ERROR", errorMessage);
    }

    return responseData as T;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }

    // 네트워크 에러 등 기타 에러 처리
    const errorMessage =
      error instanceof Error ? error.message : "네트워크 오류가 발생했습니다.";

    // 더 자세한 에러 정보 제공
    let detailedMessage = errorMessage;
    if (errorMessage === "Failed to fetch") {
      detailedMessage = `서버에 연결할 수 없습니다. (URL: ${url})`;
    }

    // 디버깅을 위한 로그
    if (import.meta.env.DEV) {
      console.error("[API Error]", {
        url,
        method,
        error: errorMessage,
        errorObject: error,
      });
    }

    throw new ApiError(0, "NETWORK_ERROR", detailedMessage);
  }
}

/**
 * 종목별 매장 목록 조회 API
 * @param sportName 종목 이름 (예: "필라테스", "PT")
 * @returns 매장 목록 응답
 */
export const getStoresBySport = async (
  sportName: string
): Promise<StoreListResponse> => {
  const endpoint = `/api/facilities/sportName=${encodeURIComponent(sportName)}`;

  return apiRequest<StoreListResponse>(endpoint, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 검색어로 매장 목록 조회 API
 * @param query 검색어 (매장 이름)
 * @returns 매장 목록 응답
 */
export const getStoresBySearch = async (
  query: string
): Promise<StoreListResponse> => {
  const endpoint = `/api/facilities/search?query=${encodeURIComponent(query)}`;

  return apiRequest<StoreListResponse>(endpoint, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 협력업체 상세정보 조회 API
 * @param facilityId 협력업체 ID
 * @returns 협력업체 상세정보 응답
 */
export const getFacilityDetail = async (
  facilityId: number
): Promise<FacilityDetailResponse> => {
  const endpoint = `/api/facilities/${facilityId}`;

  return apiRequest<FacilityDetailResponse>(endpoint, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 패키지 생성 API
 * @param request 패키지 생성 요청 데이터
 * @returns 패키지 생성 응답
 */
export const createPass = async (
  request: CreatePassRequest
): Promise<CreatePassResponse> => {
  const endpoint = `/api/pass`;

  return apiRequest<CreatePassResponse>(endpoint, {
    method: "POST",
    body: request,
    requiresAuth: true,
  });
};

/**
 * 리포트 생성 API
 * @param request 리포트 생성 요청 데이터
 * @returns 리포트 생성 응답
 */
export const createReport = async (
  request: CreateReportRequest
): Promise<CreateReportResponse> => {
  const endpoint = `/api/reports`;

  return apiRequest<CreateReportResponse>(endpoint, {
    method: "POST",
    body: request,
    requiresAuth: true,
  });
};

/**
 * 시설 리뷰 목록 조회 API
 * @param facilityId 시설 ID
 * @param page 페이지 번호 (0부터 시작, 기본값: 0)
 * @param size 한 페이지에 보여줄 개수 (기본값: 5)
 * @param sort 정렬 기준 (기본값: "createdAt,desc")
 * @returns 리뷰 목록 응답
 */
export const getFacilityReviews = async (
  facilityId: number,
  page: number = 0,
  size: number = 5,
  sort: string = "createdAt,desc"
): Promise<ReviewListResponse> => {
  const endpoint = `/api/facilities/${facilityId}/reviews?page=${page}&size=${size}&sort=${encodeURIComponent(
    sort
  )}`;

  return apiRequest<ReviewListResponse>(endpoint, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 마이페이지 패키지 목록 조회 API
 * @param status 패키지 상태 ("IN_LOCKER" | "OWNED" | "COMPLETED")
 * @returns 패키지 목록 응답
 */
export const getMyPasses = async (
  status: "IN_LOCKER" | "OWNED" | "COMPLETED"
): Promise<MyPassResponse> => {
  const endpoint = `/api/my-passes?status=${status}`;

  return apiRequest<MyPassResponse>(endpoint, {
    method: "GET",
    requiresAuth: true,
  });
};

/**
 * 시설 리뷰 생성 API
 * @param facilityId 시설 ID
 * @param request 리뷰 생성 요청 데이터
 * @returns 리뷰 생성 응답
 */
export const createFacilityReview = async (
  facilityId: number,
  request: CreateReviewRequest
): Promise<CreateReviewResponse> => {
  const endpoint = `/api/facilities/${facilityId}/reviews`;

  return apiRequest<CreateReviewResponse>(endpoint, {
    method: "POST",
    body: request,
    requiresAuth: true,
  });
};
