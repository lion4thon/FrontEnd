import { useMemo, useState, type ComponentProps } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import FilterBar from "../../components/FilterBar/FilterBar";
import PackageCard from "../../components/PackageCard/PackageCard";
import HorizontalSection from "../../components/HorizontalSection";
import * as S from "./Package.style";

import fitness1 from "../../assets/sample_pic2.svg";
import Footer from "../../components/Footer/Footer";

// import Header from "../../components/Header/Header";

import type {
  PriceRange,
  Sort,
  TimeSlot,
} from "../../components/FilterBar/FilterBar.types";

type PackageItem = ComponentProps<typeof PackageCard>["item"];

// 하드코딩 패키지 데이터
const mockPackages: PackageItem[] = [
  {
    id: 1,
    title: "헬린이를 위한 입문 운동 패키지",
    thumbnail: fitness1,
    tags: ["근력", "지구력"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 43000,
    totalSessions: 12,
  },
  {
    id: 2,
    title: "요가로 시작하는 하루 루틴",
    thumbnail: fitness1,
    tags: ["유연성", "이완"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 35000,
    totalSessions: 10,
  },
  {
    id: 3,
    title: "PT 전문가의 코어 집중 클래스",
    thumbnail: fitness1,
    tags: ["코어", "지구력"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 50000,
    totalSessions: 8,
  },
  {
    id: 4,
    title: "클라이밍 초급자를 위한 근력 강화",
    thumbnail: fitness1,
    tags: ["근력", "밸런스"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 42000,
    totalSessions: 10,
  },
  {
    id: 5,
    title: "야외 러닝 입문자를 위한 기초 체력 코스",
    thumbnail: fitness1,
    tags: ["유산소", "지구력"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 30000,
    totalSessions: 8,
  },
  {
    id: 6,
    title: "헬린이를 위한 입문 운동 패키지",
    thumbnail: fitness1,
    tags: ["근력", "지구력"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 43000,
    totalSessions: 12,
  },
  {
    id: 7,
    title: "헬린이를 위한 입문 운동 패키지",
    thumbnail: fitness1,
    tags: ["근력", "지구력"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 43000,
    totalSessions: 12,
  },
  {
    id: 8,
    title: "헬린이를 위한 입문 운동 패키지",
    thumbnail: fitness1,
    tags: ["근력", "유연성"],
    detail: "기초체력과 근력 강화에 안성맞춤",
    pricePerClass: 43000,
    totalSessions: 12,
  },
];

export default function PackagePage() {
  const [query, setQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [price, setPrice] = useState<PriceRange>("전체");
  const [sort, setSort] = useState<Sort>("전체");
  const [time, setTime] = useState<TimeSlot>("전체");
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const filtered = useMemo(() => {
    let list = [...mockPackages];

    // 검색
    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter((p) => p.title.toLowerCase().includes(q));
    }

    // 태그 AND 필터
    if (selectedTags.length > 0) {
      list = list.filter((p) => selectedTags.every((t) => p.tags.includes(t)));
    }

    // 정렬 (필드가 확실한 것만 사용: 가격 정렬 + 기본/업로드순은 id로 대체)
    switch (sort) {
      case "가격낮은순":
        list.sort((a, b) => a.pricePerClass - b.pricePerClass);
        break;
      case "가격높은순":
        list.sort((a, b) => b.pricePerClass - a.pricePerClass);
        break;
      case "업로드순":
        // createdAt이 없다면 id 역순을 간이 최신으로 사용
        list.sort((a, b) => b.id - a.id);
        break;
      case "조회순":
      case "AI 추천순":
      default:
        // 뷰/추천 점수가 생기면 여기서 정렬
        break;
    }

    return list;
  }, [query, selectedTags, sort]);

  // 섹션 분류
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

  return (
    <>
      {/* <Header /> */}
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

          {/* 검색 */}
          <SearchBar onSearch={setQuery} />
          <S.Spacer />

          {/* 필터바 */}
          <FilterBar
            price={price}
            sort={sort}
            time={time}
            onChangePrice={setPrice}
            onChangeSort={setSort}
            onChangeTime={setTime}
            selectedTags={selectedTags}
            onToggleTag={toggleTag}
          />
          <S.Spacer />
        </S.Content>

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
      <Footer />
    </>
  );
}
