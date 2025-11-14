import styled from "styled-components";

export const Wrap = styled.div`
  position: relative;
  width: 100%;
  max-width: 1200px;
  margin: 8px auto 40px;
  padding-bottom: 32px;
  box-sizing: border-box;

  /* border-bottom 전체 폭으로*/
  &::after {
    content: "";
    position: absolute;
    left: 50%;
    bottom: 0;
    width: 100vw;
    height: 0.5px;
    background: #8896ff;
    transform: translateX(-50%);
  }
`;

export const Clipper = styled.div`
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw); /* 컨테이너 밖으로 탈출 */
  margin-right: calc(50% - 50vw);
  box-sizing: border-box;
  overflow: visible;
  padding: 0 5px;
`;

/* 실제 가로 스크롤 담당 */
export const Scroller = styled.div`
  overflow-x: auto;
  overflow-y: visible;
  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
  padding: 28px 20px 32px; /* 위/아래 섀도우 여유 */
  box-sizing: border-box;
`;

export const Rail = styled.div`
  display: flex;
  gap: 20px;
  box-sizing: border-box;
  padding: 6px 0 10px;
  scroll-snap-type: x mandatory;
  scroll-padding: 32px;
`;

export const Item = styled.div`
  flex: 0 0 auto;
  width: 240px;
  scroll-snap-align: start;
`;

export const NavBtn = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: 1px solid rgba(0, 0, 0, 0.08);
  background: #fff;
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  z-index: 6;
  transition: opacity 0.2s ease, transform 0.1s ease;
  display: flex;
  align-items: center;
  justify-content: center;

  &[data-disabled="true"] {
    opacity: 0.35;
    pointer-events: none;
  }
  &:active {
    transform: translateY(-50%) scale(0.98);
  }
`;

export const PrevBtn = styled(NavBtn)`
  /* left: 12px; */
  left: -183px;
`;

export const NextBtn = styled(NavBtn)`
  /* right: 12px; */
  right: -183px;
`;
