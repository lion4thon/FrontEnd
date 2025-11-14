import styled, { css } from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;
  padding: 8px 0 16px;
`;

export const Group = styled.div`
  position: relative;
`;

const pillBase = css`
  height: 44px;
  padding: 0 14px;
  border-radius: 999px;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-weight: 700;
  cursor: pointer;
  user-select: none;
`;

// export const Toggle = styled.div<{ $selected?: boolean }>`
//   ${pillBase};
//   color: ${({ theme, $selected }) =>
//     $selected ? theme.colors.primary : theme.colors.black};
//   background: ${({ theme, $selected }) =>
//     $selected ? "#DFE5FF" : theme.colors.gray100};
//   border: 1px solid
//     ${({ theme, $selected }) =>
//       $selected ? theme.colors.primary : theme.colors.gray300};
//   box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.04);
//   outline: none;

//   &:focus-visible {
//     outline: none;
//   }

//   &:hover {
//     border-color: ${({ theme, $selected }) =>
//       $selected ? theme.colors.primary : theme.colors.gray400};
//   }
// `;

export const Toggle = styled.div<{ $selected?: boolean }>`
  ${pillBase};
  color: ${({ theme, $selected }) =>
    $selected ? theme.colors.primary : theme.colors.black};
  background: ${({ theme, $selected }) =>
    $selected ? "#DFE5FF" : theme.colors.gray100};
  border: 1px solid
    ${({ theme, $selected }) =>
      $selected ? theme.colors.primary : theme.colors.gray300};
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.04);
  outline: none;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

export const GradientToggle = styled.button`
  ${pillBase};
  position: relative;
  border: 2px solid transparent;
  background: linear-gradient(#ffffff, #ffffff) padding-box,
    linear-gradient(
        90deg,
        #4ce5a7 0%,
        #81dece 25%,
        #c5d6ff 50%,
        #8896ff 75%,
        #476afc 100%
      )
      border-box;
  color: ${({ theme }) => theme.colors.primary};
  box-shadow: inset 0 1px 0 rgba(0, 0, 0, 0.04);
  outline: none;
`;

/* 드롭다운 */
export const Menu = styled.div`
  position: absolute;
  top: calc(100% + 8px); /* 토글 아래로 8px */
  left: 50%;
  transform: translateX(-50%);
  min-width: 142px;
  background: ${({ theme }) => theme.colors.gray50};
  border: 1px solid ${({ theme }) => theme.colors.gray200};
  border-radius: 28px;
  z-index: 20;
  padding: 8px;
  text-align: center;
`;

export const Option = styled.button<{ $active?: boolean }>`
  display: block;
  width: 90px;
  text-align: center;
  padding: 10px 20px;
  border: 0;
  cursor: pointer;
  background: ${({ theme }) => theme.colors.gray50};
  color: ${({ theme }) => theme.colors.black};
  font-weight: 400;
  border-radius: 20px;
  transition: all 0.18s ease;
  outline: none;

  &:focus {
    outline: none;
  }

  &:hover {
    border: 1px solid transparent;
    background: linear-gradient(#dfe5ff, #dfe5ff) padding-box,
      linear-gradient(
          90deg,
          #4ce5a7 0%,
          #81dece 25%,
          #c5d6ff 50%,
          #8896ff 75%,
          #476afc 100%
        )
        border-box;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

export const LeftIcon = styled.img`
  width: 18px;
  height: 18px;
`;

export const RightIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-left: auto;
  opacity: 0.85;
`;
