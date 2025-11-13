import React, { useState, useEffect, useRef } from "react";
import * as S from "./DivWrapper.styles";
import searchIcon from "../../../assets/gg_search.png";
import { getStoresBySearch } from "../../../utils/api";
import { convertApiStoreToStore, type Store } from "../../../utils/storeConverter";

interface DivWrapperProps {
  className?: string;
  placeholder?: string;
  onStoreSelect?: (store: Store) => void;
}

export const DivWrapper: React.FC<DivWrapperProps> = ({
  className,
  placeholder = "원하는 매장을 직접 검색해서 패키지에 추가하세요",
  onStoreSelect,
}) => {
  const [searchValue, setSearchValue] = useState("");
  const [showResults, setShowResults] = useState(false);
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // 검색어에 따라 API 호출하여 매장 조회
  useEffect(() => {
    // 이전 타이머 취소
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    if (searchValue.trim() === "") {
      setFilteredStores([]);
      setShowResults(false);
      setError(null);
      return;
    }

    // 디바운싱: 사용자가 입력을 멈춘 후 300ms 후에 API 호출
    searchTimeoutRef.current = setTimeout(async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await getStoresBySearch(searchValue.trim());
        if (response.isSuccess && response.data) {
          const stores = response.data.content.map(convertApiStoreToStore);
          setFilteredStores(stores);
          setShowResults(stores.length > 0);
        } else {
          throw new Error(response.message || "검색에 실패했습니다.");
        }
      } catch (error) {
        console.error("매장 검색 실패:", error);
        setFilteredStores([]);
        setError(
          error instanceof Error
            ? error.message
            : "검색 중 오류가 발생했습니다."
        );
        setShowResults(false);
      } finally {
        setLoading(false);
      }
    }, 300);

    // cleanup 함수
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
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
    // 부모 컴포넌트에 매장 선택 알림
    if (onStoreSelect) {
      onStoreSelect(store);
    }
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
          onChange={(e) => {
            setSearchValue(e.target.value);
            // 검색어가 있으면 결과 표시
            if (e.target.value.trim() !== "") {
              setShowResults(true);
            }
          }}
          onFocus={() => {
            // 검색어가 있거나 결과가 있으면 결과 표시
            if (searchValue.trim() !== "" || filteredStores.length > 0) {
              setShowResults(true);
            }
          }}
        />
      </S.SearchInput>

      {showResults && (
        <S.SearchResultsDropdown>
          <S.SearchResultHeader>
            <S.SearchResultText>검색 결과</S.SearchResultText>
          </S.SearchResultHeader>
          {loading ? (
            <div style={{ padding: "20px", textAlign: "center" }}>
              검색 중...
            </div>
          ) : error ? (
            <div
              style={{
                padding: "20px",
                textAlign: "center",
                color: "#d92d20",
              }}
            >
              {error}
            </div>
          ) : filteredStores.length > 0 ? (
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
          ) : (
            <div style={{ padding: "20px", textAlign: "center" }}>
              검색 결과가 없습니다
            </div>
          )}
        </S.SearchResultsDropdown>
      )}
    </S.SearchContainer>
  );
};
