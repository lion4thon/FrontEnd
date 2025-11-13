import styled from "styled-components";

export const Frame = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const FrameWrapper = styled.div`
  align-items: center;
  align-self: stretch;
  display: flex;
  flex: 0 0 auto;
  gap: 16px;
  justify-content: center;
  position: relative;
  width: 100%;
`;

export const DivWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex: 1;
  flex-grow: 1;
  gap: 10px;
  position: relative;
`;

export const TextWrapper = styled.p`
  color: var(--black);
  font-family: var(--h3-font-family);
  font-size: var(--h3-font-size);
  font-style: var(--h3-font-style);
  font-weight: var(--h3-font-weight);
  letter-spacing: var(--h3-letter-spacing);
  line-height: var(--h3-line-height);
  margin-top: -1px;
  position: relative;
  width: fit-content;
`;

export const Div = styled.p`
  color: var(--gray-500);
  font-family: var(--caption-font-family);
  font-size: var(--caption-font-size);
  font-style: var(--caption-font-style);
  font-weight: var(--caption-font-weight);
  letter-spacing: var(--caption-letter-spacing);
  line-height: var(--caption-line-height);
  position: relative;
  white-space: nowrap;
  width: fit-content;
`;

