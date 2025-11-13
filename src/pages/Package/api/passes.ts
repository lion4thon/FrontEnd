import { api } from "../../../lib/api";
import type { PassListResponse } from "../types/pass";

export async function fetchPasses(query?: {
  passName?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: string; // PRICE_HIGH, PRICE_LOW, VIEW_COUNT, LATEST
}) {
  const res = await api.get<PassListResponse>("/api/passes", {
    params: query,
  });

  return res.data.data; // PassItem[]
}
