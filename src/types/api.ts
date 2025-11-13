// API 응답 타입 정의

export interface ApiStore {
  id: number;
  name: string;
  address: string;
  price: number;
}

export interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: {
    empty: boolean;
    sorted: boolean;
    unsorted: boolean;
  };
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

export interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

export interface StoreListResponseData {
  content: ApiStore[];
  pageable: Pageable;
  last: boolean;
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

export interface ApiResponse<T> {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
}

export type StoreListResponse = ApiResponse<StoreListResponseData>;

// 협력업체 상세정보 응답 타입
export interface FacilityDetailData {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  contact: string;
  price: number;
  features: string;
  weekdayHours: string;
  weekendHours: string;
  holidayClosedInfo: string;
  accessGuide: string;
}

export type FacilityDetailResponse = ApiResponse<FacilityDetailData>;

// 패키지 생성 요청 타입
export interface CreatePassRequest {
  facilityIdList: number[];
  passPrice: number;
  passName: string;
  passDescription: string;
}

// 패키지 생성 응답 타입
export type CreatePassResponse = ApiResponse<null>;

// 리포트 생성 요청 타입
export interface CreateReportRequest {
  passId: number;
  workoutIntensity: string;
  postWorkoutCondition: string;
  muscleActivationAreas: string[];
  postWorkoutMood: string[];
  oneLineNote: string;
}

// 리포트 생성 응답 데이터 타입
export interface CreateReportResponseData {
  reportId: number;
  userId: number;
  sportId: number;
  workoutIntensity: string;
  postWorkoutCondition: string;
  muscleActivationAreas: string[];
  postWorkoutMood: string[];
  oneLineNote: string;
}

// 리포트 생성 응답 타입
export type CreateReportResponse = ApiResponse<CreateReportResponseData>;

// 리뷰 조회 응답 데이터 타입
export interface ReviewData {
  reviewId: number;
  username: string;
  comment: string;
  createdAt: string;
}

export interface ReviewListResponseData {
  content: ReviewData[];
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;
  sort: Sort;
  numberOfElements: number;
  empty: boolean;
}

export type ReviewListResponse = ApiResponse<ReviewListResponseData>;

// 마이페이지 패키지 조회 응답 데이터 타입
export interface PassItem {
  facilityId: number;
  facilityName: string;
  sportName: string;
}

export interface MyPassData {
  passId: number;
  passName: string;
  passPrice: number;
  passDescription: string;
  passItem: PassItem[];
}

export type MyPassResponse = ApiResponse<MyPassData[]>;

// 리뷰 생성 요청 타입
export interface CreateReviewRequest {
  comment: string;
}

// 리뷰 생성 응답 타입
export type CreateReviewResponse = ApiResponse<null>;

