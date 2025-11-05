import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  position: relative;
  height: 936px;
  background-color: var(--bg-white);
`;

export const Inner = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
  max-width: 1200px;
  width: 100%;
  z-index: 1;
  padding-top: 194px;
  padding-right: 150px;
  align-items: flex-start;
`;

export const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
`;

export const Title = styled.h1`
  margin: 0;
  color: var(--black);
  font-family: var(--h1-font-family);
  font-size: var(--h1-font-size);
  font-weight: var(--h1-font-weight);
  line-height: var(--h1-line-height);
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
  font-size: var(--caption-font-size);
  font-weight: var(--caption-font-weight);
  line-height: var(--caption-line-height);
  margin-top: -8px; /* pull copy slightly upward */
`;

export const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 24px;
  padding: 24px 40px;
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
  font-size: 18px;
  font-weight: 700;
`;

export const VectorIcon = styled.img`
  width: 13px;
  height: 22px;
`;

export const RightVisual = styled.div`
  position: absolute;
  right: 0;
  top: 0px;
  height: 846px;
  display: flex;
  align-items: center;
  pointer-events: none;

  img {
    height: 100%;
    width: auto;
    filter: drop-shadow(var(--drop-shadow));
    user-select: none;
  }

  @media (max-width: 1024px) {
    display: none;
  }
`;
