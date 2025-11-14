import * as S from "./PackageCard.style";

import fitness1 from "../../assets/sample_pic2.svg";

/* 타입 선언 */
type PackageItem = {
  id: number;
  title: string;
  thumbnail: string;
  tags: string[];
  detail: string;
  pricePerClass: number;
  totalSessions: number;
};

interface Props {
  item: PackageItem;
  onClick?: (id: number) => void;
}

/* 가격 포맷 */
const fmt = (n: number) => n.toLocaleString();

/* 컴포넌트 */
export default function PackageCard({ item, onClick }: Props) {
  const { id, title, thumbnail, tags, detail, pricePerClass } = item;

  // 라벨은 없으면 첫 번째 태그를 임시로 사용 (원하면 label 필드로 바꿔도 됨)
  const badgeLabel = tags?.[0];

  return (
    <S.Card onClick={() => onClick?.(id)} role="button" tabIndex={0}>
      <S.ThumbWrap>
        <S.Thumb
          src={
            !thumbnail || thumbnail === "/default-thumbnail.png"
              ? fitness1
              : thumbnail
          }
          alt={title}
        />
        {badgeLabel && <S.Badge>{badgeLabel}</S.Badge>}
      </S.ThumbWrap>

      <S.Info>
        <S.Title>{title}</S.Title>

        <S.Tags>
          {tags.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </S.Tags>

        <S.Meta>
          <span>{detail}</span>
        </S.Meta>

        <S.PriceRow>
          <span>1일 초단기 패스</span>
          <S.Dot>·</S.Dot>
          <span>{fmt(pricePerClass)}원</span>
        </S.PriceRow>
      </S.Info>
    </S.Card>
  );
}
