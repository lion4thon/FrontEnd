import { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import Dialog from "../Dialog/Dialog";
import MonthCalendar from "../Calender/MonthCalender";
import TimeSlotGrid from "../Calender/OpenTime";
import type { Slot } from "../Calender/OpenTime";

type Props = {
  open: boolean;
  onClose: () => void;
  placeTitle?: string;
  placeCategory?: string;
  onComplete?: (p: { date: Date; slot: Slot }) => void;
  slots?: Slot[];
  availableFrom?: Date;
  availableTo?: Date;
};

const makeDefaultSlots = (): Slot[] => {
  const arr: Slot[] = [];
  for (let h = 9; h <= 21; h++) {
    const hh = String(h).padStart(2, "0");
    arr.push({ id: `${hh}:00`, label: `${hh}:00` });
  }
  return arr;
};

const toMinutes = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

export default function ReserveCalendarModal({
  open,
  onClose,
  placeTitle = "[필라테스] XX 필라테스점",
  placeCategory = "필라테스",
  onComplete,
  slots,
  availableFrom,
  availableTo,
}: Props) {
  const now = useMemo(() => {
    const d = new Date();
    d.setSeconds(0, 0);
    return d;
  }, []);

  const minDate = useMemo(() => {
    const d = new Date(availableFrom ?? now);
    d.setHours(0, 0, 0, 0);
    return d;
  }, [availableFrom, now]);

  const maxDate = useMemo(
    () =>
      availableTo ??
      new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate() + 60,
        23,
        59,
        59,
        999
      ),
    [availableTo, now]
  );

  const hourSlots = useMemo(() => slots ?? makeDefaultSlots(), [slots]);

  const [view, setView] = useState(() => {
    const base = new Date(Math.max(minDate.getTime(), now.getTime()));
    return { y: base.getFullYear(), m: base.getMonth() };
  });

  const [date, setDate] = useState<Date | null>(null);
  const [slot, setSlot] = useState<Slot | null>(null);

  useEffect(() => {
    if (open) {
      setDate(null);
      setSlot(null);
      const b = new Date(Math.max(minDate.getTime(), now.getTime()));
      setView({ y: b.getFullYear(), m: b.getMonth() });
    }
  }, [open, minDate, now]);

  const isSlotDisabled = (s: Slot) => {
    if (!date) return true;
    const isToday = sameDate(date, now);
    return (
      isToday &&
      toMinutes(s.label) <=
        toMinutes(
          `${String(now.getHours()).padStart(2, "0")}:${String(
            now.getMinutes()
          ).padStart(2, "0")}`
        )
    );
  };

  const canSubmit = !!date && !!slot && !isSlotDisabled(slot);

  const handleComplete = () => {
    if (!canSubmit || !date || !slot) return;
    onComplete?.({ date, slot });
    onClose();
  };

  const summaryText =
    date && slot
      ? `${fmtDot(date)} ${slot.label}`
      : "날짜와 시간을 선택해 주세요";

  return (
    <Dialog open={open} onClose={onClose} labelledById="reserve-title">
      <Wrap>
        {/* 헤더 */}
        <HeaderRow>
          <HeaderLeft>
            <CategoryBadge>{placeCategory ?? "필라테스"}</CategoryBadge>
            <HeaderTitle id="reserve-title">{placeTitle}</HeaderTitle>
          </HeaderLeft>
          <CloseBtn type="button" aria-label="닫기" onClick={onClose}>
            ×
          </CloseBtn>
        </HeaderRow>

        {/* 날짜 */}
        <SectionTitle>날짜</SectionTitle>
        <Col>
          <MonthCalendar
            year={view.y}
            month={view.m}
            selected={date ?? undefined}
            minDate={minDate}
            maxDate={maxDate}
            onSelect={(d) => {
              setDate(d);
              setSlot(null);
            }}
            onMoveMonth={(delta) =>
              setView(({ y, m }) => {
                const n = new Date(y, m + delta, 1);
                return { y: n.getFullYear(), m: n.getMonth() };
              })
            }
          />
        </Col>

        {/* 시간 */}
        <Col>
          <Sub>시간</Sub>
          <TimeSlotGrid
            slots={hourSlots}
            selected={slot}
            disabledChecker={isSlotDisabled}
            onSelect={setSlot}
          />
        </Col>

        <StickyFooter>
          <SummaryText $dim={!date || !slot}>{summaryText}</SummaryText>
          <PrimaryBtn onClick={handleComplete} disabled={!canSubmit}>
            예약 완료
          </PrimaryBtn>
        </StickyFooter>
      </Wrap>
    </Dialog>
  );
}

// 스타일
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 14px;

  /* 모달 내부 스크롤 컨테이너 */
  max-height: 70vh;
  overflow-y: auto;
  box-sizing: border-box;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: #c4c9d7;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #a9afc2;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0 0 12px;
`;

const HeaderLeft = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 6px;
  padding: 10px;
`;

const CategoryBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  border: 1px solid #4a63ff;
  border-radius: 999px;
  color: #4a63ff;
  font-weight: 600;
  font-size: 13px;
`;

const HeaderTitle = styled.h2`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  color: #151a2b;
  line-height: 1.4;
`;

const CloseBtn = styled.button`
  flex: 0 0 auto;
  width: 32px;
  height: 32px;
  border: 0;
  border-radius: 50%;
  background: transparent;
  color: #7a8195;
  font-size: 22px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: filter 0.15s ease;

  &:hover {
    filter: brightness(0.9);
  }
`;

const SectionTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
  color: #2c2f36;
  margin: 6px 0 0;
  padding-left: 10px;
`;

const Col = styled.div`
  display: grid;
  gap: 10px;
`;

const Sub = styled.h4`
  margin: 0;
  font-weight: 600;
  font-size: 16px;
  color: #2c2f36;
  padding-left: 10px;
`;

const StickyFooter = styled.div`
  position: sticky;
  bottom: 0;

  /* 모달 본문 좌우 패딩이 24px일 때 풀블리드로 보이게 */
  margin: 0 -24px;
  padding: 10px 24px 16px;

  background: #fff;
  border-top: 1px solid #e6e9f0;

  display: grid;
  gap: 12px;
`;

const SummaryText = styled.p<{ $dim: boolean }>`
  margin: 0;
  font-weight: 700;
  font-size: 26px;
  line-height: 1.2;
  letter-spacing: -0.2px;
  padding: 8px 0 8px 5px;
  color: ${({ $dim }) => ($dim ? "#2c2f36" : "#242934")};
`;

const PrimaryBtn = styled.button<{ disabled?: boolean }>`
  height: 56px;
  width: 100%;
  border: 0;
  border-radius: 20px;
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: #fff;
  background: ${({ disabled }) => (disabled ? "#9fb0ff" : "#4a63ff")};
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  transition: filter 0.15s ease;
  &:hover {
    filter: ${({ disabled }) => (disabled ? "none" : "brightness(0.98)")};
  }
`;

// utils
function sameDate(a: Date, b: Date) {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function fmtDot(d: Date) {
  const w = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}.${dd}(${w})`;
}
