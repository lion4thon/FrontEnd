// 인증 토큰 관리 유틸리티

const ACCESS_TOKEN_KEY = "accessToken";

/**
 * AccessToken을 localStorage에 저장
 */
export const setAccessToken = (token: string): void => {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

/**
 * localStorage에서 AccessToken 가져오기
 */
export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN_KEY);
};

/**
 * AccessToken 삭제
 */
export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
};

/**
 * AccessToken이 존재하는지 확인
 */
export const hasAccessToken = (): boolean => {
  return getAccessToken() !== null;
};

