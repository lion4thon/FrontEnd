import styled from "styled-components";

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 32px;
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px;
  background: rgba(243, 247, 255, 1);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 20px;
  box-shadow: var(--drop-shadow);
  overflow: hidden;
  box-sizing: border-box;
`;

export const PackageProfileSetting = styled.span`
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 27px;
  color: var(--black);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: var(--body-MD-font-weight);
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: var(--body-MD-letter-spacing);
`;

export const Frame1 = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 16px;
  position: relative;
  width: 100%;
  z-index: 1;
`;

export const Frame2 = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 10px;
  position: relative;
  padding: 24px 32px;
  background: var(--gray-200);
  border: 1px solid;
  border-color: var(--primary-04);
  z-index: 2;
  border-radius: 28px;
  width: 100%;
  box-sizing: border-box;
`;

export const PackageNameInput = styled.input`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  height: 27px;
  background: transparent;
  border: none;
  color: var(--gray-500);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: var(--body-MD-font-weight);
  line-height: 27px;
  text-align: left;
  white-space: nowrap;
  letter-spacing: var(--body-MD-letter-spacing);
  z-index: 3;
  outline: none;
  width: 100%;

  &::placeholder {
    color: var(--gray-500);
  }

  &:focus {
    color: var(--black);
  }
`;

export const Frame3 = styled.div`
  display: flex;
  align-items: center;
  align-self: stretch;
  flex-wrap: nowrap;
  flex-shrink: 0;
  gap: 10px;
  position: relative;
  padding: 24px 32px;
  background: var(--gray-200);
  border: 1px solid;
  border-color: var(--primary-04);
  z-index: 4;
  border-radius: 28px;
  width: 100%;
  box-sizing: border-box;
`;

export const PackageDescriptionTextarea = styled.textarea`
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: auto;
  position: relative;
  min-height: 27px;
  background: transparent;
  border: none;
  color: var(--gray-500);
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-weight: var(--body-MD-font-weight);
  line-height: 27px;
  text-align: left;
  letter-spacing: var(--body-MD-letter-spacing);
  z-index: 5;
  outline: none;
  width: 100%;
  resize: vertical;
  box-sizing: border-box;

  &::placeholder {
    color: var(--gray-500);
  }

  &:focus {
    color: var(--black);
  }
`;
