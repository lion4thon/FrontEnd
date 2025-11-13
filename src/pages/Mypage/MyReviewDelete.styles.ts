import styled from "styled-components";

export const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(64, 67, 77, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  animation: fadeIn 160ms ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const ModalContent = styled.div`
  position: relative;
  width: 520px;
  padding: 60px 40px 40px 40px;
  background: #f7f8ff;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  animation: slideUp 160ms ease-out;

  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 19.293px;
  right: 19.293px;
  width: 17.414px;
  height: 17.414px;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export const CloseIcon = styled.div`
  width: 17.414px;
  height: 17.414px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/Ovo8ciovef.png")
    no-repeat center;
  background-size: cover;
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 64px;
  width: 100%;
`;

export const LogoIcon = styled.div`
  position: relative;
  width: 67.854px;
  height: 44.554px;
  flex-shrink: 0;
`;

export const Vector1 = styled.div`
  position: absolute;
  width: 2.31px;
  height: 2.31px;
  top: 0;
  left: 32.136px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/kGFBaT4d1T.png")
    no-repeat center;
  background-size: 100% 100%;
  z-index: 195;
`;

export const Vector2 = styled.div`
  position: absolute;
  width: 3.308px;
  height: 3.308px;
  top: -0.99px;
  left: 25.649px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/hakObUVpqZ.png")
    no-repeat center;
  background-size: 100% 100%;
  z-index: 194;
`;

export const Vector3 = styled.div`
  position: absolute;
  width: 5.462px;
  height: 5.462px;
  top: -0.36px;
  left: 16.938px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/v1kLKuQ0Sn.png")
    no-repeat center;
  background-size: 100% 100%;
  z-index: 196;
`;

export const ClipPathGroup = styled.div`
  position: absolute;
  width: 67.854px;
  height: 36.964px;
  top: -2.138px;
  left: 0;
  z-index: 197;
  -webkit-mask-image: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/Rdutj64wrU.png");
  -webkit-mask-size: cover;
  mask-image: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/Rdutj64wrU.png");
  mask-size: cover;
`;

export const Group = styled.div`
  position: absolute;
  width: 104.38%;
  height: 108.03%;
  top: -4.02%;
  left: -2.19%;
  z-index: 198;
`;

export const ClipPathGroupInner = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 199;
  -webkit-mask-image: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/MLHt5HJnkX.png");
  -webkit-mask-size: cover;
  mask-image: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/MLHt5HJnkX.png");
  mask-size: cover;
`;

export const GroupInner = styled.div`
  position: absolute;
  width: 100.25%;
  height: 100.32%;
  top: -0.22%;
  left: -0.14%;
  z-index: 200;
`;

export const Rectangle = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-10/9tzgPiwmmg.png")
    no-repeat center;
  background-size: 100% 100%;
  z-index: 201;
`;

export const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const Title = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 22px;
  font-weight: 600;
  line-height: 33px;
  letter-spacing: 0.22px;
  color: #1a1a1a;
  text-align: center;
  white-space: nowrap;
`;

export const ButtonSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
  gap: 8px;
`;

export const DeleteButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  padding: 10px 0;
  background: #e22b2b;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #c92525;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const CancelButton = styled.button`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 44px;
  padding: 10px 0;
  background: #e2e6ed;
  border: 0.5px solid #7d808d;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #d4d9e2;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const ButtonText = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #ffffff;
  white-space: nowrap;
`;

export const ButtonTextCancel = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 600;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #666a76;
  white-space: nowrap;
`;
