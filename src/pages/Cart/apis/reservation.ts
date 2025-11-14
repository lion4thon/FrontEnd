// src/apis/reservation.ts
import { api } from "../../../lib/api";

export interface CreateReservationPayload {
  facilityId: number;
  passId: number;
  startTime: string;
  endTime: string;   
}

export async function createReservation(payload: CreateReservationPayload) {
  try {
    const response = await api.post("/api/reservations", payload);
    alert(`${payload.facilityId} 예약이 생성되었습니다.`);

    return response.data;
  } catch (err) {
    console.error("[Error] 예약 생성 실패:", err);
    throw err;
  }
}