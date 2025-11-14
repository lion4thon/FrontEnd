/**
 * PayModal styles
 */

import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(10, 13, 30, 0.4);
`;

export const Container = styled.div`
  width: 480px;
  max-width: calc(100% - 48px);
  border-radius: 24px;
  background: ${({ theme }) => theme.colors.white};
  box-shadow: 0 20px 40px rgba(10, 15, 45, 0.18);
  text-align: center;
  display: flex;
flex-direction: column;
justify-content: center;
`;

export const Title = styled.h2`
    margin: 120px 0 0;

  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.gray800};
`;

export const Description = styled.p`
  font-size: 14px;
  line-height: 1.5;
  color: ${({ theme }) => theme.colors.gray500};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export const PayButton = styled.button`
  width: 100%;
  max-width: 360px;
  height: 56px;
  border: none;
  border-radius: 999px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.white};
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  margin: 72px auto 40px;

  &:disabled {
    opacity: 0.6;
    cursor: default;
  }
`;