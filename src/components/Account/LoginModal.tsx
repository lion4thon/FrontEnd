import { useState } from "react";
import styled from "styled-components";
import LogoModal from "../../assets/MOV_modal.svg";

/** 모달 레지스트리에서 주입되는 프롭스 타입 */
interface LoginModalProps {
  __close: () => void;
  onSuccess?: () => void;
}

/** 이메일 유효성 (로컬 검증용) */
const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

export const LoginModal: React.FC<LoginModalProps> = ({
  __close,
  onSuccess,
}) => {
  const [email, setEmail] = useState<string>("");
  const [pw, setPw] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  /** 필드별 에러 메시지 */
  const [err, setErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErr(null);
    setEmailErr(null);
    setPwErr(null);

    const trimmedEmail = email.trim();
    const trimmedPw = pw.trim();

    let hasError = false;
    if (!trimmedEmail) {
      setEmailErr("이메일을 입력해주세요.");
      hasError = true;
    } else if (!isValidEmail(trimmedEmail)) {
      setEmailErr("이메일 형식이 올바르지 않습니다.");
      hasError = true;
    }
    if (!trimmedPw) {
      setPwErr("비밀번호를 입력해주세요.");
      hasError = true;
    }
    if (hasError) return;

    setLoading(true);
    try {
      // 로그인 API 연결 해야됨*****
      await new Promise((r) => setTimeout(r, 600));
      onSuccess?.();
      __close();
    } catch {
      setErr("이메일 또는 비밀번호가 올바르지 않습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrap>
      <TopBar>
        <span aria-hidden="true" />
        <CloseBtn aria-label="닫기" onClick={__close} disabled={loading}>
          ✕
        </CloseBtn>
      </TopBar>

      <LogoArea>
        <LogoImg src={LogoModal} alt="MOV 로고" />
      </LogoArea>

      <form onSubmit={submit} aria-labelledby="LoginModal-title" noValidate>
        {err && <ErrorBanner role="alert">{err}</ErrorBanner>}

        <Field>
          <label htmlFor="login-email">이메일</label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="이메일을 입력하세요"
            autoFocus
            autoComplete="email"
            inputMode="email"
            aria-invalid={!!emailErr}
            aria-describedby={emailErr ? "login-email-err" : undefined}
            disabled={loading}
          />
          {emailErr && (
            <FieldError id="login-email-err" role="alert">
              {emailErr}
            </FieldError>
          )}
        </Field>

        <Field>
          <label htmlFor="login-pw">비밀번호</label>
          <Input
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
            <FieldError id="login-pw-err" role="alert">
              {pwErr}
            </FieldError>
          )}
        </Field>

        <Actions>
          <Primary type="submit" disabled={loading}>
            {loading ? "로그인 중…" : "로그인"}
          </Primary>
        </Actions>

        {/* <HelperRow>
          <a href="#">비밀번호 찾기</a>
          <a href="#">회원가입하기</a>
        </HelperRow> */}

        <HelperRowTop>
          <span />
          <a href="#">비밀번호 찾기 ❯</a>
        </HelperRowTop>

        <HelperRowBottom>
          <span>아직 MOV의 회원이 아니신가요?</span>
          <a href="#">회원가입하기</a>
        </HelperRowBottom>
      </form>
    </Wrap>
  );
};

// 스타일
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    cursor: default;
    opacity: 0.6;
  }
`;

const LogoArea = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoImg = styled.img`
  height: auto;
  margin: 0 0 23px;
`;

const ErrorBanner = styled.div`
  background: #fee4e2;
  color: #b42318;
  border: 1px solid #fecdca;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 8px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    font-size: 18px;
    color: #374151;
    padding-left: 5px;
  }
`;

const FieldError = styled.div`
  color: #d92d20;
  font-size: 12px;
  margin-top: 4px;
`;

const Input = styled.input`
  width: 360px;
  height: 47px;
  padding: 0 14px;
  border: 1px solid #7d818e;
  border-radius: 20px;
  outline: none;
  font-size: 15px;
  background: #eef1f9;

  &:focus {
    border-color: #5b7cff;
  }

  &::placeholder {
    color: #9aa3af;
  }
`;

const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

const Primary = styled.button`
  height: 47px;
  min-width: 360px;
  border: none;
  border-radius: 20px;
  background: #4368ff;
  color: #fff;
  font-weight: 600;
  cursor: pointer;
  text-align: center;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
  &:not(:disabled):hover {
    filter: brightness(0.98);
  }
`;

// const HelperRow = styled.div`
//   display: flex;
//   justify-content: space-between;
//   margin-top: 8px;

//   a {
//     font-size: 14px;
//     color: #5b7cff;
//     text-decoration: none;
//   }
// `;

const HelperRowTop = styled.div`
  width: 360px;
  margin: 8px auto 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 14px;
    color: #2c2f36;
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }

  a::after {
    content: "";
  }
`;

const HelperRowBottom = styled.div`
  width: 360px;
  margin: 12px auto 0;
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: center;
  color: #2c2f36;
  font-size: 14px;
  font-weight: 500;

  span {
    font-size: 14px;
    font-weight: 500;
  }

  a {
    font-size: 14px;
    font-weight: 500;
    color: #2c2f36;
  }
`;
