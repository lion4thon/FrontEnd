// src/apis/payment.ts
import { api } from "../../../lib/api";

export const requestPayment = async (passIds: number[]) => {
  const res = await api.post("/api/payment/complete", {
    passId: passIds,
  });

  return res.data; // { isSuccess, data: { passId, totalPrice }, ... }
};