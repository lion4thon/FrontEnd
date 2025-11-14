

import { api } from "../../../lib/api";

/** 패키지 상태 타입 */
export type PassStatus = "IN_CART" | "IN_LOCKER" | "OWNED" | "COMPLETED";

/** 패키지 안에 포함된 시설 정보 */
export interface PassItem {
  facilityId: number;
  facilityName: string;
  sportName: string;
}

/** /api/my-passes 에서 내려오는 개별 패키지 정보 */
export interface MyPass {
  passId: number;
  passName: string;
  passPrice: number;
  passDescription: string;
  passItem: PassItem[];
  // imgUrl 같은 게 추가되면 여기서 필드만 하나 더 늘리면 됨
  // imgUrl?: string;
}

/** 공통 응답 래퍼 타입 */
export interface ApiResponse<T> {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
}

/** 상태별 패키지 조회 */
export async function getMyPasses(status: PassStatus): Promise<ApiResponse<MyPass[]>> {
  const { data } = await api.get<ApiResponse<MyPass[]>>("/api/my-passes", {
    params: { status },
  });

  return data;
}