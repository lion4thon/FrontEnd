import styled from "styled-components";

/* 검색창 전체 감싸는 form */
export const Container = styled.form`
  position: relative;
  width: 100%;
  height: 72px;
  border-radius: 999px;
  border: 1px solid transparent;

  background: linear-gradient(
        ${({ theme }) => theme.colors.white},
        ${({ theme }) => theme.colors.white}
      )
      padding-box,
    ${({ theme }) => theme.colors.borderAccent} border-box;

  box-shadow: inset 0 1px 4px rgba(0, 0, 0, 0.04);
`;

/* 입력창 */
export const Input = styled.input`
  width: 100%;
  height: 100%;
  padding: 0 72px 0 33px;
  border: none;
  outline: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.gray100};
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
  box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.12);

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray400};
  }
`;

/* 버튼 */
export const Button = styled.button`
  position: absolute;
  top: 50%;
  right: 8px;
  transform: translateY(-50%);
  width: 52px;
  height: 52px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.9;
  }
`;
