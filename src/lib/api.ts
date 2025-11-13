import axios, {
  AxiosError,
  AxiosHeaders,
  type InternalAxiosRequestConfig,
  type AxiosRequestConfig,
} from "axios";

type RetryableConfig = AxiosRequestConfig & { _retry?: boolean };

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// =====================
// 매 요청에 access_token 자동 첨부
// =====================
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem("access_token");
  console.log(`${import.meta.env.VITE_API_BASE_URL}`);

  if (token) {
    // headers 없으면 AxiosHeaders 인스턴스로 초기화
    const headers =
      (config.headers as AxiosHeaders | undefined) ?? new AxiosHeaders();

    headers.set("Authorization", `Bearer ${token}`);

    // 다시 config.headers에 넣어주기
    config.headers = headers;
  }

  return config;
});

// =====================
// 401이면 refresh 시도 → 실패시 로그아웃
// =====================
let refreshing = false;
let queue: Array<() => void> = [];

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryableConfig | undefined;
    const status = error.response?.status;

    if (!original) {
      // config 자체가 없으면 그냥 에러 내보내기
      throw error;
    }

    if (status === 401 && !original._retry) {
      original._retry = true;

      const refresh = localStorage.getItem("refresh_token");
      if (!refresh) throw error;

      if (refreshing) {
        // 이미 다른 요청이 refresh 중이면 끝날 때까지 대기
        await new Promise<void>((resolve) => queue.push(resolve));
      } else {
        try {
          refreshing = true;

          const { data } = await axios.post(
            `${api.defaults.baseURL}/api/auth/refresh`,
            { refresh_token: refresh }
          );

          const newAccess = data?.access_token as string | undefined;

          if (newAccess) {
            localStorage.setItem("access_token", newAccess);
          } else {
            throw new Error("no access");
          }
        } finally {
          refreshing = false;
          queue.forEach((fn) => fn());
          queue = [];
        }
      }

      // 토큰 갱신 후 재요청
      if (!original.headers) {
        original.headers = {};
      }
      (original.headers as Record<string, string>).Authorization = `Bearer ${
        localStorage.getItem("access_token") ?? ""
      }`;

      return api(original);
    }

    throw error;
  }
);

export { api };
