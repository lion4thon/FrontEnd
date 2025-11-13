import { useEffect, useMemo, useState } from "react";
import * as S from "./CartPage.style";
import CartItem from "./CartItem";
// import ReservationItem from "../../components/Modal/ReservationItem";
import thumb from "../../assets/cart-sample.svg";
import checkIcon from "../../assets/double-check.svg";

import { api } from "../../lib/api";
import PayModal from "./components/PayModal";
import { requestPayment } from "./apis/payment"; 
import { getMyPasses, getCartPasses } from "./apis/myPasses";

export type SessionItemType = {
  id: number;
  category: string;
  name: string;
  address: string;
  type: string;
  price: number;
  image: string;
  datetime?: string;
  selected?: boolean;
};

export type CartItemType = {
  id: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  sessions?: SessionItemType[];
};

export type ReservationItemType = {
  id: number;
  name: string;
  address: string;
  image: string;
  type: string;
  date: string;
  time: string;
  status: "예약완료" | "이용완료" | "취소됨";
  price: number;
  category: string;
};

type SummarySessionDto = {
  sessionId: number;
  category: string;
  name: string;
  address: string;
  type: string;
  price: number;
  imageUrl?: string;
  datetime?: string;
  selected?: boolean;
};

type SummaryPackageDto = {
  packageId: number;
  packageName: string;
  packageDescription?: string;
  packageImageUrl?: string;
  packagePrice: number;
  sessions: SummarySessionDto[];
};

type SummaryData = {
  passName: string[];   // 장바구니에 담긴 패키지 이름 목록
  totalPrice: number;   // 총 결제 금액
};

type SummaryResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  data: SummaryData;
};

/** 서버 DTO → CartPage에서 쓰는 타입으로 매핑 */
const mapSummaryToCartItem = (pkg: SummaryPackageDto): CartItemType => ({
  id: pkg.packageId,
  name: pkg.packageName,
  description: pkg.packageDescription,
  image: pkg.packageImageUrl || thumb,
  price: pkg.packagePrice,
  sessions: pkg.sessions?.map((s) => ({
    id: s.sessionId,
    category: s.category,
    name: s.name,
    address: s.address,
    type: s.type,
    price: s.price,
    image: s.imageUrl || thumb,
    datetime: s.datetime,
    selected: s.selected ?? false,
  })),
  
});

// /api/my-passes 응답을 CartItemType으로 변환
const mapMyPassToCartItem = (pass: MyPassDto): CartItemType => ({
  id: pass.passId,
  name: pass.passName,
  description: pass.passDescription,
  image: thumb,            // 서버에서 이미지가 없으니 기본 썸네일 사용
  price: pass.passPrice,
  // passItem에는 시설 이름/종목 정보만 있어서 일단 최소 정보만 세션으로 매핑
  sessions: pass.passItem.map((item) => ({
    id: item.facilityId,
    category: item.sportName,
    name: item.facilityName,
    address: "",          // 응답에 없으니 일단 빈 값
    type: "",             // 마찬가지
    price: 0,             // 상세 가격이 없으면 0으로 둠 (나중에 확장 가능)
    image: thumb,
    selected: false,
  })),
});

export default function CartPage() {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

  // const [cartItems, setCartItems] = useState<CartItemType[]>([
  //   {
  //     id: 1,
  //     name: "1년차 헬린이를 위한 입문용 패키지",
  //     description:
  //       "기초체력과 근력 강화에 안성맞춤 패키지! 직접 경험해 본 매장들만 고르고 골라 담은 나만 알고 싶은 패키지...",
  //     image: thumb,
  //     price: 43000,
  //     sessions: [
  //       {
  //         id: 11,
  //         category: "필라테스",
  //         name: "버블 필라테스 & PT 미아점",
  //         address: "서울 강북구 도봉로 204 3층 버블필라테스",
  //         type: "그룹 (4인)  1타임 (60분)",
  //         price: 20000,
  //         image: thumb,
  //         selected: true,
  //         datetime: "2025-11-15 14:00",
  //       },
  //       {
  //         id: 12,
  //         category: "헬스 트레이닝",
  //         name: "에스핏 휘트니스 수유점",
  //         address: "서울 강북구 도봉로 67길 18 3층",
  //         type: "1일권",
  //         price: 10000,
  //         image: thumb,
  //       },
  //       {
  //         id: 13,
  //         category: "요가",
  //         name: "마음수련 미아 명상센터",
  //         address: "서울 강북구 우이천로 302 덕후빌딩 1층",
  //         type: "그룹 (15인)  1타임 (60분)",
  //         price: 13000,
  //         image: thumb,
  //       },
  //     ],
  //   },
  //   {
  //     id: 2,
  //     name: "갓 시작한 필린이를 위한 패키지",
  //     description:
  //       "부담 없는 구성으로 가볍게 시작하기 좋은 조합입니다. 선생님들이 친절하고 시설도 깔끔해요.",
  //     image: thumb,
  //     price: 43000,
  //     sessions: [
  //       {
  //         id: 21,
  //         category: "필라테스",
  //         name: "미소 필라테스 미아역점",
  //         address: "서울 강북구 도봉로 173 4층",
  //         type: "그룹 (6인)  1타임 (50분)",
  //         price: 23000,
  //         image: thumb,
  //       },
  //       {
  //         id: 22,
  //         category: "요가",
  //         name: "힐링 요가숲 수유점",
  //         address: "서울 강북구 도봉로 318 2층",
  //         type: "1일권",
  //         price: 12000,
  //         image: thumb,
  //       },
  //     ],
  //   },
  // ]);


  const [cartItems, setCartItems] = useState<CartItemType[]>([]); // 초기값은 빈 배열
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [summaryTotal, setSummaryTotal] = useState(0);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);


 const handlePay = async () => {
  if (isPaying || summaryTotal <= 0) return;

  try {
    setIsPaying(true);

    const passIds = reservedPackages.map((pkg) => pkg.id);
    console.log("[PAY REQUEST]", passIds);

    const result = await requestPayment(passIds);
    console.log("[PAY RESULT]", result);

    setIsPayModalOpen(false);
  } catch (e) {
    console.error("결제 실패", e);
  } finally {
    setIsPaying(false);
  }
};

  // 장바구니(예약 목록) 조회
// 장바구니(예약 목록) 조회
// useEffect(() => {
//   const fetchSummary = async () => {
//     try {
//       setLoading(true);
//       setError(null);

//       const res = await api.get<SummaryResponse>("/api/summary");
//       console.log("[SUMMARY RAW]", res.data);

//       const { passName, totalPrice } = res.data.data;

//       // 패키지 이름 배열을 CartItem으로 변환
//       const items: CartItemType[] = passName.map((name, index) => ({
//         id: index + 1,
//         name,
//         image: thumb,
//         price: 0,        // 서버에서 패키지별 가격이 안 오기 때문에 일단 0으로 둠
//         sessions: [],    // /summary에는 세션 정보가 없어서 빈 배열
//       }));

//       setCartItems(items);
//       // totalPrice는 필요하면 따로 state로 들고가도 됨
//       setSummaryTotal(totalPrice);
//     } catch (e) {
//       console.error("예약 목록 조회 실패", e);
//       setError("예약 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchSummary();
// }, []);

useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      // /api/my-passes?status=IN_CART 호출
      const res = await getCartPasses();
      console.log("[MY PASSES RAW]", res);

      const passes = res.data; // MyPassDto[]

      // 장바구니 아이템으로 변환
      const items: CartItemType[] = passes.map(mapMyPassToCartItem);

      setCartItems(items);

      // 총 결제 금액은 passPrice 합으로 계산
      const total = passes.reduce((sum, p) => sum + p.passPrice, 0);
      setSummaryTotal(total);
    } catch (e) {
      console.error("생성한 패키지 조회 실패", e);
      setError("예약 정보를 불러오지 못했어요. 잠시 후 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }
  };

  fetchCart();
}, []);



  const handleUpdateSession = (
    itemId: number,
    sessionId: number,
    patch: Partial<SessionItemType>
  ) => {
    setCartItems((prev) =>
      prev.map((pkg) =>
        pkg.id !== itemId
          ? pkg
          : {
              ...pkg,
              sessions: (pkg.sessions || []).map((s) =>
                s.id === sessionId ? { ...s, ...patch } : s
              ),
            }
      )
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((it) => it.id !== id));
  };

  const reservedSessions = useMemo(() => {
    const list: ReservationItemType[] = [];
    for (const pkg of cartItems) {
      for (const s of pkg.sessions || []) {
        if (s.selected && s.datetime) {
          const [date, time] = s.datetime.split(" ");
          list.push({
            id: s.id,
            name: s.name,
            address: s.address,
            image: s.image,
            type: s.type,
            date,
            time,
            status: "예약완료",
            price: s.price,
            category: s.category,
          });
        }
      }
    }
    return list;
  }, [cartItems]);

  const reservedPackages = useMemo(
    () =>
      cartItems.filter((pkg) =>
        (pkg.sessions || []).some((s) => s.selected && s.datetime)
      ),
    [cartItems]
  );


  // 패키지 총 가격(왼)
  const cartTotalPrice = useMemo(
    () => cartItems.reduce((acc, cur) => acc + (cur.price || 0), 0),
    [cartItems]
  );

  return (
    <>
    <S.Container>
      <S.Grid>
        {/* 장바구니 */}
        <S.LeftCol>
          <S.Panel>
            <S.PanelHeader>장바구니</S.PanelHeader>

            <S.OrderList>
              {cartItems.map((item) => (
                <li key={item.id}>
                  <CartItem
                    item={item}
                    onRemove={handleRemoveItem}
                    onUpdateSession={handleUpdateSession}
                  />
                </li>
              ))}
            </S.OrderList>

            <S.OrderFooter>
              <S.PriceRow>
                <span>패키지 가격</span>
                <strong>{cartTotalPrice.toLocaleString()}원</strong>
              </S.PriceRow>
            </S.OrderFooter>
          </S.Panel>
        </S.LeftCol>

        {/* 예약 내역 */}
        <S.RightCol>
          <S.RightPanel>
            <S.RightHeader>예약 내역</S.RightHeader>

            <S.RightBody>
              <S.Section>
                <S.RowLabel>패키지 내역</S.RowLabel>
                <S.RowContent>
                  {reservedPackages.length === 0 ? (
                    <span style={{ color: "#9aa3b2" }}>
                      선택된 내역이 없습니다
                    </span>
                  ) : (
                    reservedPackages.map((pkg) => (
                      <div
                        key={pkg.id}
                        style={{
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                        title={pkg.name}
                      >
                        {pkg.name}
                      </div>
                    ))
                  )}
                </S.RowContent>
                <S.RowTail>
                  <b>{reservedPackages.length}개 패키지</b>
                </S.RowTail>
              </S.Section>

              <S.Section>
                <S.RowLabel>예약 중복</S.RowLabel>
                <S.RowContent>
                  <S.OkRow>
                    중복 내역이 없습니다
                    <img src={checkIcon} alt="확인" />
                  </S.OkRow>
                </S.RowContent>
              </S.Section>

              <S.Section>
                <S.RowLabel>총 결제 금액</S.RowLabel>
                <S.RowContent />
                <S.RowTail>
                  <S.TotalPrice>
                    {summaryTotal.toLocaleString()}원
                  </S.TotalPrice>
                </S.RowTail>
              </S.Section>
            </S.RightBody>
          </S.RightPanel>

          <S.PayWrap>
            <S.PayButton
              type="button"
              onClick={() => setIsPayModalOpen(true)}
            >
              결제하기
            </S.PayButton>
          </S.PayWrap>
        </S.RightCol>
      </S.Grid>
    </S.Container>
    <PayModal
              open={isPayModalOpen}
              amount={summaryTotal}
              onClose={() => setIsPayModalOpen(false)}
              onConfirm={handlePay}
              isProcessing={isPaying}
            />
    </>
  );
}
