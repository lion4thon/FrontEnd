import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Header from "../../components/Header/Header";
import MyReview from "./MyReview";
import * as S from "./Mypage.styles";
import type {
  UserProfile,
  OngoingPackage,
  CompletedPackage,
  PackageStorage,
  Report,
  Review,
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

const mockReports: Report[] = [
  {
    id: 1,
    date: "10월 31일",
    title: "필라테스 세션 리포트",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/LokM5c85Mh.png",
  },
  {
    id: 2,
    date: "10월 31일",
    title: "필라테스 세션 리포트",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/YkLSyzBXrT.png",
  },
  {
    id: 3,
    date: "10월 31일",
    title: "필라테스 세션 리포트",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/FFjRmcNLez.png",
  },
  {
    id: 4,
    date: "10월 31일",
    title: "필라테스 세션 리포트",
    thumbnail:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/Y8PCuADijL.png",
  },
];

const mockReviews: Review[] = [
  {
    id: 1,
    userId: 1,
    userName: "산초",
    userAvatar:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/oy7UPzHHgG.png",
    date: "2025.11.13",
    content:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
  },
  {
    id: 2,
    userId: 1,
    userName: "산초",
    userAvatar:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/t5FyAuO7gi.png",
    date: "2025.11.13",
    content:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
  },
  {
    id: 3,
    userId: 1,
    userName: "산초",
    userAvatar:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/WC4PG9v5vW.png",
    date: "2025.11.13",
    content:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
  },
  {
    id: 4,
    userId: 1,
    userName: "산초",
    userAvatar:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/y0UFXbG7fG.png",
    date: "2025.11.13",
    content:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
  },
  {
    id: 5,
    userId: 1,
    userName: "산초",
    userAvatar:
      "https://codia-f2c.s3.us-west-1.amazonaws.com/image/2025-11-09/0EUtBXOqgL.png",
    date: "2025.11.13",
    content:
      "처음엔 가격이 부담됐는데, 수업 퀄리티 생각하면 납득돼요. 특히 자세 교정이 세밀해서 운동할 맛 납니다.",
    helpfulCount: 11,
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
                        <S.ActionButtonSmall>리뷰 작성</S.ActionButtonSmall>
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
                <MyReview reviews={mockReviews} />
              )}
            </S.RightColumn>
          </S.MainLayout>
        </S.Content>
      </S.Container>
    </>
  );
}
