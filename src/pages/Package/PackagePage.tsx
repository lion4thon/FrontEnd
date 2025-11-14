import { useEffect, useMemo, useState, type ComponentProps } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import { fetchPasses } from "./api/passes";
import type { PassItem } from "./types/pass";

import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import PackageCard from "../../components/PackageCard/PackageCard";
import HorizontalSection from "../../components/HorizontalSection";
import * as S from "./Package.style";
// import Footer from "../../components/Footer/Footer";

// import fitness1 from "../../assets/sample_pic2.svg";

import { useAuth } from "../../providers/AuthProvider";
import LoginRequiredModal from "../../components/Modal/LoginRequiredModal";
import SurveyRequiredModal from "../../components/Modal/SurveyRequiredModal";

import type {
  PriceRange,
  Sort,
} from "../../components/FilterBar/FilterBar.types";

type PackageItem = ComponentProps<typeof PackageCard>["item"];

function inferTagsFromPassName(name?: string): string[] {
  const tags: string[] = [];
  if (!name) {
    tags.push("지구력");
    return tags;
  }
  if (name.includes("웨이트") || name.includes("PT") || name.includes("헬스")) {
    tags.push("근력");
  }
  if (
    name.includes("수영") ||
    name.includes("러닝") ||
    name.includes("걷기") ||
    name.includes("달리기")
  ) {
    tags.push("유산소");
  }
  if (name.includes("풋살") || name.includes("축구") || name.includes("농구")) {
    if (!tags.includes("유산소")) {
      tags.push("유산소");
    }
    tags.push("밸런스");
  }
  if (
    name.includes("요가") ||
    name.includes("필라테스") ||
    name.includes("스트레칭")
  ) {
    tags.push("유연성");
    tags.push("이완");
  }
  if (name.includes("클라이밍") || name.includes("보드")) {
    tags.push("클라이밍");
    tags.push("밸런스");
  }
  if (name.includes("코어")) {
    tags.push("코어");
  }
  if (tags.length === 0) {
    tags.push("지구력");
  }
  return Array.from(new Set(tags));
}

function mapPassToPackage(p: PassItem): PackageItem {
  return {
    id: p.passId,
    title: p.passName,
    detail: p.passDescription,
    pricePerClass: p.passPrice,
    thumbnail: p.imageUrl || "/default-thumbnail.png",
    tags: inferTagsFromPassName(p.passName),
    totalSessions: 10,
  };
}

type AiRecommendationItem = {
  name: string;
  price: number;
  pass_id: number;
  intensity: string;
  purposeTag: string;
  predicted_score: number;
  image_url: string;
};

function mapAiRecommendationToPackage(rec: AiRecommendationItem): PackageItem {
  return {
    id: rec.pass_id,
    title: rec.name,
    detail: "",
    pricePerClass: rec.price,
    // thumbnail: "/default-thumbnail.png",
    thumbnail: rec.image_url || "/default-thumbnail.png",
    tags: inferTagsFromPassName(rec.name),
    totalSessions: 10,
  };
}

function getPriceRange(price: PriceRange) {
  switch (price) {
    case "1~3만원":
      return { minPrice: 10000, maxPrice: 30000 };
    case "3~5만원":
      return { minPrice: 30000, maxPrice: 50000 };
    case "5~10만원":
      return { minPrice: 50000, maxPrice: 100000 };
    case "10~30만원":
      return { minPrice: 100000, maxPrice: 300000 };
    case "30만원 이상":
      return { minPrice: 300000 };
    default:
      return {};
  }
}

export default function PackagePage() {
  const [query, setQuery] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceRange>("전체");
  const [sort, setSort] = useState<Sort>("전체");

  const { isLoggedIn, surveyCompleted } = useAuth();
  const nav = useNavigate();

  const [openLogin, setOpenLogin] = useState<boolean>(false);
  const [openSurvey, setOpenSurvey] = useState<boolean>(false);

  const location = useLocation();
  const aiRecommendations = location.state?.aiRecommendations ?? [];
  const hasAiRecommendations =
    aiRecommendations && aiRecommendations.length > 0;

  // 정렬 변경 시 정책 분기 (AI 추천순 클릭 → 로그인/설문 체크)
  const handleSortChange = (v: Sort) => {
    if (v === "AI 추천순") {
      // 이미 AI 추천 결과가 있으면 바로 정렬만 변경
      if (!hasAiRecommendations) {
        // 결과가 없을 때만 로그인/설문 체크
        if (!isLoggedIn) {
          setOpenLogin(true);
          return;
        }
        if (!surveyCompleted) {
          setOpenSurvey(true);
          return;
        }
      }
    }
    setSort(v);
  };

  const handleLogin = () => {
    setOpenLogin(false);
    nav("/login"); // 로그인 모달로 이동
  };
  const handleGoSurvey = () => {
    setOpenSurvey(false);
    nav("/package/survey"); // 설문 시작 모달로 이동
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // 데이터 불러오기 연동
  const [packages, setPackages] = useState<PassItem[]>([]);

  const uiPackages = useMemo(() => packages.map(mapPassToPackage), [packages]);

  const [, setLoading] = useState(false);

  const filtered = useMemo(() => {
    let list = [...uiPackages];

    const q = query.trim().toLowerCase();
    if (q) list = list.filter((p) => p.title.toLowerCase().includes(q));

    if (selectedTags.length > 0) {
      list = list.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    }

    switch (sort) {
      case "가격낮은순":
        list.sort((a, b) => a.pricePerClass - b.pricePerClass);
        break;
      case "가격높은순":
        list.sort((a, b) => b.pricePerClass - a.pricePerClass);
        break;
      case "업로드순":
        list.sort((a, b) => b.id - a.id);
        break;
      case "조회순":
      case "AI 추천순":
      default:
        break;
    }
    return list;
  }, [query, selectedTags, sort, uiPackages]);

  const sectionGym = useMemo(
    () =>
      filtered.filter((p) =>
        p.tags.some((t) => ["근력", "지구력", "코어"].includes(t))
      ),
    [filtered]
  );
  const sectionYoga = useMemo(
    () =>
      filtered.filter((p) =>
        p.tags.some((t) => ["유연성", "이완"].includes(t))
      ),
    [filtered]
  );
  const sectionActive = useMemo(
    () =>
      filtered.filter((p) =>
        p.tags.some((t) => ["유산소", "밸런스", "클라이밍"].includes(t))
      ),
    [filtered]
  );

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const { minPrice, maxPrice } = getPriceRange(price);
        const data = await fetchPasses({
          passName: query ? query : undefined,
          sortBy:
            sort === "가격높은순"
              ? "PRICE_HIGH"
              : sort === "가격낮은순"
              ? "PRICE_LOW"
              : sort === "조회순"
              ? "VIEW_COUNT"
              : sort === "업로드순"
              ? "LATEST"
              : undefined,
          minPrice,
          maxPrice,
        });

        console.log("[SERVER RESPONSE] /api/passes:", data);

        setPackages(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [query, sort, price]);

  useEffect(() => {
    if (hasAiRecommendations) {
      setSort("AI 추천순");
    }
  }, [hasAiRecommendations]);

  return (
    <>
      <S.Page>
        <S.HeaderPlaceholder />

        <S.Content>
          <S.Greeting>
            <h1>
              반가워요, 산초님!
              <br />
              오늘도 MOV와 함께 다양한 운동을 체험해볼까요?
            </h1>
          </S.Greeting>

          <SearchBar onSearch={setQuery} />
          <S.Spacer />

          <FilterBar
            price={price}
            sort={sort}
            onChangePrice={setPrice}
            onChangeSort={handleSortChange}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
          <S.Spacer />
        </S.Content>

        {hasAiRecommendations && sort === "AI 추천순" && (
          <HorizontalSection
            title="✨ AI 추천 패키지"
            items={aiRecommendations.map(mapAiRecommendationToPackage)}
            keyPrefix="ai-"
          />
        )}
        <HorizontalSection
          title="💪 헬린이를 위한 가벼운 헬스 패키지"
          items={sectionGym}
          keyPrefix="gym-"
        />
        <HorizontalSection
          title="🧘‍♀️ 요가 · 필라테스 추천 패키지"
          items={sectionYoga}
          keyPrefix="yoga-"
        />
        <HorizontalSection
          title="🏃‍♀️ 활동적인 러닝/클라이밍 패키지"
          items={sectionActive}
          keyPrefix="active-"
        />
      </S.Page>

      {/* <Footer /> */}

      {/* 모달들 */}
      <LoginRequiredModal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
        onLogin={handleLogin}
      />
      <SurveyRequiredModal
        open={openSurvey}
        onClose={() => setOpenSurvey(false)}
        onGoSurvey={handleGoSurvey}
      />
    </>
  );
}
