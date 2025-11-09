import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as S from "./StoreSelection.styles";
import { DivWrapper } from "./StoreSelection/DivWrapper";
import "../../styles/styleguide.css";
import vector65 from "../../assets/Vector 65.png";

// 임시 종목 데이터 (나중에 API로 대체)
const SPORTS = ["필라테스", "요가", "헬스 트레이닝"];

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
const STORES: Store[] = [
  {
    id: "1",
    name: "버클 필라테스 & PT 미아점",
    address: "서울 강북구 도봉로 204 3층 버클필라테스",
    image:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-08/vdWGL1zHoC.png",
    description: {
      group: "그룹 (3인)",
      time: "1타임 (60분)",
    },
    price: "40,000원",
  },
];

export const StoreSelection: React.FC = () => {
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
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const storeDropdownRefs = useRef<(HTMLDivElement | null)[]>([]);

  // StoreInformation에서 돌아올 때 추가된 매장 정보 처리
  useEffect(() => {
    const locationState = location.state as
      | { addedStore?: Store; sport?: string }
      | null;

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
        if (emptyIndex !== -1) {
          // 첫 번째 빈 슬롯에 추가
          const newStores = [...prev];
          newStores[emptyIndex] = locationState.addedStore!;
          return newStores;
        } else {
          // 빈 슬롯이 없으면 첫 번째 슬롯에 추가
          const newStores = [...prev];
          newStores[0] = locationState.addedStore!;
          return newStores;
        }
      });

      // location.state 초기화 (뒤로가기 시 중복 추가 방지)
      window.history.replaceState({}, document.title);
    }
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

  const selectSport = (dropdownIndex: number, sport: string) => {
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
  };

  const addStoreToCart = (index: number, store: Store) => {
    const newSelectedStores = [...selectedStores];
    newSelectedStores[index] = store;
    setSelectedStores(newSelectedStores);
    // 매장 추가 후 드롭다운 닫기
    const newOpenStoreDropdowns = [...openStoreDropdowns];
    newOpenStoreDropdowns[index] = false;
    setOpenStoreDropdowns(newOpenStoreDropdowns);

    // 매장 상세 정보 페이지로 이동
    navigate(`/create/store/${store.id}`, {
      state: { store, sport: selectedSports[index] },
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
                          <S.SelectedStorePriceUnit>원</S.SelectedStorePriceUnit>
                        </S.SelectedStoreDetailRow>
                        <S.RemoveStoreButton
                          onClick={() => removeSport(index)}
                        >
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
                          <S.SportTagText>{selectedSports[index]}</S.SportTagText>
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
                          {STORES.length > 0 ? (
                            STORES.map((store) => (
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
                                        <S.StorePrice>{store.price}</S.StorePrice>
                                        <S.AddToCartButton
                                          onClick={() =>
                                            addStoreToCart(index, store)
                                          }
                                          $isSelected={
                                            selectedStores[index]?.id === store.id
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
                            <div>매장이 없습니다</div>
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
        <S.TextWrapper4 $hasSelected={selectedStores.some((store) => store !== null)}>
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
