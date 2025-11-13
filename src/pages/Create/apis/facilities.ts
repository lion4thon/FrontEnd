// src/apis/facilities.ts
import { api } from "../../../lib/api";

// ----- API 응답 타입 -----
export interface FacilityBySportItem {
  id: number;
  name: string;
  address: string;
  price: number;
}

export interface FacilitiesBySportResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: {
    content: FacilityBySportItem[];
    last: boolean;
    totalPages: number;
    totalElements: number;
    size: number;
    number: number;
    first: boolean;
    numberOfElements: number;
    empty: boolean;
  };
}

// ----- API 함수 -----
export const getFacilitiesBySportName = async (sportName: string) => {
    const fullUrl = api.getUri({
    url: "/api/facilities",
    params: { sportName },
  });

  console.log("[DEBUG] 최종 요청 URL:", fullUrl);
  const res = await api.get<FacilitiesBySportResponse>("/api/facilities", {
    params: { sportName },
  });

  return res.data;
};