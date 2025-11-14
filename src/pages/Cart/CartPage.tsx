import { useEffect, useMemo, useState } from "react";
import * as S from "./CartPage.style";
import CartItem from "./CartItem";
// import ReservationItem from "../../components/Modal/ReservationItem";
import thumb from "../../assets/cart-sample.svg";
import checkIcon from "../../assets/double-check.svg";

// import { api } from "../../lib/api";
import PayModal from "./components/PayModal";
// import { requestPayment } from "./apis/payment"; 
// import { getMyPasses, getCartPasses } from "./apis/myPasses";
import { getCartPasses } from "./apis/myPasses";
import type { MyPassDto } from "./apis/myPasses";
import { createReservation } from "./apis/reservation";

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

// type SummarySessionDto = {
//   sessionId: number;
//   category: string;
//   name: string;
//   address: string;
//   type: string;
//   price: number;
//   imageUrl?: string;
//   datetime?: string;
//   selected?: boolean;
// };

// type SummaryPackageDto = {
//   packageId: number;
//   packageName: string;
//   packageDescription?: string;
//   packageImageUrl?: string;
//   packagePrice: number;
//   sessions: SummarySessionDto[];
// };

// type SummaryData = {
//   passName: string[];   // 장바구니에 담긴 패키지 이름 목록
//   totalPrice: number;   // 총 결제 금액
// };

// type SummaryResponse = {
//   isSuccess: boolean;
//   code: string;
//   message: string;
//   data: SummaryData;
// };

/** 서버 DTO → CartPage에서 쓰는 타입으로 매핑 */
// const mapSummaryToCartItem = (pkg: SummaryPackageDto): CartItemType => ({
//   id: pkg.packageId,
//   name: pkg.packageName,
//   description: pkg.packageDescription,
//   image: pkg.packageImageUrl || thumb,
//   price: pkg.packagePrice,
//   sessions: pkg.sessions?.map((s) => ({
//     id: s.sessionId,
//     category: s.category,
//     name: s.name,
//     address: s.address,
//     type: s.type,
//     price: s.price,
//     image: s.imageUrl || thumb,
//     datetime: s.datetime,
//     selected: s.selected ?? false,
//   })),
  
// });

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
    // document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, []);

const toIsoString = (datetime: string) => {
  if (!datetime) return "";

  if (datetime.includes("T")) {
    if (/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(datetime)) {
      return `${datetime}:00`;
    }
    return datetime;
  }

  const krMatch = datetime.match(
    /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\([^)]*\)\s*(\d{1,2}):(\d{2})/
  );

  if (krMatch) {
    const [, year, month, day, hour, minute] = krMatch;

    const mm = month.padStart(2, "0");
    const dd = day.padStart(2, "0");
    const hh = hour.padStart(2, "0");

    return `${year}-${mm}-${dd}T${hh}:${minute}:00`;
  }

  const dotMatch = datetime.match(
    /(\d{4})\.\s*(\d{1,2})\.\s*(\d{1,2})\s+(\d{1,2}):(\d{2})/
  );

  if (dotMatch) {
    const [, year, month, day, hour, minute] = dotMatch;

    const mm = month.padStart(2, "0");
    const dd = day.padStart(2, "0");
    const hh = hour.padStart(2, "0");

    return `${year}-${mm}-${dd}T${hh}:${minute}:00`;
  }

  const spaceMatch = datetime.match(
    /(\d{4})-(\d{1,2})-(\d{1,2})\s+(\d{1,2}):(\d{2})/
  );

  if (spaceMatch) {
    const [, year, month, day, hour, minute] = spaceMatch;
    const mm = month.padStart(2, "0");
    const dd = day.padStart(2, "0");
    const hh = hour.padStart(2, "0");

    return `${year}-${mm}-${dd}T${hh}:${minute}:00`;
  }

  console.warn("[WARN] unexpected datetime format:", datetime);
  return datetime;
};

const buildReservationPayloads = () => {
  // console.log("[DEBUG] cartItems in buildReservationPayloads", cartItems);

  const payloads: {
    facilityId: number;
    passId: number;
    startTime: string;
    endTime: string;
  }[] = [];

  for (const pkg of cartItems) {
    for (const s of pkg.sessions || []) {
      if (s.selected && s.datetime) {
        const start = toIsoString(s.datetime);
        const end = start; // 지금은 시작/종료 동일하게

        // console.log(
        //   "[DEBUG] reservation unit",
        //   s.id,
        //   "datetime:",
        //   s.datetime,
        //   "->",
        //   start
        // );

        payloads.push({
          facilityId: s.id, // facilityId
          passId: pkg.id,   // 패키지(pass) ID
          startTime: start,
          endTime: end,
        });
      }
    }
  }

  return payloads;
};


  const [cartItems, setCartItems] = useState<CartItemType[]>([]); // 초기값은 빈 배열
  const [, setLoading] = useState(false);
  const [, setError] = useState<string | null>(null);
  const [summaryTotal, setSummaryTotal] = useState(0);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  useEffect(() => {
    const total = cartItems.reduce((sum, pkg) => {
      const hasSelectedSession = (pkg.sessions || []).some(
        (s) => s.selected && s.datetime
      );
      return hasSelectedSession ? sum + (pkg.price || 0) : sum;
    }, 0);
    setSummaryTotal(total);
  }, [cartItems]);

const handlePay = async () => {
  if (isPaying || summaryTotal <= 0) return;

  try {
    setIsPaying(true);

    // const passIds = reservedPackages.map((pkg) => pkg.id);
    // console.log("[PAY REQUEST]", passIds);

    // const result = await requestPayment(passIds);
    // console.log("[PAY RESULT]", result);

    // 결제 성공이라고 판단되면 여기서 예약 생성
    const reservationPayloads = buildReservationPayloads();
    // console.log("[RESERVATION PAYLOADS]", reservationPayloads);

    await Promise.all(
      reservationPayloads.map((payload) => createReservation(payload))
    );

    // 모달 닫기
    setIsPayModalOpen(false);

    // TODO: 필요하면 장바구니 초기화, 마이페이지로 이동 등 처리
  } catch (e) {
    console.error("결제 또는 예약 생성 실패", e);
  } finally {
    setIsPaying(false);
  }
};

useEffect(() => {
  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);

      const res = await getCartPasses();
      // console.log("[MY PASSES RAW]", res);

      const passes = res.data; // MyPassDto[]

      // 장바구니 아이템으로 변환
      const items: CartItemType[] = passes.map(mapMyPassToCartItem);

      setCartItems(items);

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

  // const reservedSessions = useMemo(() => {
  //   const list: ReservationItemType[] = [];
  //   for (const pkg of cartItems) {
  //     for (const s of pkg.sessions || []) {
  //       if (s.selected && s.datetime) {
  //         const [date, time] = s.datetime.split(" ");
  //         list.push({
  //           id: s.id,
  //           name: s.name,
  //           address: s.address,
  //           image: s.image,
  //           type: s.type,
  //           date,
  //           time,
  //           status: "예약완료",
  //           price: s.price,
  //           category: s.category,
  //         });
  //       }
  //     }
  //   }
  //   return list;
  // }, [cartItems]);

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
    <main style={{overflow: "scroll"}}>
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

          {/* <S.PayWrap> */}
            <S.PayButton
              type="button"
              onClick={() => setIsPayModalOpen(true)}
            >
              결제하기
            </S.PayButton>
          {/* </S.PayWrap> */}

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
    </main>
  );
}
