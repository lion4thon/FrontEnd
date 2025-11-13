import styled from "styled-components";

export const Wrap = styled.div`
  text-align: center;
  padding: 8px 4px 16px;
  gap: 64px;
  display: flex;
  flex-direction: column;
  position: relative;

  h3 {
    margin-bottom: 64px;
    font-size: 18px;
    line-height: 1.6;
    color: ${({ theme }) => theme.colors.black};
    font-weight: 500;
  }
`;
export const Logo = styled.img`
  width: 440px;
  height: 97px;
  margin: 0 auto;
  display: block;
`;
export const PrimaryBtn = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 20px;
  font-weight: 600;
  background: ${({ theme }) => theme.colors.primary};
  color: #fff;
  border: 0;
  cursor: pointer;
  display: flex;
justify-content: center;
align-items: center;
font-size: 18px;
`;

export const Close = styled.img`
  width: 16px;
  height: 16px;
  position: absolute;
right: 18px;
`;

export const Backdrop = styled.div``;