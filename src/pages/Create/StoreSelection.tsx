import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./StoreSelection.styles";
import { DivWrapper } from "./StoreSelection/DivWrapper";
import "../../styles/styleguide.css";
import vector65 from "../../assets/Vector 65.png";
import { getStoresBySport } from "../../utils/api";
import { convertApiStoreToStore, type Store } from "../../utils/storeConverter";

// 임시 종목 데이터 (나중에 API로 대체)
const SPORTS = ["필라테스", "요가", "헬스 트레이닝"];

interface StoreSelectionProps {
  onStoresChange?: (stores: (Store | null)[]) => void;
}

export const StoreSelection: React.FC<StoreSelectionProps> = ({
  onStoresChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDropdowns, setOpenDropdowns] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [selectedSports, setSelectedSports] = useState<string[]>(["", "", ""]);
  const [openStoreDropdowns, setOpenStoreDropdowns] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  const [selectedStores, setSelectedStores] = useState<(Store | null)[]>([
    null,
    null,
    null,
  ]);
  // 각 종목별 매장 목록 (인덱스는 selectedSports와 동일)
  const [storesBySport, setStoresBySport] = useState<Store[][]>([[], [], []]);
  // 각 종목별 로딩 상태
  const [loadingStores, setLoadingStores] = useState<boolean[]>([
    false,
    false,
    false,
  ]);
  // 각 종목별 에러 상태
  const [storeErrors, setStoreErrors] = useState<(string | null)[]>([
    null,
    null,
    null,
  ]);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storeDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // StoreInformation에서 돌아올 때 추가된 매장 정보 처리
  useEffect(() => {
    const locationState = location.state as {
      addedStore?: Store;
      sport?: string;
    } | null;

    if (locationState?.addedStore && locationState?.sport) {
      // 빈 슬롯 찾기
      setSelectedSports((prev) => {
        const emptyIndex = prev.findIndex((sport) => sport === "");
        if (emptyIndex !== -1) {
          // 첫 번째 빈 슬롯에 추가
          const newSports = [...prev];
          newSports[emptyIndex] = locationState.sport!;
          return newSports;
        } else {
          // 빈 슬롯이 없으면 첫 번째 슬롯에 추가
          const newSports = [...prev];
          newSports[0] = locationState.sport!;
          return newSports;
        }
      });

      setSelectedStores((prev) => {
        const emptyIndex = prev.findIndex((store) => store === null);
        let newStores: (Store | null)[];
        if (emptyIndex !== -1) {
          // 첫 번째 빈 슬롯에 추가
          newStores = [...prev];
          newStores[emptyIndex] = locationState.addedStore!;
        } else {
          // 빈 슬롯이 없으면 첫 번째 슬롯에 추가
          newStores = [...prev];
          newStores[0] = locationState.addedStore!;
        }
        // 상위 컴포넌트에 변경사항 알리기
        onStoresChange?.(newStores);
        return newStores;
      });

      // location.state 초기화 (뒤로가기 시 중복 추가 방지)
      window.history.replaceState({}, document.title);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  // 패키지 가격 계산
  const calculateTotalPrice = () => {
    const total = selectedStores.reduce((sum, store) => {
      if (store) {
        // "40,000원" 형식에서 숫자만 추출
        const priceStr = store.price.replace(/[^0-9]/g, "");
        return sum + parseInt(priceStr, 10);
      }
      return sum;
    }, 0);
    return total.toLocaleString("ko-KR");
  };

  const toggleDropdown = (index: number) => {
    const newOpenDropdowns = [...openDropdowns];
    // 다른 드롭다운이 열려있으면 먼저 닫기
    if (!newOpenDropdowns[index]) {
      newOpenDropdowns.fill(false);
    }
    newOpenDropdowns[index] = !newOpenDropdowns[index];
    setOpenDropdowns(newOpenDropdowns);
  };

  const selectSport = async (dropdownIndex: number, sport: string) => {
    const newSelectedSports = [...selectedSports];
    newSelectedSports[dropdownIndex] = sport;
    setSelectedSports(newSelectedSports);
    // 종목 선택 후 드롭다운 닫기
    const newOpenDropdowns = [...openDropdowns];
    newOpenDropdowns[dropdownIndex] = false;
    setOpenDropdowns(newOpenDropdowns);
    // 선택된 매장 초기화
    const newSelectedStores = [...selectedStores];
    newSelectedStores[dropdownIndex] = null;
    setSelectedStores(newSelectedStores);
    // 상위 컴포넌트에 변경사항 알리기
    onStoresChange?.(newSelectedStores);

    // 해당 종목의 매장 목록 초기화 및 에러 상태 초기화
    const newStoresBySport = [...storesBySport];
    newStoresBySport[dropdownIndex] = [];
    setStoresBySport(newStoresBySport);

    const newStoreErrors = [...storeErrors];
    newStoreErrors[dropdownIndex] = null;
    setStoreErrors(newStoreErrors);

    // API 호출하여 매장 목록 가져오기
    const newLoadingStores = [...loadingStores];
    newLoadingStores[dropdownIndex] = true;
    setLoadingStores(newLoadingStores);

    try {
      const response = await getStoresBySport(sport);
      if (response.isSuccess && response.data) {
        const stores = response.data.content.map(convertApiStoreToStore);
        const updatedStoresBySport = [...storesBySport];
        updatedStoresBySport[dropdownIndex] = stores;
        setStoresBySport(updatedStoresBySport);
      } else {
        throw new Error(
          response.message || "매장 목록을 가져오는데 실패했습니다."
        );
      }
    } catch (error) {
      console.error("매장 목록 조회 실패:", error);

      // ApiError인 경우 더 자세한 정보 표시
      let errorMessage = "매장 목록을 가져오는데 실패했습니다.";
      if (error instanceof Error) {
        errorMessage = error.message;
        // 500 에러인 경우 사용자에게 더 친화적인 메시지 표시
        if (errorMessage.includes("500")) {
          errorMessage = "서버 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
        }
      }

      const updatedStoreErrors = [...storeErrors];
      updatedStoreErrors[dropdownIndex] = errorMessage;
      setStoreErrors(updatedStoreErrors);
    } finally {
      const updatedLoadingStores = [...loadingStores];
      updatedLoadingStores[dropdownIndex] = false;
      setLoadingStores(updatedLoadingStores);
    }
  };

  const toggleStoreDropdown = (index: number) => {
    if (!selectedSports[index]) return; // 종목이 선택되지 않았으면 매장 드롭다운 열 수 없음

    const newOpenStoreDropdowns = [...openStoreDropdowns];
    // 다른 매장 드롭다운이 열려있으면 먼저 닫기
    if (!newOpenStoreDropdowns[index]) {
      newOpenStoreDropdowns.fill(false);
    }
    newOpenStoreDropdowns[index] = !newOpenStoreDropdowns[index];
    setOpenStoreDropdowns(newOpenStoreDropdowns);
  };

  const removeSport = (index: number) => {
    const newSelectedSports = [...selectedSports];
    newSelectedSports[index] = "";
    setSelectedSports(newSelectedSports);

    const newSelectedStores = [...selectedStores];
    newSelectedStores[index] = null;
    setSelectedStores(newSelectedStores);
    // 상위 컴포넌트에 변경사항 알리기
    onStoresChange?.(newSelectedStores);

    // 매장 목록 및 관련 상태 초기화
    const newStoresBySport = [...storesBySport];
    newStoresBySport[index] = [];
    setStoresBySport(newStoresBySport);

    const newLoadingStores = [...loadingStores];
    newLoadingStores[index] = false;
    setLoadingStores(newLoadingStores);

    const newStoreErrors = [...storeErrors];
    newStoreErrors[index] = null;
    setStoreErrors(newStoreErrors);
  };

  const addStoreToCart = (index: number, store: Store) => {
    const newSelectedStores = [...selectedStores];
    newSelectedStores[index] = store;
    setSelectedStores(newSelectedStores);
    // 상위 컴포넌트에 변경사항 알리기
    onStoresChange?.(newSelectedStores);
    // 매장 추가 후 드롭다운 닫기
    const newOpenStoreDropdowns = [...openStoreDropdowns];
    newOpenStoreDropdowns[index] = false;
    setOpenStoreDropdowns(newOpenStoreDropdowns);

    // 매장 상세 정보 페이지로 이동
    navigate(`/create/store/${store.id}`, {
      state: { store, sport: selectedSports[index] },
    });
  };

  // 검색으로 매장 선택 시 처리
  const handleSearchStoreSelect = (store: Store) => {
    // 빈 슬롯 찾기
    const emptyIndex = selectedStores.findIndex((s) => s === null);

    let newSelectedStores: (Store | null)[];
    if (emptyIndex !== -1) {
      // 빈 슬롯이 있으면 해당 슬롯에 매장 추가
      newSelectedStores = [...selectedStores];
      newSelectedStores[emptyIndex] = store;
    } else {
      // 빈 슬롯이 없으면 첫 번째 슬롯에 추가 (기존 매장 대체)
      newSelectedStores = [...selectedStores];
      newSelectedStores[0] = store;
    }
    setSelectedStores(newSelectedStores);
    // 상위 컴포넌트에 변경사항 알리기
    onStoresChange?.(newSelectedStores);

    // 매장 상세 정보 페이지로 이동 (종목 정보는 선택사항)
    navigate(`/create/store/${store.id}`, {
      state: { store },
    });
  };

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const clickedOutsideSport = dropdownRefs.current.every(
        (ref) => !ref || !ref.contains(event.target as Node)
      );
      const clickedOutsideStore = storeDropdownRefs.current.every(
        (ref) => !ref || !ref.contains(event.target as Node)
      );

      if (clickedOutsideSport && openDropdowns.some((isOpen) => isOpen)) {
        setOpenDropdowns([false, false, false]);
      }

      if (clickedOutsideStore && openStoreDropdowns.some((isOpen) => isOpen)) {
        setOpenStoreDropdowns([false, false, false]);
      }
    };

    if (
      openDropdowns.some((isOpen) => isOpen) ||
      openStoreDropdowns.some((isOpen) => isOpen)
    ) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [openDropdowns, openStoreDropdowns]);

  return (
    <S.Frame>
      <S.Div>
        <S.TextWrapper2>매장 검색</S.TextWrapper2>
        <DivWrapper
          className="view"
          placeholder="원하는 매장을 직접 검색해서 패키지에 추가하세요"
          onStoreSelect={handleSearchStoreSelect}
        />
      </S.Div>

      <S.Div>
        <S.Element>
          <S.Span>패키지에 담을 종목을 선택하세요. </S.Span>
          <S.TextWrapper3>(최소 1개)</S.TextWrapper3>
        </S.Element>

        <S.Div2>
          {[0, 1, 2].map((index) => (
            <React.Fragment key={index}>
              {selectedSports[index] ? (
                selectedStores[index] ? (
                  // 선택된 매장이 있을 때: 카드 형태로 표시
                  <S.SelectedStoreCard>
                    <S.SelectedStoreImage
                      src={selectedStores[index]!.image}
                      alt={selectedStores[index]!.name}
                    />
                    <S.SelectedStoreInfo>
                      <S.SelectedStoreHeader>
                        <S.SelectedSportTag>
                          <S.SelectedSportTagText>
                            {selectedSports[index]}
                          </S.SelectedSportTagText>
                        </S.SelectedSportTag>
                        <S.SelectedStoreNameWrapper>
                          <S.SelectedStoreName>
                            {selectedStores[index]!.name}
                          </S.SelectedStoreName>
                          <S.SelectedStoreVerifiedIcon />
                        </S.SelectedStoreNameWrapper>
                        <S.SelectedStoreAddress>
                          {selectedStores[index]!.address}
                        </S.SelectedStoreAddress>
                      </S.SelectedStoreHeader>
                      <S.SelectedStoreDetails>
                        <S.SelectedStoreDetailRow>
                          <S.SelectedStoreDescription>
                            {selectedStores[index]!.description.group}
                          </S.SelectedStoreDescription>
                          <S.SelectedStoreDescription>
                            {selectedStores[index]!.description.time}
                          </S.SelectedStoreDescription>
                          <S.SelectedStorePrice>
                            {selectedStores[index]!.price.replace("원", "")}
                          </S.SelectedStorePrice>
                          <S.SelectedStorePriceUnit>
                            원
                          </S.SelectedStorePriceUnit>
                        </S.SelectedStoreDetailRow>
                        <S.RemoveStoreButton onClick={() => removeSport(index)}>
                          <S.RemoveStoreIcon />
                        </S.RemoveStoreButton>
                      </S.SelectedStoreDetails>
                    </S.SelectedStoreInfo>
                  </S.SelectedStoreCard>
                ) : (
                  // 종목은 선택되었지만 매장이 없을 때: 매장 선택 드롭다운
                  <S.StoreSelectionContainer
                    ref={(el) => {
                      storeDropdownRefs.current[index] = el;
                    }}
                  >
                    <S.StoreSelectionWrapper>
                      <S.StoreSelectionHeader
                        $isOpen={openStoreDropdowns[index]}
                        onClick={() => toggleStoreDropdown(index)}
                      >
                        <S.SportTag onClick={(e) => e.stopPropagation()}>
                          <S.SportTagText>
                            {selectedSports[index]}
                          </S.SportTagText>
                          <S.CloseButton
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSport(index);
                            }}
                          >
                            <S.CloseIcon />
                          </S.CloseButton>
                        </S.SportTag>
                        <S.StoreSelectText>매장 선택</S.StoreSelectText>
                        <S.Icon $isOpen={openStoreDropdowns[index]}>
                          <img src={vector65} alt="dropdown" />
                        </S.Icon>
                      </S.StoreSelectionHeader>

                      {openStoreDropdowns[index] && (
                        <S.StoreDropdownList>
                          {loadingStores[index] ? (
                            <div
                              style={{ padding: "20px", textAlign: "center" }}
                            >
                              매장 목록을 불러오는 중...
                            </div>
                          ) : storeErrors[index] ? (
                            <div
                              style={{
                                padding: "20px",
                                textAlign: "center",
                                color: "#d92d20",
                              }}
                            >
                              {storeErrors[index]}
                            </div>
                          ) : storesBySport[index].length > 0 ? (
                            storesBySport[index].map((store) => (
                              <S.StoreCard
                                key={store.id}
                                $isSelected={
                                  selectedStores[index]?.id === store.id
                                }
                              >
                                {selectedStores[index]?.id === store.id && (
                                  <S.StoreSelectedIndicator />
                                )}
                                <S.StoreCardContent>
                                  <S.StoreImage
                                    src={store.image}
                                    alt={store.name}
                                  />
                                  <S.StoreInfo>
                                    <S.StoreHeader>
                                      <S.StoreNameWrapper>
                                        <S.StoreName>{store.name}</S.StoreName>
                                        <S.StoreVerifiedIcon />
                                      </S.StoreNameWrapper>
                                      <S.StoreAddress>
                                        {store.address}
                                      </S.StoreAddress>
                                    </S.StoreHeader>
                                    <S.StoreDetails>
                                      <S.StoreDetailRow>
                                        <S.StoreDescription>
                                          {store.description.group}
                                        </S.StoreDescription>
                                        <S.StoreDescription>
                                          {store.description.time}
                                        </S.StoreDescription>
                                        <S.StorePrice>
                                          {store.price}
                                        </S.StorePrice>
                                        <S.AddToCartButton
                                          onClick={() =>
                                            addStoreToCart(index, store)
                                          }
                                          $isSelected={
                                            selectedStores[index]?.id ===
                                            store.id
                                          }
                                        >
                                          확인
                                        </S.AddToCartButton>
                                      </S.StoreDetailRow>
                                    </S.StoreDetails>
                                  </S.StoreInfo>
                                </S.StoreCardContent>
                              </S.StoreCard>
                            ))
                          ) : (
                            <div
                              style={{ padding: "20px", textAlign: "center" }}
                            >
                              매장이 없습니다
                            </div>
                          )}
                        </S.StoreDropdownList>
                      )}
                    </S.StoreSelectionWrapper>
                  </S.StoreSelectionContainer>
                )
              ) : (
                <S.DropdownContainer
                  ref={(el) => {
                    dropdownRefs.current[index] = el;
                  }}
                >
                  <S.SportButton onClick={() => toggleDropdown(index)}>
                    <S.TextWrapper4 $hasSelected={false}>
                      종목 선택
                    </S.TextWrapper4>
                    <S.Icon $isOpen={openDropdowns[index]}>
                      <img src={vector65} alt="dropdown" />
                    </S.Icon>
                  </S.SportButton>

                  {openDropdowns[index] && (
                    <S.DropdownMenu>
                      <S.DropdownHeader>
                        <S.DropdownHeaderText>종목 선택</S.DropdownHeaderText>
                        <S.Icon $isOpen={true}>
                          <img src={vector65} alt="dropdown" />
                        </S.Icon>
                      </S.DropdownHeader>
                      <S.DropdownList>
                        {SPORTS.map((sport, sportIndex) => (
                          <S.DropdownItem
                            key={sportIndex}
                            $isSelected={selectedSports[index] === sport}
                            onClick={() => selectSport(index, sport)}
                          >
                            <S.SportItemText>{sport}</S.SportItemText>
                            {selectedSports[index] === sport && (
                              <S.SelectedIndicator />
                            )}
                          </S.DropdownItem>
                        ))}
                      </S.DropdownList>
                    </S.DropdownMenu>
                  )}
                </S.DropdownContainer>
              )}
            </React.Fragment>
          ))}
        </S.Div2>
      </S.Div>

      <S.PriceDiv>
        <S.TextWrapper4
          $hasSelected={selectedStores.some((store) => store !== null)}
        >
          패키지 가격
        </S.TextWrapper4>
        {selectedStores.some((store) => store !== null) ? (
          <S.PriceValue>
            <S.PriceNumber>{calculateTotalPrice()}</S.PriceNumber>
            <S.PriceUnit>원</S.PriceUnit>
          </S.PriceValue>
        ) : (
          <>
            <S.TextWrapper5>-</S.TextWrapper5>
            <S.TextWrapper5>원</S.TextWrapper5>
          </>
        )}
      </S.PriceDiv>
    </S.Frame>
  );
};
