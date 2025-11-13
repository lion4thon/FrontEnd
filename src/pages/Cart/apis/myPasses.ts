// src/pages/Cart/apis/myPasses.ts
import { api } from "../../../lib/api";

// 상태 값 타입 (문서에 나온 그대로)
export type MyPassStatus = "IN_CART" | "IN_LOCKER" | "OWNED" | "COMPLETED";

// 서버 DTO 타입들
export type PassItemDto = {
  facilityId: number;
  facilityName: string;
  sportName: string;
};

export type MyPassDto = {
  passId: number;
  passName: string;
  passPrice: number;
  passDescription: string;
  passItem: PassItemDto[];
};

export type MyPassesResponse = {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: MyPassDto[];
};

// 공통 조회 함수
export async function getMyPasses(status: MyPassStatus) {
  const res = await api.get<MyPassesResponse>("/api/my-passes", {
    params: { status },
  });

  return res.data; // { isSuccess, message, data: MyPassDto[] ... }
}

// 장바구니(생성한 패키지)만 따로 쓰고 싶을 때
export function getCartPasses() {
  return getMyPasses("IN_CART");
}

// 마이페이지 탭에서 쓸 수 있는 헬퍼들
export function getLockerPasses() {
  return getMyPasses("IN_LOCKER");
}

export function getOwnedPasses() {
  return getMyPasses("OWNED");
}

export function getCompletedPasses() {
  return getMyPasses("COMPLETED");
}