// 매장 데이터 변환 유틸리티

import type { ApiStore } from "../types/api";

// Store 인터페이스 (공통 사용)
export interface Store {
  id: string;
  name: string;
  address: string;
  image: string;
  description: {
    group: string;
    time: string;
  };
  price: string;
}

// 기본 매장 이미지 (API 응답에 이미지가 없을 경우 사용)
const DEFAULT_STORE_IMAGE =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/vdWGL1zHoC.png";

/**
 * API 응답 데이터를 Store 인터페이스로 변환
 */
export const convertApiStoreToStore = (apiStore: ApiStore): Store => {
  return {
    id: apiStore.id.toString(),
    name: apiStore.name,
    address: apiStore.address,
    image: DEFAULT_STORE_IMAGE,
    description: {
      group: "그룹 (3인)", // 기본값, 추후 API에서 제공될 수 있음
      time: "1타임 (60분)", // 기본값, 추후 API에서 제공될 수 있음
    },
    price: `${apiStore.price.toLocaleString("ko-KR")}원`,
  };
};

