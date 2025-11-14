import styled from "styled-components";

export const Wrap = styled.div`
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

export const TopBar = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
`;

export const CloseBtn = styled.button`
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;

export const LogoArea = styled.div`
  display: flex;
  justify-content: center;
`;

export const LogoImg = styled.img`
  height: auto;
  margin: 0 0 23px;
`;

export const ErrorBanner = styled.div`
  background: #fee4e2;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid #fecdca;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  margin-bottom: 8px;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 16px;

  label {
    font-size: 18px;
    color: ${({ theme }) => theme.colors.gray700};
    padding-left: 5px;
  }
`;

export const FieldError = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: 12px;
  margin-top: 4px;
`;

export const Input = styled.input`
  width: 360px;
  height: 47px;
  padding: 0 14px;
  border: 1px solid ${({ theme }) => theme.colors.gray500};
  border-radius: 20px;
  outline: none;
  font-size: 15px;
  background: ${({ theme }) => theme.colors.gray100};

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px 0;
`;

export const Primary = styled.button`
  height: 47px;
  min-width: 360px;
  border: none;
  border-radius: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
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

export const HelperRowTop = styled.div`
  width: 360px;
  margin: 8px auto 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  a {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.gray800};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    gap: 4px;
  }
`;

export const HelperRowBottom = styled.div`
  width: 360px;
  margin: 12px auto 0;
  display: flex;
  justify-content: center;
  gap: 24px;
  align-items: center;
  color: ${({ theme }) => theme.colors.gray800};
  font-size: 14px;
  font-weight: 500;

  a {
    font-size: 14px;
    font-weight: 500;
    color: ${({ theme }) => theme.colors.gray800};
  }
`;
