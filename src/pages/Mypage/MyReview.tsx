import * as S from "./MyReview.styles";
import type { Review } from "./Mypage.types";

interface MyReviewProps {
  reviews: Review[];
  onDelete?: (reviewId: number) => void;
}

export default function MyReview({ reviews, onDelete }: MyReviewProps) {
  const handleDelete = (reviewId: number) => {
    if (onDelete) {
      onDelete(reviewId);
    } else {
      // TODO: API 호출로 리뷰 삭제
      console.log("리뷰 삭제:", reviewId);
    }
  };

  return (
    <S.ReviewList>
      {reviews.map((review) => (
        <S.ReviewCard key={review.id}>
          <S.ReviewContent>
            <S.UserAvatar src={review.userAvatar} alt={review.userName} />
            <S.ReviewInfo>
              <S.ReviewHeader>
                <S.UserName>{review.userName}</S.UserName>
                <S.ReviewActions>
                  <S.DeleteButton onClick={() => handleDelete(review.id)}>
                    삭제
                  </S.DeleteButton>
                  <S.ReviewDate>{review.date}</S.ReviewDate>
                </S.ReviewActions>
              </S.ReviewHeader>
              <S.ReviewBody>
                <S.ReviewText>{review.content}</S.ReviewText>
                <S.HelpfulSection>
                  <S.HelpfulText>도움이 됐어요</S.HelpfulText>
                  <S.HelpfulButton>
                    <S.ThumbsUpIcon />
                    <S.HelpfulCount>{review.helpfulCount}</S.HelpfulCount>
                  </S.HelpfulButton>
                </S.HelpfulSection>
              </S.ReviewBody>
            </S.ReviewInfo>
          </S.ReviewContent>
        </S.ReviewCard>
      ))}
    </S.ReviewList>
  );
}

