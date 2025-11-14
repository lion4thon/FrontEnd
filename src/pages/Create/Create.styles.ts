import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: 100%;
  padding: 40px 120px;
  padding-top: calc(90px + 40px);
  min-height: calc(100vh - 90px);
  box-sizing: border-box;
`;

export const CreateButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  height: 72px;
  min-height: 72px;
  padding: 12px 80px;
  background: #4367ff;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover {
    background: #3555e6;
    filter: brightness(0.95);
  }

  &:active {
    filter: brightness(0.9);
  }
`;

export const CreateButtonText = styled.span`
  font-family: "Pretendard", sans-serif;
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  text-align: center;
  white-space: nowrap;
  letter-spacing: 0.52px;
  color: #ffffff;
`;

