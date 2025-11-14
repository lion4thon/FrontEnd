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

export interface FacilityItem {
  facilityId: number;
  facilityName?: string;
  address?: string;
  category?: string;
  typeDescription?: string;
  price?: number;
  imageUrl?: string;
}

export interface PassDetail {
  passId: number;
  passName: string;
  passDescription: string;
  passPrice: number;
  imageUrl?: string;
  passItems: {
    facilityId: number;
    facilityName: string;
    sportName: string;
  }[];
}

export interface PassDetailResponse {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: PassDetail;
}
