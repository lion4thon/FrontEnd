export const PRICE_OPTIONS = [
  "1~3만원",
  "3~5만원",
  "5~10만원",
  "10~30만원",
  "30만원 이상",
] as const;

export type PriceRange = (typeof PRICE_OPTIONS)[number] | "전체";

export const SORT_OPTIONS = [
  "AI 추천순",
  "조회순",
  "업로드순",
  "가격낮은순",
  "가격높은순",
] as const;

export type Sort = (typeof SORT_OPTIONS)[number] | "전체";

export interface FilterBarProps {
  price: PriceRange;
  sort: Sort;
  selectedTags?: string[];
  onChangePrice: (p: PriceRange) => void;
  onChangeSort: (s: Sort) => void;
  onToggleTag?: (tag: string) => void;
}
