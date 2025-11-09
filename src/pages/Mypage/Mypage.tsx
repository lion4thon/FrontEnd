import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import MyReview from "./MyReview";
import MyReviewCreate, { type ReviewCreateData } from "./MyReviewCreate";
import * as S from "./Mypage.styles";
import type {
  UserProfile,
  OngoingPackage,
  CompletedPackage,
  PackageStorage,
  Report,
  Review,
  Store,
} from "./Mypage.types";

// Mock data - replace with real data later
// TODO: API 연결 시 이 부분을 API 호출로 대체
// 예: const { data } = useQuery<MypageData>('mypage', fetchMypageData);
const mockUser: UserProfile = {
  name: "산초",
  avatar:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/9XkPfqQ0Gc.png",
};

const mockOngoingPackages: OngoingPackage[] = [
  {
    id: 1,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/qG7GmBtkwP.png",
  },
  {
    id: 2,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/WNf4MBcWOv.png",
  },
];

const mockCompletedPackages: CompletedPackage[] = [
  {
    id: 3,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/5kfXuUTTRK.png",
  },
  {
    id: 4,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/2O02RZoPf0.png",
  },
];

const mockPackageStorage: PackageStorage[] = [
  {
    id: 5,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/8fx5pphgjd.png",
    price: 43000,
  },
  {
    id: 6,
    title: "1년차 헬린이를 위한 입문용 패키지",
    description:
      "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지.... 선생님들도 친절하고 잘 알려주시는 편이에요.",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/9jRoGQqvfq.png",
    price: 43000,
  },
];

// Mock reports data - 초기에는 빈 배열 (사용자가 작성한 리포트만 표시)
// TODO: API 연결 시 실제 리포트 데이터를 가져오도록 수정
const mockReports: Report[] = [];

// Mock reviews data - 초기에는 빈 배열 (사용자가 작성한 리뷰만 표시)
// TODO: API 연결 시 실제 리뷰 데이터를 가져오도록 수정
const mockReviews: Review[] = [];

// Mock stores data - 패키지별 매장 정보
// TODO: API 연결 시 실제 패키지별 매장 정보를 가져오도록 수정
const mockStores: Store[] = [
  {
    id: 1,
    name: "버클 필라테스 & PT 미아점",
    image:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/store1.png",
  },
  {
    id: 2,
    name: "요가 스튜디오 강남점",
    image:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/store2.png",
  },
  {
    id: 3,
    name: "필라테스 센터 홍대점",
    image:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/store3.png",
  },
];

const REPORTS_STORAGE_KEY = "user_reports";

export default function Mypage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = React.useState<"report" | "review">(
    "report"
  );
  const [reports, setReports] = React.useState<Report[]>(mockReports);
  const [reviews, setReviews] = React.useState<Review[]>(mockReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = React.useState(false);
  const [selectedReviewData, setSelectedReviewData] =
    React.useState<ReviewCreateData | null>(null);

  // 로컬 스토리지에서 리포트 목록을 읽어오는 함수
  const loadReports = React.useCallback(() => {
    const savedReportsJson = localStorage.getItem(REPORTS_STORAGE_KEY);
    if (savedReportsJson) {
      try {
        const savedReports: Report[] = JSON.parse(savedReportsJson);
        // 저장된 리포트와 mock 리포트 병합 (저장된 리포트가 우선)
        // 중복 제거 (같은 ID가 있으면 저장된 것 사용)
        const reportMap = new Map<number, Report>();

        // 먼저 mock 리포트 추가
        mockReports.forEach((report) => {
          reportMap.set(report.id, report);
        });

        // 저장된 리포트 추가 (같은 ID가 있으면 덮어쓰기)
        savedReports.forEach((report) => {
          reportMap.set(report.id, report);
        });

        // Map을 배열로 변환하고 최신순으로 정렬
        const mergedReports = Array.from(reportMap.values()).sort(
          (a, b) => b.id - a.id
        );

        setReports(mergedReports);
      } catch (error) {
        console.error("리포트 목록을 불러오는 중 오류 발생:", error);
        // 오류 발생 시 mock 데이터 사용
        setReports(mockReports);
      }
    } else {
      // 저장된 리포트가 없으면 mock 데이터만 사용
      setReports(mockReports);
    }
  }, []);

  // 컴포넌트 마운트 시 및 location 변경 시 로컬 스토리지에서 리포트 목록 읽기
  React.useEffect(() => {
    loadReports();
  }, [loadReports, location.pathname]);

  // Refs for scrollable containers
  const ongoingPackagesRef = React.useRef<HTMLDivElement | null>(null);
  const completedPackagesRef = React.useRef<HTMLDivElement | null>(null);
  const packageStorageRef = React.useRef<HTMLDivElement | null>(null);

  const scrollPackages = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ) => {
    if (ref.current) {
      const scrollAmount = 500; // 스크롤할 픽셀 수
      const scrollTo =
        direction === "left"
          ? ref.current.scrollLeft - scrollAmount
          : ref.current.scrollLeft + scrollAmount;
      ref.current.scrollTo({
        left: scrollTo,
        behavior: "smooth",
      });
    }
  };

  // 현재 날짜를 "YYYY.MM.DD" 형식으로 반환
  const getCurrentDate = (): string => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 리뷰 추가 핸들러
  const handleReviewSave = (reviewContent: string) => {
    if (!reviewContent.trim()) return;

    // 리뷰 목록에 추가 (최신 리뷰가 맨 위에 오도록)
    setReviews((prevReviews) => {
      // 새로운 리뷰 ID 생성 (기존 리뷰의 최대 ID + 1, 없으면 1)
      const newId = prevReviews.length > 0 
        ? Math.max(...prevReviews.map((r) => r.id)) + 1 
        : 1;

      // 새로운 리뷰 객체 생성
      const newReview: Review = {
        id: newId,
        userId: 1, // mockUser의 ID (실제로는 사용자 ID 사용)
        userName: mockUser.name,
        userAvatar: mockUser.avatar,
        date: getCurrentDate(),
        content: reviewContent.trim(),
        helpfulCount: 0,
      };

      return [newReview, ...prevReviews];
    });
    
    // 리뷰 탭으로 전환
    setActiveTab("review");
  };

  return (
    <>
      <Header />
      <S.Container>
        <S.HeaderPlaceholder />
        <S.Content>
          <S.MainLayout>
            <S.LeftColumn>
              {/* Profile Section */}
              <S.ProfileCard>
                <S.ProfileInfo>
                  <S.Avatar src={mockUser.avatar} alt={mockUser.name} />
                  <S.ProfileDetails>
                    <S.UserName>{mockUser.name}</S.UserName>
                    <S.ProfileActions>
                      <S.ActionButton>
                        <S.ActionText>프로필 수정</S.ActionText>
                        <S.EditIcon />
                      </S.ActionButton>
                      <S.ActionButton>
                        <S.ActionText>설문 다시하기</S.ActionText>
                        <S.SurveyIcon />
                      </S.ActionButton>
                    </S.ProfileActions>
                  </S.ProfileDetails>
                </S.ProfileInfo>
              </S.ProfileCard>

              {/* Ongoing Packages Section */}
              <S.Section>
                <S.SectionHeader>
                  <S.SectionTitle>진행 중인 패키지</S.SectionTitle>
                  <S.NavigationButtons>
                    <S.NavButton
                      direction="left"
                      onClick={() => scrollPackages(ongoingPackagesRef, "left")}
                    />
                    <S.NavButton
                      direction="right"
                      onClick={() =>
                        scrollPackages(ongoingPackagesRef, "right")
                      }
                    />
                  </S.NavigationButtons>
                </S.SectionHeader>
                <S.PackageGrid ref={ongoingPackagesRef}>
                  {mockOngoingPackages.map((pkg) => (
                    <S.PackageCard key={pkg.id}>
                      <S.PackageThumbnail src={pkg.thumbnail} alt={pkg.title} />
                      <S.PackageInfo>
                        <S.PackageTitleRow>
                          <S.PackageTitle>{pkg.title}</S.PackageTitle>
                          <S.ChevronIcon />
                        </S.PackageTitleRow>
                        <S.PackageDescription>
                          {pkg.description}
                        </S.PackageDescription>
                      </S.PackageInfo>
                    </S.PackageCard>
                  ))}
                </S.PackageGrid>
              </S.Section>

              {/* Completed Packages Section */}
              <S.Section>
                <S.SectionHeader>
                  <S.SectionTitle>완료한 패키지</S.SectionTitle>
                  <S.NavigationButtons>
                    <S.NavButton
                      direction="left"
                      onClick={() =>
                        scrollPackages(completedPackagesRef, "left")
                      }
                    />
                    <S.NavButton
                      direction="right"
                      onClick={() =>
                        scrollPackages(completedPackagesRef, "right")
                      }
                    />
                  </S.NavigationButtons>
                </S.SectionHeader>
                <S.PackageGrid ref={completedPackagesRef}>
                  {mockCompletedPackages.map((pkg) => (
                    <S.CompletedPackageCard key={pkg.id}>
                      <S.CompletedPackageContent>
                        <S.PackageThumbnail
                          src={pkg.thumbnail}
                          alt={pkg.title}
                        />
                        <S.PackageInfo>
                          <S.PackageTitleRow>
                            <S.PackageTitle>{pkg.title}</S.PackageTitle>
                            <S.ChevronIcon />
                          </S.PackageTitleRow>
                          <S.PackageDescription>
                            {pkg.description}
                          </S.PackageDescription>
                        </S.PackageInfo>
                      </S.CompletedPackageContent>
                      <S.ActionButtons>
                        <S.ActionButtonSmall
                          onClick={() => {
                            setSelectedReviewData({
                              package: pkg,
                              stores: mockStores,
                            });
                            setIsReviewModalOpen(true);
                          }}
                        >
                          리뷰 작성
                        </S.ActionButtonSmall>
                        <S.ActionButtonSmall
                          onClick={() =>
                            navigate("/mypage/report", {
                              state: { package: pkg },
                            })
                          }
                        >
                          리포트 작성
                        </S.ActionButtonSmall>
                      </S.ActionButtons>
                    </S.CompletedPackageCard>
                  ))}
                </S.PackageGrid>
              </S.Section>

              {/* Package Storage Section */}
              <S.Section>
                <S.SectionHeader>
                  <S.SectionTitle>패키지 보관함</S.SectionTitle>
                  <S.NavigationButtons>
                    <S.NavButton
                      direction="left"
                      onClick={() => scrollPackages(packageStorageRef, "left")}
                    />
                    <S.NavButton
                      direction="right"
                      onClick={() => scrollPackages(packageStorageRef, "right")}
                    />
                  </S.NavigationButtons>
                </S.SectionHeader>
                <S.PackageGrid ref={packageStorageRef}>
                  {mockPackageStorage.map((pkg) => (
                    <S.StoragePackageCard key={pkg.id}>
                      <S.PackageThumbnail src={pkg.thumbnail} alt={pkg.title} />
                      <S.StoragePackageInfo>
                        <S.StoragePackageContent>
                          <S.PackageInfo>
                            <S.PackageTitleRow>
                              <S.PackageTitle>{pkg.title}</S.PackageTitle>
                              <S.ChevronIcon />
                            </S.PackageTitleRow>
                            <S.PackageDescription>
                              {pkg.description}
                            </S.PackageDescription>
                          </S.PackageInfo>
                          <S.StoragePackagePriceContainer>
                            <S.Price>{pkg.price.toLocaleString()}원</S.Price>
                          </S.StoragePackagePriceContainer>
                        </S.StoragePackageContent>
                      </S.StoragePackageInfo>
                      <S.CartIcon />
                    </S.StoragePackageCard>
                  ))}
                </S.PackageGrid>
              </S.Section>
            </S.LeftColumn>

            {/* Reports/Reviews Section */}
            <S.RightColumn>
              <S.TabHeader>
                <S.TabButton
                  active={activeTab === "report"}
                  onClick={() => setActiveTab("report")}
                >
                  리포트
                </S.TabButton>
                <S.TabButton
                  active={activeTab === "review"}
                  onClick={() => setActiveTab("review")}
                >
                  리뷰
                </S.TabButton>
              </S.TabHeader>
              <S.TabIndicator
                position={activeTab === "report" ? "left" : "right"}
              />
              {activeTab === "report" ? (
                <S.ReportList>
                  {reports.map((report) => (
                    <S.ReportCard key={report.id}>
                      <S.ReportThumbnail
                        src={report.thumbnail}
                        alt={report.title}
                      />
                      <S.ReportInfo>
                        <S.ReportDate>{report.date}</S.ReportDate>
                        <S.ReportTitleRow>
                          <S.ReportTitle>{report.title}</S.ReportTitle>
                          <S.ReportChevron />
                        </S.ReportTitleRow>
                      </S.ReportInfo>
                    </S.ReportCard>
                  ))}
                </S.ReportList>
              ) : (
                <MyReview reviews={reviews} />
              )}
            </S.RightColumn>
          </S.MainLayout>
        </S.Content>
      </S.Container>
      <MyReviewCreate
        open={isReviewModalOpen}
        onClose={() => {
          setIsReviewModalOpen(false);
          setSelectedReviewData(null);
        }}
        reviewData={selectedReviewData}
        onSave={handleReviewSave}
      />
    </>
  );
}
