/**
 * 마이페이지에서 사용하는 데이터 타입 정의
 * API 연결 시 이 타입들을 사용하여 데이터를 받아옵니다.
 */

// 1. 프로필 정보
export interface UserProfile {
  /** 프로필 사진 URL */
  avatar: string;
  /** 작성자 이름 (예: "산초") */
  name: string;
}

// 2. 진행 중인 패키지
export interface OngoingPackage {
  /** 패키지 ID */
  id: number;
  /** 패키지 사진 URL */
  thumbnail: string;
  /** 패키지 이름 (예: "1년차 헬린이를 위한 입문용 패키지") */
  title: string;
  /** 패키지 설명 (예: "기초체력과 근력 강화에 안성맞춤 패키지!...") */
  description: string;
}

// 3. 완료한 패키지
export interface CompletedPackage {
  /** 패키지 ID */
  id: number;
  /** 패키지 사진 URL */
  thumbnail: string;
  /** 패키지 이름 (예: "1년차 헬린이를 위한 입문용 패키지") */
  title: string;
  /** 패키지 설명 (예: "기초체력과 근력 강화에 안성맞춤 패키지!...") */
  description: string;
}

// 4. 패키지 보관함
export interface PackageStorage {
  /** 패키지 ID */
  id: number;
  /** 패키지 사진 URL */
  thumbnail: string;
  /** 패키지 이름 (예: "1년차 헬린이를 위한 입문용 패키지") */
  title: string;
  /** 패키지 설명 (예: "기초체력과 근력 강화에 안성맞춤 패키지!...") */
  description: string;
  /** 패키지 가격 (예: 43000) */
  price: number;
}

// 5. 리포트
export interface Report {
  /** 리포트 ID */
  id: number;
  /** 리포트 사진 URL */
  thumbnail: string;
  /** 날짜 (예: "10월 31일") */
  date: string;
  /** 패키지 이름 (예: "필라테스 세션 리포트") */
  title: string;
}

// 6. 리뷰
export interface Review {
  /** 리뷰 ID */
  id: number;
  /** 사용자 ID */
  userId: number;
  /** 사용자 이름 (예: "산초") */
  userName: string;
  /** 사용자 프로필 사진 URL */
  userAvatar: string;
  /** 리뷰 작성 날짜 (예: "2025.11.13") */
  date: string;
  /** 리뷰 내용 */
  content: string;
  /** 도움이 됐어요 개수 */
  helpfulCount: number;
}

// 7. 매장
export interface Store {
  /** 매장 ID */
  id: number;
  /** 매장 사진 URL */
  image: string;
  /** 매장 이름 (예: "버클 필라테스 & PT 미아점") */
  name: string;
}

// API 응답 타입 (선택사항 - API 구조에 맞게 수정)
export interface MypageData {
  profile: UserProfile;
  ongoingPackages: OngoingPackage[];
  completedPackages: CompletedPackage[];
  packageStorage: PackageStorage[];
  reports: Report[];
  reviews: Review[];
}

