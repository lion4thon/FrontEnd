import React, { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
// import Header from "../../components/Header/Header";
import MyReview from "./MyReview";
import MyReviewCreate, { type ReviewCreateData } from "./MyReviewCreate";
import MyReviewDelete from "./MyReviewDelete";
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
import { getMyPasses } from "../../utils/api";
import { ApiError } from "../../utils/api";

// Mock data - replace with real data later
// TODO: API 연결 시 이 부분을 API 호출로 대체
// 예: const { data } = useQuery<MypageData>('mypage', fetchMypageData);
const mockUser: UserProfile = {
  name: "산초",
  avatar:
    "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/9XkPfqQ0Gc.png",
};

// 진행 중인 패키지 기본 썸네일
const ONGOING_THUMBNAIL =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/qG7GmBtkwP.png";

// 완료한 패키지 기본 썸네일
const COMPLETED_THUMBNAIL =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/5kfXuUTTRK.png";

// 패키지 보관함 기본 썸네일
const STORAGE_THUMBNAIL =
  "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/8fx5pphgjd.png";

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
  const [activeTab, setActiveTab] = useState<"report" | "review">("report");
  const [reports, setReports] = useState<Report[]>(mockReports);
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [selectedReviewData, setSelectedReviewData] =
    useState<ReviewCreateData | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [reviewIdToDelete, setReviewIdToDelete] = useState<number | null>(null);

  // 패키지 데이터 상태
  const [ongoingPackages, setOngoingPackages] = useState<OngoingPackage[]>([]);
  const [completedPackages, setCompletedPackages] = useState<CompletedPackage[]>(
    []
  );
  const [packageStorage, setPackageStorage] = useState<PackageStorage[]>([]);
  const [isLoadingPackages, setIsLoadingPackages] = useState(false);
  const [packageError, setPackageError] = useState<string | null>(null);

  // 패키지 데이터 가져오기
  const fetchPackages = useCallback(async () => {
    try {
      setIsLoadingPackages(true);
      setPackageError(null);

      // 세 가지 상태의 패키지를 동시에 가져오기
      const [ongoingResponse, completedResponse, storageResponse] =
        await Promise.all([
          getMyPasses("OWNED"),
          getMyPasses("COMPLETED"),
          getMyPasses("IN_LOCKER"),
        ]);

      // 진행 중인 패키지 매핑
      if (ongoingResponse.isSuccess && ongoingResponse.data) {
        const mappedOngoing: OngoingPackage[] = ongoingResponse.data.map(
          (pass) => ({
            id: pass.passId,
            title: pass.passName,
            description: pass.passDescription,
            thumbnail: ONGOING_THUMBNAIL, // 기본 썸네일 사용
          })
        );
        setOngoingPackages(mappedOngoing);
      }

      // 완료한 패키지 매핑
      if (completedResponse.isSuccess && completedResponse.data) {
        const mappedCompleted: CompletedPackage[] =
          completedResponse.data.map((pass) => ({
            id: pass.passId,
            title: pass.passName,
            description: pass.passDescription,
            thumbnail: COMPLETED_THUMBNAIL, // 기본 썸네일 사용
          }));
        setCompletedPackages(mappedCompleted);
      }

      // 패키지 보관함 매핑
      if (storageResponse.isSuccess && storageResponse.data) {
        const mappedStorage: PackageStorage[] = storageResponse.data.map(
          (pass) => ({
            id: pass.passId,
            title: pass.passName,
            description: pass.passDescription,
            price: pass.passPrice,
            thumbnail: STORAGE_THUMBNAIL, // 기본 썸네일 사용
          })
        );
        setPackageStorage(mappedStorage);
      }
    } catch (err) {
      console.error("패키지 조회 실패:", err);
      if (err instanceof ApiError) {
        setPackageError(err.message);
      } else if (err instanceof Error) {
        setPackageError(err.message);
      } else {
        setPackageError("패키지를 가져오는데 실패했습니다.");
      }
    } finally {
      setIsLoadingPackages(false);
    }
  }, []);

  // 컴포넌트 마운트 시 패키지 데이터 가져오기
  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // 로컬 스토리지에서 리포트 목록을 읽어오는 함수
  const loadReports = useCallback(() => {
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
  useEffect(() => {
    loadReports();
  }, [loadReports, location.pathname]);

  // Refs for scrollable containers
  const ongoingPackagesRef = useRef<HTMLDivElement | null>(null);
  const completedPackagesRef = useRef<HTMLDivElement | null>(null);
  const packageStorageRef = useRef<HTMLDivElement | null>(null);

  const scrollPackages = (
    ref: React.RefObject<HTMLDivElement | null>,
    direction: "left" | "right"
  ): void => {
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

  // 리뷰 삭제 핸들러
  const handleReviewDelete = (reviewId: number) => {
    setReviewIdToDelete(reviewId);
    setIsDeleteModalOpen(true);
  };

  // 리뷰 삭제 확인 핸들러
  const handleDeleteConfirm = () => {
    if (reviewIdToDelete === null) return;

    // TODO: API 호출로 리뷰 삭제
    console.log("리뷰 삭제 완료:", reviewIdToDelete);

    // 리뷰 목록에서 삭제
    setReviews((prevReviews) =>
      prevReviews.filter((review) => review.id !== reviewIdToDelete)
    );

    setReviewIdToDelete(null);
  };

  return (
    <>
      {/* <Header /> */}
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
                  {isLoadingPackages ? (
                    <div>패키지를 불러오는 중...</div>
                  ) : packageError ? (
                    <div>패키지를 불러오는데 실패했습니다: {packageError}</div>
                  ) : ongoingPackages.length === 0 ? (
                    <div>진행 중인 패키지가 없습니다.</div>
                  ) : (
                    ongoingPackages.map((pkg) => (
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
                    ))
                  )}
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
                  {isLoadingPackages ? (
                    <div>패키지를 불러오는 중...</div>
                  ) : packageError ? (
                    <div>패키지를 불러오는데 실패했습니다: {packageError}</div>
                  ) : completedPackages.length === 0 ? (
                    <div>완료한 패키지가 없습니다.</div>
                  ) : (
                    completedPackages.map((pkg) => (
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
                    ))
                  )}
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
                  {isLoadingPackages ? (
                    <div>패키지를 불러오는 중...</div>
                  ) : packageError ? (
                    <div>패키지를 불러오는데 실패했습니다: {packageError}</div>
                  ) : packageStorage.length === 0 ? (
                    <div>패키지 보관함이 비어있습니다.</div>
                  ) : (
                    packageStorage.map((pkg) => (
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
                    ))
                  )}
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
                <MyReview reviews={reviews} onDelete={handleReviewDelete} />
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
      <MyReviewDelete
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setReviewIdToDelete(null);
        }}
        onConfirm={handleDeleteConfirm}
      />
    </>
  );
}
