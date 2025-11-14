// 패키지 생성 api
import { api } from "../../../lib/api";

export type StorageType = "CART" | "LOCKER";

export interface CreatePassRequest {
  facilityIdList: number[];
  passPrice: number;
  passName: string;
  passDescription: string;
  storageType: StorageType; // "CART" | "LOCKER"
}

export interface BaseResponse<T = unknown> {
  isSuccess: boolean;
  code: string;
  message: string;
  httpStatus: number;
  data: T;
}

export const createPass = async (body: CreatePassRequest) => {
  const res = await api.post<BaseResponse<null>>("/api/pass", body);
  return res.data;
};