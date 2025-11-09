import React, { useState, useMemo, useRef, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import * as S from "./StoreInformation.styles";
import Header from "../../components/Header/Header";

// 매장 정보 데이터 타입 (API에서 받아올 데이터)
export interface StoreInfo {
  name: string; // 매장명
  address: string; // 주소
  addressDescription: string; // 주소 설명
  businessHours: string; // 영업시간
  phoneNumber: string; // 전화번호
  description: string; // 기타 설명
  images: string[]; // 매장 이미지 배열
}

// 리뷰 데이터 타입 (API에서 받아올 데이터)
export interface Review {
  id: string;
  author: string; // 작성자
  authorImage: string; // 작성자 사진
  date: string; // 작성일
  comment: string; // 댓글
  helpfulCount: number; // 도움이 됐어요 수
  isHelpful: boolean; // 현재 사용자가 도움이 됐어요를 눌렀는지
  isOwner?: boolean; // 작성자가 매장 주인인지
}

// 임시 데이터 (나중에 API로 교체)
const mockStoreInfo: StoreInfo = {
  name: "버클 필라테스 & PT 미아점",
  address: "서울 강북구 도봉로 204 3층 버클필라테스",
  addressDescription:
    "4호선 미아역 1번출구 도보 30초 맥도날드 건물 3층에 위치하고 있습니다.\n\n네이버 네비게이션에 '버클필라테스&PT 미아점'을 검색하시면 더욱 더 편리하게 이용이 가능합니다.\n(T맵이나 카카오네비도 이용가능합니다.",
  businessHours: "24시간 영업",
  phoneNumber: "0507-1234-5678",
  description:
    "회원님들이 평생의 운동습관을 가져갈수 있도록 수업을 진행해드리고 있습니다. 단기간의 운동효과만 보여 드리는 것이 아니라, 운동을 지속 할 수 있는 올바른 운동습관을 만들어 드리고 있습니다. 회원님의 건강한 인생을 위한 시작과 끝에 저희 버클이 함께 하겠습니다. 1. PT,필라테스, 기능성운동,유산소 프로그램의 결합 - 운동 목적은 몸 만들기, 다이어트, 체형교정, 통증개선 등 다양합니다. 다양한 운동 목적을 이루기 위해 PT,필라테스,기능성 운동, 유산소 운동들을 개인 맞춤으로 제공합니다. 2. 운동검사 기반의 맞춤형 운동 프로그램 - 스포츠의학에서 활용하는 HOPS(History, Observation, Palpation, Special test)를 베이스로 다양한 운동검사를 진행합니다. 정적 및 동적평가, FMS 등의 전문적인 검사 방법을 활용하여 1:1 맞춤 운동 프로그램을 구성합니다. 3. 영상 피드백 시스템, 체계적인 식단 - 올바른 다이어트를 위해서는 식단과 개인에 맞는 운동 관리가 체계적 이어야 합니다. 운동생리학, 영양학 자격증을 가지고 있는 트레이너들을 바탕으로 식습관을 관리해드리며, 개인운동 영상을 제공하는 피드백 시스템입니다. 4.24시간 이용가능한 센터 -회원님의 올바른 운동 습관을 함께 만들어드리려 언제든 사용가능 수업 외 시간에 자유롭게, 무료로 개인운동을 하실 수 있습니다. 5.편안한 분위기 운동을 처음하는 분들에게도 마음 편한 공간 -3층에 위치해 있어 전망이 좋고 통창으로 되어있어 환기도 잘 되고 있는 공간입니다. 깔끔하고 편한 분위기로 사용 가능합니다.",
  images: [
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/xvxfM77i4R.png",
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/1tYvpfqtmH.png",
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/BF5wMPhZfq.png",
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/rvnakEmKHy.png",
  ],
};

const mockReviews: Review[] = [
  {
    id: "1",
    author: "플랭크요정",
    authorImage:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/TZt8ki3AkK.png",
    date: "2025.11.10",
    comment:
      "회사 다니면서 틈틈이 운동하려고 등록했는데, 생각보다 훨씬 만족스러워요. 강사님이 자세를 꼼꼼히 봐주고, 잘못된 습관을 바로 잡아줘서 허리 통증이 많이 줄었어요. 수업 분위기도 딱 적당히 활기차서 부담 없고, 끝나고 나면 땀이 확 나서 스트레스도 풀립니다.",
    helpfulCount: 6,
    isHelpful: false,
  },
  {
    id: "2",
    author: "hana93",
    authorImage:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/Qpu4kDsR5c.png",
    date: "2025.11.13",
    comment: "운동 효과가 바로 느껴져요. 어깨 결림 사라졌어요.",
    helpfulCount: 3,
    isHelpful: true,
  },
  {
    id: "3",
    author: "산초",
    authorImage:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/qn462tN72C.png",
    date: "2025.11.12",
    comment:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
    isHelpful: false,
    isOwner: true,
  },
  {
    id: "4",
    author: "스무디볼",
    authorImage:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/ZvyH9iw4EN.png",
    date: "2025.11.11",
    comment:
      "여기 진짜 체계적으로 운영돼요. 회원별 운동기록을 따로 관리해서 어떤 부위를 얼마나 개선 중인지 바로 알려줘요. 수업 강도 조절도 잘 해줘서 초보자도 무리 없이 따라갈 수 있었어요. 다만 인기가 많아서 원하는 시간 예약은 조금 힘든 편이에요.",
    helpfulCount: 6,
    isHelpful: false,
  },
];

export const StoreInformation: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  // location.state에서 전달된 매장 정보 가져오기
  const locationState = location.state as { store?: any; sport?: string } | null;
  
  // TODO: storeId를 사용하여 API에서 매장 정보 가져오기
  // 현재는 location.state에서 받은 정보를 사용하거나 mock 데이터 사용
  const storeInfo: StoreInfo = locationState?.store
    ? {
        name: locationState.store.name,
        address: locationState.store.address,
        addressDescription: mockStoreInfo.addressDescription, // API에서 가져올 예정
        businessHours: mockStoreInfo.businessHours, // API에서 가져올 예정
        phoneNumber: mockStoreInfo.phoneNumber, // API에서 가져올 예정
        description: mockStoreInfo.description, // API에서 가져올 예정
        images: [locationState.store.image, ...mockStoreInfo.images.slice(1)], // 첫 번째 이미지는 선택한 매장의 이미지
      }
    : mockStoreInfo;
  
  const reviews = mockReviews; // TODO: API에서 가져올 예정
  const [activeTab, setActiveTab] = useState<"info" | "map">("info");
  const [sortOrder, setSortOrder] = useState<"latest" | "recommended">(
    "latest"
  );
  const [imageScrollPosition, setImageScrollPosition] = useState(0);
  const [reviewStates, setReviewStates] = useState<Record<string, Review>>(
    () => {
      // 초기 리뷰 상태를 객체로 저장
      const initialState: Record<string, Review> = {};
      reviews.forEach((review) => {
        initialState[review.id] = { ...review };
      });
      return initialState;
    }
  );
  const [expandedSections, setExpandedSections] = useState<{
    address: boolean;
    description: boolean;
  }>({
    address: false,
    description: false,
  });
  const [expandedReviews, setExpandedReviews] = useState<Record<string, boolean>>({});
  const imageGridRef = useRef<HTMLDivElement>(null);

  // reviews prop이 변경되면 reviewStates 업데이트 (단, 기존 isHelpful 상태는 유지)
  useEffect(() => {
    setReviewStates((prev) => {
      const newStates: Record<string, Review> = {};
      reviews.forEach((review) => {
        // 기존 상태의 isHelpful과 helpfulCount를 유지하되, 나머지는 새 데이터로 업데이트
        const existingReview = prev[review.id];
        if (existingReview) {
          newStates[review.id] = {
            ...review,
            isHelpful: existingReview.isHelpful,
            helpfulCount: existingReview.helpfulCount,
          };
        } else {
          newStates[review.id] = { ...review };
        }
      });
      return newStates;
    });
  }, [reviews]);

  const handlePackageAdd = () => {
    // 패키지 담기 로직
    console.log("패키지 담기", { storeId, storeInfo, sport: locationState?.sport });
    // TODO: 패키지에 매장 추가 API 호출
    // 추가 후 Create 페이지로 돌아가면서 선택된 매장 정보 전달
    navigate("/create", {
      state: {
        addedStore: {
          id: storeId,
          name: storeInfo.name,
          address: storeInfo.address,
          image: storeInfo.images[0],
          description: {
            group: "그룹 (3인)", // TODO: API에서 받아올 예정
            time: "1타임 (60분)", // TODO: API에서 받아올 예정
          },
          price: "40,000원", // TODO: API에서 받아올 예정
        },
        sport: locationState?.sport || "필라테스",
      },
    });
  };

  // 주소 설명을 줄바꿈 처리
  const formatAddressDescription = (text: string) => {
    return text.split("\n").map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < text.split("\n").length - 1 && <br />}
      </React.Fragment>
    ));
  };

  // 이미지 캐러셀 스크롤 함수
  const scrollImages = (direction: "left" | "right") => {
    if (!imageGridRef.current) return;

    const imageWidth = 200; // 각 이미지 너비
    const gap = 8; // 이미지 간 간격
    const scrollAmount = imageWidth + gap;
    const containerWidth = imageGridRef.current.offsetWidth;
    const totalWidth = storeInfo.images.length * imageWidth + (storeInfo.images.length - 1) * gap;
    const maxScroll = Math.max(0, totalWidth - containerWidth);

    let newPosition: number;
    if (direction === "right") {
      newPosition = Math.min(imageScrollPosition + scrollAmount, maxScroll);
    } else {
      newPosition = Math.max(imageScrollPosition - scrollAmount, 0);
    }

    setImageScrollPosition(newPosition);
    imageGridRef.current.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  // 스크롤 위치 업데이트 (스크롤바로 직접 스크롤한 경우 대비)
  useEffect(() => {
    const handleScroll = () => {
      if (imageGridRef.current) {
        setImageScrollPosition(imageGridRef.current.scrollLeft);
      }
    };

    const imageGrid = imageGridRef.current;
    if (imageGrid) {
      imageGrid.addEventListener("scroll", handleScroll);
      return () => {
        imageGrid.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // 리뷰 정렬 함수
  const sortedReviews = useMemo(() => {
    const reviewsArray = Object.values(reviewStates);
    
    if (sortOrder === "latest") {
      // 최신순: 날짜 기준 내림차순 (최신이 위)
      return [...reviewsArray].sort((a, b) => {
        // 날짜 형식: "YYYY.MM.DD" -> "YYYY-MM-DD"로 변환
        const parseDate = (dateStr: string) => {
          const [year, month, day] = dateStr.split(".");
          return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`).getTime();
        };
        
        const dateA = parseDate(a.date);
        const dateB = parseDate(b.date);
        
        // 날짜가 같으면 id로 정렬 (안정적인 정렬)
        if (dateB === dateA) {
          return a.id.localeCompare(b.id);
        }
        return dateB - dateA;
      });
    } else {
      // 추천순: 도움이 됐어요 수 기준 내림차순
      return [...reviewsArray].sort((a, b) => {
        // 도움이 됐어요 수가 같으면 날짜로 정렬 (최신순)
        if (b.helpfulCount === a.helpfulCount) {
          const parseDate = (dateStr: string) => {
            const [year, month, day] = dateStr.split(".");
            return new Date(`${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`).getTime();
          };
          return parseDate(b.date) - parseDate(a.date);
        }
        return b.helpfulCount - a.helpfulCount;
      });
    }
  }, [reviewStates, sortOrder]);

  // 이미지가 스크롤 가능한지 확인
  const [canScrollImages, setCanScrollImages] = useState(false);
  
  useEffect(() => {
    const checkScrollability = () => {
      if (imageGridRef.current) {
        const imageWidth = 200;
        const gap = 8;
        const containerWidth = imageGridRef.current.offsetWidth;
        const totalWidth = storeInfo.images.length * imageWidth + (storeInfo.images.length - 1) * gap;
        setCanScrollImages(totalWidth > containerWidth);
      }
    };

    checkScrollability();
    window.addEventListener("resize", checkScrollability);
    return () => window.removeEventListener("resize", checkScrollability);
  }, [storeInfo.images.length]);

  // 도움이 됐어요 버튼 클릭 핸들러
  const handleHelpfulClick = (reviewId: string) => {
    setReviewStates((prev) => {
      const review = prev[reviewId];
      if (!review) return prev;

      const newState = {
        ...prev,
        [reviewId]: {
          ...review,
          isHelpful: !review.isHelpful,
          helpfulCount: review.isHelpful
            ? review.helpfulCount - 1
            : review.helpfulCount + 1,
        },
      };

      // TODO: API 호출로 서버에 상태 업데이트
      // await updateReviewHelpful(reviewId, !review.isHelpful);

      return newState;
    });
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.ContentWrapper>
          {/* 좌측: 매장 정보 섹션 */}
          <S.StoreInfoSection>
            {/* 매장 헤더 */}
            <S.StoreHeader>
              <S.StoreNameWrapper>
                <S.StoreVerifiedIcon />
                <S.StoreName>{storeInfo.name}</S.StoreName>
              </S.StoreNameWrapper>
            </S.StoreHeader>

            {/* 매장 이미지 */}
            <S.StoreImages>
              {canScrollImages && (
                <S.ImageNavigation>
                  <S.NavButton
                    direction="left"
                    onClick={() => scrollImages("left")}
                    disabled={imageScrollPosition === 0}
                    aria-label="이전 이미지"
                  />
                  <S.NavButton
                    direction="right"
                    onClick={() => scrollImages("right")}
                    disabled={(() => {
                      if (!imageGridRef.current) return false;
                      const imageWidth = 200;
                      const gap = 8;
                      const containerWidth = imageGridRef.current.offsetWidth;
                      const totalWidth = storeInfo.images.length * imageWidth + (storeInfo.images.length - 1) * gap;
                      const maxScroll = Math.max(0, totalWidth - containerWidth);
                      return imageScrollPosition >= maxScroll - 1; // 1px 오차 허용
                    })()}
                    aria-label="다음 이미지"
                  />
                </S.ImageNavigation>
              )}
              <S.ImageGrid ref={imageGridRef}>
                {storeInfo.images.map((image, index) => (
                  <S.StoreImage key={index} src={image} alt={`매장 이미지 ${index + 1}`} />
                ))}
              </S.ImageGrid>
            </S.StoreImages>

            {/* 탭 메뉴 */}
            <S.TabMenu>
              <S.TabButton
                active={activeTab === "info"}
                onClick={() => setActiveTab("info")}
              >
                매장 정보
              </S.TabButton>
              <S.TabButton
                active={activeTab === "map"}
                onClick={() => setActiveTab("map")}
              >
                지도
              </S.TabButton>
            </S.TabMenu>

            {activeTab === "info" && (
              <S.StoreDetails>
                {/* 주소 */}
                <S.DetailRow>
                  <S.DetailIcon>
                    <S.MapIcon />
                  </S.DetailIcon>
                  <S.DetailText>{storeInfo.address}</S.DetailText>
                </S.DetailRow>

                {/* 길 안내 */}
                <S.DetailRow>
                  <S.DetailIcon>
                    <S.DirectionIcon />
                  </S.DetailIcon>
                  <S.DetailContent>
                    <S.DirectionsText
                      $expanded={expandedSections.address}
                    >
                      {formatAddressDescription(storeInfo.addressDescription)}
                    </S.DirectionsText>
                    <S.MoreButton
                      onClick={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          address: !prev.address,
                        }))
                      }
                    >
                      <S.MoreText>
                        {expandedSections.address ? "접기" : "더보기"}
                      </S.MoreText>
                      <S.MoreIcon $expanded={expandedSections.address} />
                    </S.MoreButton>
                  </S.DetailContent>
                </S.DetailRow>

                {/* 영업시간 */}
                <S.DetailRow>
                  <S.DetailIcon>
                    <S.ClockIcon />
                  </S.DetailIcon>
                  <S.BusinessHours>{storeInfo.businessHours}</S.BusinessHours>
                </S.DetailRow>

                {/* 전화번호 */}
                <S.DetailRow>
                  <S.DetailIcon>
                    <S.PhoneIcon />
                  </S.DetailIcon>
                  <S.DetailText>{storeInfo.phoneNumber}</S.DetailText>
                </S.DetailRow>

                {/* 설명 */}
                <S.DetailRow>
                  <S.DetailIcon>
                    <S.ChatIcon />
                  </S.DetailIcon>
                  <S.DetailContent>
                    <S.DescriptionText $expanded={expandedSections.description}>
                      {storeInfo.description}
                    </S.DescriptionText>
                    <S.MoreButton
                      onClick={() =>
                        setExpandedSections((prev) => ({
                          ...prev,
                          description: !prev.description,
                        }))
                      }
                    >
                      <S.MoreText>
                        {expandedSections.description ? "접기" : "더보기"}
                      </S.MoreText>
                      <S.MoreIcon $expanded={expandedSections.description} />
                    </S.MoreButton>
                  </S.DetailContent>
                </S.DetailRow>
              </S.StoreDetails>
            )}

            {activeTab === "map" && (
              <S.MapPlaceholder>
                <p>지도 영역</p>
              </S.MapPlaceholder>
            )}
          </S.StoreInfoSection>

          {/* 우측: 리뷰 섹션 */}
          <S.ReviewSection>
            <S.ReviewContainer>
              <S.ReviewHeader>
                <S.ReviewTitle>리뷰</S.ReviewTitle>
                <S.SortMenu>
                  <S.SortButton
                    active={sortOrder === "latest"}
                    onClick={() => setSortOrder("latest")}
                  >
                    최신순
                  </S.SortButton>
                  <S.SortSeparator>|</S.SortSeparator>
                  <S.SortButton
                    active={sortOrder === "recommended"}
                    onClick={() => setSortOrder("recommended")}
                  >
                    추천순
                  </S.SortButton>
                </S.SortMenu>
              </S.ReviewHeader>

              <S.ReviewList>
                {sortedReviews.map((review) => (
                <S.ReviewItem key={review.id}>
                  <S.ReviewAvatar>
                    <S.AvatarImage
                      style={{
                        backgroundImage: `url(${review.authorImage})`,
                      }}
                    />
                  </S.ReviewAvatar>
                  <S.ReviewContent>
                    <S.ReviewHeaderRow>
                      <S.ReviewAuthor>{review.author}</S.ReviewAuthor>
                      <S.ReviewDateWrapper>
                        {review.isOwner && (
                          <S.ReviewActions>
                            <S.ReviewAction>수정</S.ReviewAction>
                            <S.ReviewActionSeparator>|</S.ReviewActionSeparator>
                            <S.ReviewAction>삭제</S.ReviewAction>
                          </S.ReviewActions>
                        )}
                        <S.ReviewDate>{review.date}</S.ReviewDate>
                      </S.ReviewDateWrapper>
                    </S.ReviewHeaderRow>
                    {review.comment.length <= 50 ? (
                      <S.ReviewCommentShort>{review.comment}</S.ReviewCommentShort>
                    ) : (
                      <>
                        <S.ReviewComment $expanded={expandedReviews[review.id]}>
                          {review.comment}
                        </S.ReviewComment>
                        <S.MoreButton
                          onClick={() =>
                            setExpandedReviews((prev) => ({
                              ...prev,
                              [review.id]: !prev[review.id],
                            }))
                          }
                        >
                          <S.MoreText>
                            {expandedReviews[review.id] ? "접기" : "더보기"}
                          </S.MoreText>
                          <S.MoreIcon $expanded={expandedReviews[review.id]} />
                        </S.MoreButton>
                      </>
                    )}
                    <S.ReviewFooter>
                      <S.HelpfulText>도움이 됐어요</S.HelpfulText>
                      <S.HelpfulButton
                        active={review.isHelpful}
                        onClick={() => handleHelpfulClick(review.id)}
                      >
                        <S.ThumbsUpIcon
                          style={{
                            backgroundImage: `url(${
                              review.isHelpful
                                ? "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/1REhZAN5hm.png"
                                : "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/oBZvPj2DXM.png"
                            })`,
                          }}
                        />
                        <S.HelpfulCount active={review.isHelpful}>
                          {review.helpfulCount}
                        </S.HelpfulCount>
                      </S.HelpfulButton>
                    </S.ReviewFooter>
                  </S.ReviewContent>
                </S.ReviewItem>
                ))}
              </S.ReviewList>
            </S.ReviewContainer>

            <S.PackageButton onClick={handlePackageAdd}>
              <S.PackageButtonText>패키지 담기</S.PackageButtonText>
            </S.PackageButton>
          </S.ReviewSection>
        </S.ContentWrapper>
      </S.Container>
    </>
  );
};

export default StoreInformation;
