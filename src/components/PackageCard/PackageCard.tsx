import { useNavigate } from "react-router-dom";
import * as S from "./PackageCard.style";

import fitness1 from "../../assets/sample_pic2.svg";

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

const fmt = (n: number) => n.toLocaleString();

export default function PackageCard({ item, onClick }: Props) {
  const { id, title, thumbnail, tags, detail, pricePerClass } = item;

  const navigate = useNavigate();

  const badgeLabel = tags?.[0];

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    } else {
      navigate(`/package/${id}`);
    }
  };

  return (
    <S.Card onClick={handleClick} role="button" tabIndex={0}>
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
