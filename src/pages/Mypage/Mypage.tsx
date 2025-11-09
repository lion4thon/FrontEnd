import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import * as S from "./Mypage.styles";
import type {
  UserProfile,
  OngoingPackage,
  CompletedPackage,
  PackageStorage,
  Report,
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

export default function Mypage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = React.useState<"report" | "review">(
    "report"
  );

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
              <S.ReportList>
                {mockReports.map((report) => (
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
            </S.RightColumn>
          </S.MainLayout>
        </S.Content>
      </S.Container>
    </>
  );
}
