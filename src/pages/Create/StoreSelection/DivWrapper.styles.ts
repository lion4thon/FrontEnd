import styled from "styled-components";

export const SearchInput = styled.div`
  align-items: center;
  align-self: stretch;
  background-color: var(--bg-white);
  border: 0.5px solid;
  border-color: var(--gray-300);
  border-radius: 28px;
  display: flex;
  flex: 0 0 auto;
  gap: 10px;
  padding: 16px 16px;
  position: relative;
  width: 100%;

  &.view {
    border: 0.5px solid !important;
    left: unset !important;
    top: unset !important;
  }
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;

  img {
    width: 46px;
    height: 46px;
    object-fit: contain;
  }
`;

export const Input = styled.input`
  background: transparent;
  border: none;
  color: var(--black);
  flex: 1;
  font-family: var(--body-MD-font-family);
  font-size: var(--body-MD-font-size);
  font-style: var(--body-MD-font-style);
  font-weight: var(--body-MD-font-weight);
  letter-spacing: var(--body-MD-letter-spacing);
  line-height: var(--body-MD-line-height);
  outline: none;
  position: relative;

  &::placeholder {
    color: var(--gray-400);
  }
`;

