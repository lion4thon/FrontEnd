// src/apis/reservation.ts
import { api } from "../../../lib/api";

export interface CreateReservationPayload {
  facilityId: number;
  passId: number;
  startTime: string; // ISO 8601
  endTime: string;   // ISO 8601
}

export async function createReservation(payload: CreateReservationPayload) {
  try {
    const response = await api.post("/api/reservations", payload);
    console.log("예약 성공");

    return response.data;
  } catch (err) {
    console.error("[Error] 예약 생성 실패:", err);
    throw err;
  }
}