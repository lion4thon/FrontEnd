import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  position: relative;
  min-height: calc(100vh - 90px);
  padding: 0;
  padding-left: 120px;
  background-color: var(--bg-white);
  width: 100%;
  padding-top: 260.5px;

  @media (max-width: 1440px) {
    padding-top: 200px;
    padding-left: 100px;
  }

  @media (max-width: 1024px) {
    padding-top: 120px;
    padding-left: 80px;
  }

  @media (max-width: 768px) {
    padding-top: 80px;
    padding-left: 24px;
  }
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  width: auto;
  z-index: 1;
  padding: 80px 0 80px 0;
  align-items: flex-start;
  position: relative;

  @media (max-width: 1440px) {
    padding: 60px 0 60px 0;
  }

  @media (max-width: 1024px) {
    padding: 40px 0 40px 0;
    gap: 32px;
  }

  @media (max-width: 768px) {
    padding: 40px 0;
    gap: 24px;
    width: 100%;
  }
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
  width: 100%;

  @media (max-width: 1024px) {
    max-width: 700px;
    gap: 20px;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    gap: 16px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--black);
  font-family: var(--h1-font-family);
  font-size: 80px;
  font-weight: var(--h1-font-weight);
  line-height: var(--h1-line-height);
  word-break: keep-all;
  
  span {
    white-space: nowrap;
    display: inline-block;
  }
`;

export const GradientText = styled.span`
  display: inline-block;
  background: linear-gradient(
    275deg,
    rgba(71, 106, 252, 1) 0%,
    rgba(136, 150, 255, 1) 42%,
    rgba(197, 214, 255, 1) 71%,
    rgba(129, 222, 206, 1) 93%,
    rgba(76, 229, 167, 1) 100%
  );
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
`;

export const Description = styled.p`
  color: var(--gray-400);
  font-family: var(--caption-font-family);
  font-size: 18px;
  font-weight: var(--caption-font-weight);
  line-height: var(--caption-line-height);
  margin-top: -8px; /* pull copy slightly upward */
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 28px 48px;
  width: fit-content;
  background: linear-gradient(
    275deg,
    rgba(71, 106, 252, 1) 0%,
    rgba(136, 150, 255, 1) 42%,
    rgba(197, 214, 255, 1) 71%,
    rgba(129, 222, 206, 1) 93%,
    rgba(76, 229, 167, 1) 100%
  );
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const ButtonText = styled.span`
  color: #ffffff;
  font-family: "Pretendard-Bold", Helvetica;
  font-size: 22px;
  font-weight: 700;
`;

export const VectorIcon = styled.img`
  width: 13px;
  height: 22px;
`;

export const RightVisual = styled.div`
  position: fixed;
  right: 0;
  top: 90px;
  height: calc(100vh - 90px);
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  pointer-events: none;
  z-index: 0;
  width: 50%;

  img {
    height: 100%;
    width: auto;
    max-width: 100%;
    object-fit: cover;
    object-position: top right;
    filter: drop-shadow(var(--drop-shadow));
    user-select: none;
  }

  @media (max-width: 1440px) {
    width: 45%;
  }

  @media (max-width: 1280px) {
    width: 40%;
  }

  @media (max-width: 1024px) {
    width: 35%;

    img {
      object-fit: contain;
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;
