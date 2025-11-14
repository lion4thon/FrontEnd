export interface PassItem {
  passId: number;
  passName: string;
  passDescription: string;
  passPrice: number;
  imageUrl?: string;
}

export interface PassListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: PassItem[];
}
