export interface PassItem {
  passId: number;
  passName: string;
  passDescription: string;
  passPrice: number;
}

export interface PassListResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: PassItem[];
}
