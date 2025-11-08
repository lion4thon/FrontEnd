import React, { useState, useEffect, useRef } from "react";
import * as S from "./DivWrapper.styles";
import searchIcon from "../../../assets/gg_search.png";

// 매장 데이터 타입
interface Store {
  id: string;
  name: string;
  address: string;
  image: string;
  description: {
    group: string;
    time: string;
  };
  price: string;
}

// 임시 매장 데이터 (나중에 API로 대체)
const SEARCH_STORES: Store[] = [
  {
    id: "search-1",
    name: "버클 필라테스 & PT 미아점",
    address: "서울 강북구 도봉로 204 3층 버클필라테스",
    image:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/Ojxab1aOX6.png",
    description: {
      group: "그룹 (3인)",
      time: "1타임 (60분)",
    },
    price: "40,000원",
  },
];

interface DivWrapperProps {
  className?: string;
  placeholder?: string;
}

export const DivWrapper: React.FC<DivWrapperProps> = ({
  className,
  placeholder = "원하는 매장을 직접 검색해서 패키지에 추가하세요",
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 검색어에 따라 매장 필터링
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredStores([]);
      setShowResults(false);
    } else {
      // 검색어와 매장 이름이 일치하는 매장만 필터링
      const filtered = SEARCH_STORES.filter((store) =>
        store.name.includes(searchValue.trim())
      );
      setFilteredStores(filtered);
      setShowResults(filtered.length > 0);
    }
  }, [searchValue]);

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    if (showResults) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [showResults]);

  const handleStoreAdd = (store: Store) => {
    // 매장 추가 로직 (나중에 구현)
    console.log("매장 추가:", store);
    setSearchValue("");
    setShowResults(false);
  };

  return (
    <S.SearchContainer ref={wrapperRef}>
      <S.SearchInput className={className}>
        <S.Icon>
          <img src={searchIcon} alt="검색" />
        </S.Icon>
        <S.Input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onFocus={() => {
            if (searchValue.trim() !== "") {
              setShowResults(true);
            }
          }}
        />
      </S.SearchInput>

      {showResults && filteredStores.length > 0 && (
        <S.SearchResultsDropdown>
          <S.SearchResultHeader>
            <S.SearchResultText>검색 결과</S.SearchResultText>
          </S.SearchResultHeader>
          <S.SearchResultList>
            {filteredStores.map((store) => (
              <S.SearchStoreCard key={store.id}>
                <S.SearchStoreImage src={store.image} alt={store.name} />
                <S.SearchStoreInfo>
                  <S.SearchStoreHeader>
                    <S.SearchStoreNameWrapper>
                      <S.SearchStoreName>{store.name}</S.SearchStoreName>
                      <S.SearchStoreVerifiedIcon />
                    </S.SearchStoreNameWrapper>
                    <S.SearchStoreAddress>{store.address}</S.SearchStoreAddress>
                  </S.SearchStoreHeader>
                  <S.SearchStoreDetails>
                    <S.SearchStoreDetailRow>
                      <S.SearchStoreDescription>
                        {store.description.group}
                      </S.SearchStoreDescription>
                      <S.SearchStoreDescription>
                        {store.description.time}
                      </S.SearchStoreDescription>
                      <S.SearchStorePrice>{store.price}</S.SearchStorePrice>
                      <S.SearchAddToCartButton
                        onClick={() => handleStoreAdd(store)}
                      >
                        확인
                      </S.SearchAddToCartButton>
                    </S.SearchStoreDetailRow>
                  </S.SearchStoreDetails>
                </S.SearchStoreInfo>
              </S.SearchStoreCard>
            ))}
          </S.SearchResultList>
        </S.SearchResultsDropdown>
      )}
    </S.SearchContainer>
  );
};
