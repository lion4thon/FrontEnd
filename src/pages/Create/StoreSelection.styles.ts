import styled from "styled-components";

export const Frame = styled.div`
  align-items: flex-start;
  background-color: var(--bg-white);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 20px;
  box-shadow: var(--drop-shadow);
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  position: relative;
`;

export const Div = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const TextWrapper2 = styled.div`
  color: var(--black);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

export const Element = styled.p`
  color: transparent;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -1px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

export const Span = styled.span`
  color: #1a1a1a;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
`;

export const TextWrapper3 = styled.span`
  color: #666a76;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
`;

export const Div2 = styled.div`
  align-items: flex-start;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  flex-direction: column;
  gap: 16px;
  position: relative;
  width: 100%;
`;

export const SportButton = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--gray-100);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 24px 32px;
  position: relative;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--gray-200);
  }
`;

export const TextWrapper4 = styled.div`
  color: var(--gray-500);
  flex: 1;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -0.5px;
  position: relative;
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  position: relative;

  img {
    width: 18px;
    height: 10px;
    object-fit: contain;
  }
`;

export const PriceDiv = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--gray-100);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 24px 32px;
  position: relative;
  width: 100%;
`;

export const TextWrapper5 = styled.div`
  color: var(--gray-500);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  margin-top: -0.5px;
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;
