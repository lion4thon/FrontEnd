import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: nowrap;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
  background: rgba(243, 247, 255, 1);
  border-radius: 10px;
  box-shadow: var(--drop-shadow);
  overflow: hidden;
  box-sizing: border-box;
  gap: 20px;
`;

export const Frame2 = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 0;
  gap: 16px;
  position: relative;
`;

export const Frame1 = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 20px;
  position: relative;
  width: 329px;
  height: 55px;
  padding: 15px 100px;
  background: var(--primary-04);
  border: 1px solid;
  border-color: var(--primary-01);
  z-index: 11;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: var(--primary-03);
    border-color: var(--primary-02);
  }
`;

export const SurveyProgress = styled.span`
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 27px;
  color: var(--black);
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: var(--body-letter-spacing);
  z-index: 12;
`;

export const Symbol = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 67.854px;
  height: 44.554px;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const AIIcon = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

export const SimpleSurvey = styled.div`
  flex-shrink: 0;
  position: relative;
  width: 376px;
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: 27px;
  text-align: left;
  text-overflow: initial;
  white-space: normal;
  letter-spacing: var(--body-letter-spacing);
  z-index: 10;
`;

export const SimpleSurveyText = styled.span`
  position: relative;
  color: #2c2e35;
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: 27px;
  text-align: left;
  letter-spacing: var(--body-letter-spacing);
`;

export const PerfectFitExercise = styled.span`
  position: relative;
  color: #2c2e35;
  font-family: var(--body-BD-font-family);
  font-size: var(--body-BD-font-size);
  font-weight: var(--body-BD-font-weight);
  line-height: 27px;
  text-align: left;
  letter-spacing: var(--body-BD-letter-spacing);
`;

export const MovRecommendation = styled.span`
  position: relative;
  color: #2c2e35;
  font-family: var(--body-font-family);
  font-size: var(--body-font-size);
  font-weight: var(--body-font-weight);
  line-height: 27px;
  text-align: left;
  letter-spacing: var(--body-letter-spacing);
`;

