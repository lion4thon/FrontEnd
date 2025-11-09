import styled from "styled-components";

export const Container = styled.main`
  width: 100%;
  min-height: 100vh;
  background: #f7f8ff;
  padding-top: 90px;
`;

export const Content = styled.div`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  padding: 88px 120px;
  box-sizing: border-box;
`;

export const HeaderSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  padding-bottom: 32px;
`;

export const Title = styled.h1`
  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36.4px;
  letter-spacing: 0.52px;
  color: #1a1a1a;
  margin: 0;
`;

export const SectionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  margin-bottom: 64px;
`;

export const Section = styled.div<{ $first?: boolean; $last?: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 24px;
  width: 100%;
  padding: 32px 40px;
  background: #f3f7ff;
  border: ${({ $first, $last }) => {
    if ($first) return "none";
    if ($last) return "1px solid #c1c5d0";
    return "0.5px solid #7d808d";
  }};
  border-radius: 20px;
  opacity: ${({ $last }) => ($last ? 0.88 : 1)};
`;

export const SectionNumberWrapper = styled.div`
  position: relative;
  width: 32px;
  height: 32px;
  flex-shrink: 0;
  padding: 6px 15px;
  overflow: hidden;
`;

export const SectionNumberBg = styled.div<{ $bgImage: string }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 32px;
  height: 32px;
  background: url(${({ $bgImage }) => $bgImage}) no-repeat center;
  background-size: cover;
  border-radius: 50%;
  z-index: 1;
`;

export const SectionNumberText = styled.div`
  position: absolute;
  top: 2px;
  left: 11px;
  color: #ffffff;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  z-index: 2;
`;

export const SectionContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  flex: 1;
  min-width: 0;
`;

export const QuestionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Question = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
`;

export const Subtitle = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
`;

export const ButtonGroup = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
`;

export const OptionButton = styled.button<{
  selected?: boolean;
  disabled?: boolean;
}>`
  padding: 12px 24px;
  border-radius: 20px;
  border: 1px solid ${({ selected }) => (selected ? "#4367ff" : "#9a9eac")};
  background: ${({ selected }) => (selected ? "#f7f8ff" : "#eef1f8")};
  color: ${({ selected }) => (selected ? "#4367ff" : "#666a76")};
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: ${({ selected }) => (selected ? 600 : 500)};
  line-height: 27px;
  letter-spacing: 0.18px;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  white-space: nowrap;
  transition: all 0.2s ease;
  box-sizing: border-box;

  &:hover:not(:disabled) {
    border-color: ${({ selected }) => (selected ? "#4367ff" : "#7d808d")};
    background: ${({ selected }) => (selected ? "#f7f8ff" : "#e8ebf0")};
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }

  &:focus {
    outline: none;
  }
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 24px 32px 24px 24px;
  background: #eef1f8;
  border: 1px solid #9a9eac;
  border-radius: 28px;
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  box-sizing: border-box;

  &::placeholder {
    color: #7d808d;
  }

  &:focus {
    outline: none;
    border-color: #4367ff;
    background: #f7f8ff;
  }
`;

export const SubmitButtonContainer = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  width: 100%;
  gap: 32px;
`;

export const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 140px;
  padding: 12px 24px;
  background: #4367ff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  font-family: Pretendard, var(--default-font-family);
  font-size: 26px;
  font-weight: 500;
  line-height: 36px;
  letter-spacing: 0.52px;
  color: #ffffff;
  white-space: nowrap;

  &:hover {
    background: #3655e6;
  }

  &:active {
    transform: scale(0.98);
  }
`;
