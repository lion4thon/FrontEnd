import styled from "styled-components";

export const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  min-height: 0;
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #9a9eac;
    border-radius: 20px;
    
    &:hover {
      background: #7d808d;
    }
  }
  
  /* Firefox 스크롤바 스타일 */
  scrollbar-width: thin;
  scrollbar-color: #9a9eac transparent;
`;

export const ReviewCard = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  background: #f3f7ff;
  border-top: 0.5px solid #c1c5d0;
  
  &:first-child {
    border-top: none;
  }
`;

export const ReviewContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  width: 100%;
  min-width: 0;
`;

export const UserAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  flex-shrink: 0;
`;

export const ReviewInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
  min-width: 0;
`;

export const ReviewHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
`;

export const UserName = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 500;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #1a1a1a;
  white-space: nowrap;
`;

export const ReviewActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const DeleteButton = styled.button`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  white-space: nowrap;
  transition: color 0.2s ease;

  &:hover {
    color: #1a1a1a;
  }
`;

export const ReviewDate = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
  white-space: nowrap;
`;

export const ReviewBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  flex: 1;
  min-width: 0;
`;

export const ReviewText = styled.div`
  font-family: Pretendard, var(--default-font-family);
  font-size: 18px;
  font-weight: 400;
  line-height: 27px;
  letter-spacing: 0.18px;
  color: #2c2e35;
  white-space: pre-wrap;
  word-break: break-word;
  width: 100%;
  min-height: 54px;
`;

export const HelpfulSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 4px;
`;

export const HelpfulText = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  color: #7d808d;
  white-space: nowrap;
`;

export const HelpfulButton = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px 12px;
  border: 0.5px solid #c1c5d0;
  border-radius: 20px;
  background: transparent;
`;

export const ThumbsUpIcon = styled.div`
  width: 16px;
  height: 16px;
  background: url("https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/Z8Kt179WyJ.png")
    no-repeat center;
  background-size: cover;
  flex-shrink: 0;
`;

export const HelpfulCount = styled.span`
  font-family: Pretendard, var(--default-font-family);
  font-size: 14px;
  font-weight: 500;
  line-height: 21px;
  letter-spacing: -0.28px;
  color: #2c2e35;
  white-space: nowrap;
`;

