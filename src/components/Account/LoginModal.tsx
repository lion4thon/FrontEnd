// src/components/Modal/LoginModal.tsx
import { useState } from "react";
import LogoModal from "../../assets/MOV_modal.svg";
import { api } from "../../lib/api";
import { useAuth } from "../../providers/AuthProvider";
import * as S from "./LoginModal.style";

/* ========= 타입 정의 ========= */

// 백엔드 DTO: record SignInUserRes(String grantType, String accessToken, String refreshToken)
interface SignInUserRes {
  grantType: string;
  accessToken: string;
  refreshToken: string;
}

// 공통 성공 응답 래퍼: SuccessResponse<T>
// interface SuccessResponse<T> {
//   data: T;
//   message?: string;
//   [key: string]: unknown;
// }

// 공통 래핑 응답
interface SuccessResponse<T> {
  isSuccess: boolean;
  timestamp: string;
  code: string;
  httpStatus: number;
  message: string;
  data: T;
}

// 에러 응답 타입 (AxiosError.response 비슷하게 최소만)
interface ErrorPayload {
  status?: number;
  data?: unknown;
}

// AxiosError 유사 객체 판별
function hasResponse(val: unknown): val is { response: ErrorPayload } {
  return typeof val === "object" && val !== null && "response" in val;
}

// message 필드 안전 추출
function extractMessage(data: unknown): string | undefined {
  if (typeof data === "object" && data !== null && "message" in data) {
    const msg = (data as { message: unknown }).message;
    return typeof msg === "string" ? msg : undefined;
  }
  return undefined;
}

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

export default function LoginModal({ onClose, onSuccess }: Props) {
  const { refresh } = useAuth();

  const [idOrEmail, setIdOrEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);

  const [err, setErr] = useState<string | null>(null);
  const [idErr, setIdErr] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;

    setErr(null);
    setIdErr(null);
    setPwErr(null);

    const te = idOrEmail.trim();
    const tp = pw.trim();
    let bad = false;

    if (!te) {
      setIdErr("아이디 또는 이메일을 입력해주세요.");
      bad = true;
    }
    if (!tp) {
      setPwErr("비밀번호를 입력해주세요.");
      bad = true;
    }
    if (bad) return;

    setLoading(true);

    try {
      // 응답 타입을 SuccessResponse<SignInUserRes> 로 정확히 지정
      const res = await api.post<SuccessResponse<SignInUserRes>>(
        "/api/auth/login",
        {
          username: te, // 백엔드 SignInUserReq.username
          password: tp, // 백엔드 SignInUserReq.password
        }
      );

      const tokens = res.data.data;

      // 토큰 저장 (널 체크도 같이)
      if (typeof tokens.accessToken === "string") {
        localStorage.setItem("access_token", tokens.accessToken);
      }
      if (typeof tokens.refreshToken === "string") {
        localStorage.setItem("refresh_token", tokens.refreshToken);
      }

      console.log("로그인 성공!");
      console.log("토큰:", tokens.accessToken); // 토큰 출력
      localStorage.setItem("token", tokens.accessToken);

      // AuthProvider.refresh는 이제 "로컬스토리지 기준으로 상태 동기화" 라서
      // 비동기 아니고, 그냥 호출만 하면 됨
      refresh();

      onSuccess?.();
      onClose();
    } catch (e: unknown) {
      if (hasResponse(e)) {
        const { status, data } = e.response;

        if (status === 401 || status === 400) {
          setErr("아이디(또는 이메일) 또는 비밀번호가 올바르지 않습니다.");
        } else {
          const msg = extractMessage(data);
          setErr(
            msg ?? "로그인 중 오류가 발생했어요. 잠시 후 다시 시도해주세요."
          );
        }
      } else {
        setErr("네트워크 오류가 발생했어요. 인터넷 연결을 확인해주세요.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <S.Wrap>
      <S.TopBar>
        <span aria-hidden="true" />
        <S.CloseBtn onClick={onClose} aria-label="닫기" disabled={loading}>
          ✕
        </S.CloseBtn>
      </S.TopBar>

      <S.LogoArea>
        <S.LogoImg src={LogoModal} alt="MOV 로고" />
      </S.LogoArea>

      <form onSubmit={submit} noValidate>
        {err && <S.ErrorBanner role="alert">{err}</S.ErrorBanner>}

        <S.Field>
          <label htmlFor="login-id">아이디 또는 이메일</label>
          <S.Input
            id="login-id"
            type="text"
            value={idOrEmail}
            onChange={(e) => setIdOrEmail(e.currentTarget.value)}
            placeholder="아이디 또는 이메일을 입력하세요"
            autoComplete="username"
            aria-invalid={!!idErr}
            aria-describedby={idErr ? "login-id-err" : undefined}
            disabled={loading}
          />
          {idErr && (
            <S.FieldError id="login-id-err" role="alert">
              {idErr}
            </S.FieldError>
          )}
        </S.Field>

        <S.Field>
          <label htmlFor="login-pw">비밀번호</label>
          <S.Input
            id="login-pw"
            type="password"
            value={pw}
            onChange={(e) => setPw(e.currentTarget.value)}
            placeholder="비밀번호를 입력하세요"
            autoComplete="current-password"
            aria-invalid={!!pwErr}
            aria-describedby={pwErr ? "login-pw-err" : undefined}
            disabled={loading}
          />
          {pwErr && (
            <S.FieldError id="login-pw-err" role="alert">
              {pwErr}
            </S.FieldError>
          )}
        </S.Field>

        <S.Actions>
          <S.Primary type="submit" disabled={loading}>
            {loading ? "로그인 중…" : "로그인"}
          </S.Primary>
        </S.Actions>

        <S.HelperRowTop>
          <span />
          <a href="#">비밀번호 찾기 ❯</a>
        </S.HelperRowTop>
        <S.HelperRowBottom>
          <span>아직 MOV의 회원이 아니신가요?</span>
          <a href="#">회원가입하기</a>
        </S.HelperRowBottom>
      </form>
    </S.Wrap>
  );
}
