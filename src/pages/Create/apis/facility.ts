// 검색 api, 상세 정보 검색 api, 리뷰 검색 api
import { api } from "../../../lib/api";

// 파일 상단 어딘가에 추가
export type LocationStore = {
  id: number | string;
  name: string;
  address: string;
  image: string;
};

export interface ApiFacility {
  id: number;
  name: string;
  address: string;
  price: number; 
}

export interface FacilitySearchResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  data: {
    content: ApiFacility[];
  };
}

export interface FacilityDetail {
  id: number;
  name: string;
  address: string;
  detailAddress: string;
  contact: string;
  price: number;
  weekdayHours: string;
  weekendHours: string;
  holidayClosedInfo: string;
  accessGuide: string;
  features: string; 
}

export interface FacilityDetailResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  data: FacilityDetail;
}

export interface FacilityReview {
  reviewId: number;
  username: string;
  comment: string;
  createdAt: string; // "2025.11.13" 같은 형식의 문자열
}

// export interface FacilityReviewPage {
//   content: FacilityReview[];
//   pageable: {
//     pageNumber: number;
//     pageSize: number;
//   };
//   totalElements: number;
//   totalPages: number;
//   last: boolean;
//   first: boolean;
//   size: number;
//   number: number;
//   sort: {
//     sorted: boolean;
//     unsorted: boolean;
//     empty: boolean;
//   };
//   numberOfElements: number;
//   empty: boolean;
// }

export interface FacilityReviewPage {
  content: FacilityReview[];

  pageable: {
    pageNumber: number;
    pageSize: number;
    offset: number;
    paged: boolean;
    unpaged: boolean;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
  };

  totalElements: number;
  totalPages: number;
  last: boolean;
  first: boolean;
  size: number;
  number: number;

  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };

  numberOfElements: number;
  empty: boolean;
}

export interface FacilityReviewsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  data: FacilityReviewPage;
}

export const searchFacilities = async (query: string) => {
  const res = await api.get<FacilitySearchResponse>(
    "/api/facilities/search",
    {
      params: { query },
    }
  );

  return res.data;
};

export const getFacilityDetail = async (facilityId: number) => {
  const res = await api.get<FacilityDetailResponse>(
    `/api/facilities/${facilityId}`
  );
  return res.data;
};

export const getFacilityReviews = async (
  facilityId: number,
  params?: { page?: number; size?: number; sort?: string }
) => {
  const res = await api.get<FacilityReviewsResponse>(
    `/api/facilities/${facilityId}/reviews`,
    { params }
  );

  return res.data;
};