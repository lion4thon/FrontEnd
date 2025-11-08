import { useState } from "react";
import styled from "styled-components";
import LogoModal from "../../assets/MOV_modal.svg";

type Props = {
  onClose: () => void;
  onSuccess?: () => void;
};

export default function LoginModalBody({ onClose, onSuccess }: Props) {
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [emailErr, setEmailErr] = useState<string | null>(null);
  const [pwErr, setPwErr] = useState<string | null>(null);

  const isValidEmail = (v: string) => /\S+@\S+\.\S+/.test(v);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr(null);
    setEmailErr(null);
    setPwErr(null);
    const te = email.trim(),
      tp = pw.trim();
    let bad = false;
    if (!te) {
      setEmailErr("이메일을 입력해주세요.");
      bad = true;
    } else if (!isValidEmail(te)) {
      setEmailErr("이메일 형식이 올바르지 않습니다.");
      bad = true;
    }
    if (!tp) {
      setPwErr("비밀번호를 입력해주세요.");
      bad = true;
    }
    if (bad) return;

    setLoading(true);
    try {
      await new Promise((r) => setTimeout(r, 600)); // API 대기 시뮬
      onSuccess?.();
      onClose();
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
        <CloseBtn onClick={onClose} aria-label="닫기" disabled={loading}>
          ✕
        </CloseBtn>
      </TopBar>

      <LogoArea>
        <LogoImg src={LogoModal} alt="MOV 로고" />
      </LogoArea>

      <form onSubmit={submit} noValidate>
        {err && <ErrorBanner role="alert">{err}</ErrorBanner>}

        <Field>
          <label htmlFor="login-email">이메일</label>
          <Input
            id="login-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
            placeholder="이메일을 입력하세요"
            autoComplete="email"
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
}

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
    opacity: 0.6;
    cursor: default;
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
  a {
    font-size: 14px;
    font-weight: 500;
    color: #2c2f36;
  }
`;
