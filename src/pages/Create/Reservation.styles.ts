import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 10px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  height: 72px;
  min-height: 72px;
  margin: 0 auto;
  padding: 12px 80px;
  background: var(--gray-200);
  border-radius: 20px;
  overflow: hidden;
  box-sizing: border-box;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--gray-300);
  }
`;

export const Login = styled.span`
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 36px;
  color: #666a76;
  font-family: var(--h3-font-family);
  font-size: var(--h3-font-size);
  font-weight: var(--h3-font-weight);
  line-height: 36px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: var(--h3-letter-spacing);
`;
