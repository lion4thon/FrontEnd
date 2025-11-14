import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import * as S from "./PackageDetail.style";

import { fetchPassDetail } from "./api/passes";

import type { PassDetail } from "./types/pass";

import Footer from "../../components/Footer/Footer";

type RouteParams = {
  passId: string;
};

function inferTagsFromPassName(name: string): string[] {
  const tags: string[] = [];
  if (name.includes("웨이트") || name.includes("PT") || name.includes("헬스"))
    tags.push("근력");
  if (
    name.includes("수영") ||
    name.includes("러닝") ||
    name.includes("걷기") ||
    name.includes("달리기")
  )
    tags.push("유산소");
  if (name.includes("풋살") || name.includes("축구") || name.includes("농구"))
    tags.push("유산소", "밸런스");
  if (
    name.includes("요가") ||
    name.includes("필라테스") ||
    name.includes("스트레칭")
  )
    tags.push("유연성", "이완");
  if (name.includes("클라이밍") || name.includes("보드"))
    tags.push("클라이밍", "밸런스");
  if (name.includes("코어")) tags.push("코어");
  if (tags.length === 0) tags.push("지구력");
  return Array.from(new Set(tags));
}

export default function PackageDetailPage() {
  const { passId } = useParams<RouteParams>();
  const navigate = useNavigate();

  const numericId = Number(passId);

  // ⭐ 변경점 없음: 페칭 상태 관리
  const [data, setData] = useState<PassDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // ⭐ 그대로 — 데이터 불러오기
  useEffect(() => {
    if (!numericId) {
      setError("유효하지 않은 패키지입니다.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        setLoading(true);
        const detail = await fetchPassDetail(numericId);
        setData(detail);
      } catch (e) {
        console.error(e);
        setError("패키지를 불러오는 중 문제가 발생했습니다.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [numericId]);

  const tags = useMemo(
    () => (data ? inferTagsFromPassName(data.passName) : []),
    [data]
  );

  const handleBack = () => navigate(-1);

  const handleAddToBookmark = () => navigate("/mypage");
  const handleAddToCart = () => navigate("/cart");

  return (
    <>
      <S.Page>
        <S.Content>
          <S.BackRow>
            <button type="button" onClick={handleBack}>
              ← 패키지 목록으로
            </button>
          </S.BackRow>

          {loading && (
            <S.StateText>패키지 정보를 불러오는 중입니다...</S.StateText>
          )}
          {error && !loading && <S.StateText>{error}</S.StateText>}

          {/* ⭐ 여기부터 변경된 핵심 부분 시작 */}
          {data && !loading && !error && (
            <>
              {/* ============================
                  ⭐ 변경점 #1: 썸네일 imageUrl 적용
                  ============================ */}
              <S.HeroCard>
                <S.HeroThumbnail>
                  {data.imageUrl ? (
                    // ⭐ 기존: <div className="gradient" />만 있었음
                    <img src={data.imageUrl} alt={data.passName} />
                  ) : (
                    <div className="gradient" />
                  )}
                </S.HeroThumbnail>

                <S.HeroContent>
                  <S.TagRow>
                    {tags.map((tag) => (
                      <S.TagChip key={tag}>{tag}</S.TagChip>
                    ))}
                  </S.TagRow>

                  <S.Title>{data.passName}</S.Title>
                  <S.Description>{data.passDescription}</S.Description>

                  <S.HeroBottomRow>
                    <S.PriceText>
                      {data.passPrice.toLocaleString()}원
                    </S.PriceText>

                    <S.ButtonRow>
                      <S.SecondaryButton onClick={handleAddToBookmark}>
                        보관함 담기
                      </S.SecondaryButton>
                      <S.PrimaryButton onClick={handleAddToCart}>
                        장바구니 담기
                      </S.PrimaryButton>
                    </S.ButtonRow>
                  </S.HeroBottomRow>
                </S.HeroContent>
              </S.HeroCard>

              <S.SectionTitle>패키지 구성</S.SectionTitle>

              {data.passItems.length === 0 && (
                <S.EmptyFacilities>
                  이 패키지에 포함된 시설 정보가 없습니다.
                  <br />
                  추후 업데이트될 예정입니다.
                </S.EmptyFacilities>
              )}

              {data.passItems.length > 0 && (
                <S.FacilityList>
                  {data.passItems.map((item) => (
                    <S.FacilityCard key={item.facilityId}>
                      <S.FacilityThumb>
                        {data.imageUrl ? (
                          <img src={data.imageUrl} alt={item.facilityName} />
                        ) : (
                          <div className="placeholder" />
                        )}
                      </S.FacilityThumb>

                      <S.FacilityInfo>
                        <S.FacilityHeader>
                          <S.FacilityTag>{item.sportName}</S.FacilityTag>
                          <S.FacilityName>{item.facilityName}</S.FacilityName>
                        </S.FacilityHeader>

                        <S.FacilityMeta>
                          <span>시설 ID: {item.facilityId}</span>
                        </S.FacilityMeta>
                      </S.FacilityInfo>

                      <S.FacilityPrice></S.FacilityPrice>
                    </S.FacilityCard>
                  ))}
                </S.FacilityList>
              )}
            </>
          )}
        </S.Content>
      </S.Page>

      <Footer />
    </>
  );
}
