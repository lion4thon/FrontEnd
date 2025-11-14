import styled from "styled-components";

export type MonthCalendarProps = {
  year: number;
  month: number;
  selected?: Date | null;
  minDate?: Date;
  maxDate?: Date;
  onSelect: (d: Date) => void;
  onMoveMonth?: (delta: number) => void;
};

export default function MonthCalendar({
  year,
  month,
  selected,
  minDate,
  maxDate,
  onSelect,
  onMoveMonth,
}: MonthCalendarProps) {
  const first = new Date(year, month, 1);
  const dim = new Date(year, month + 1, 0).getDate();
  const startWd = first.getDay();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const cells: {
    d: Date;
    inMonth: boolean;
    disabled: boolean;
    isToday: boolean;
  }[] = [];
  const prevLast = new Date(year, month, 0).getDate();

  const _min = minDate ? startOfDay(minDate) : undefined;
  const _max = maxDate ? endOfDay(maxDate) : undefined;

  // prev fillers
  for (let i = startWd - 1; i >= 0; i--) {
    const d = new Date(year, month - 1, prevLast - i);
    cells.push({
      d,
      inMonth: false,
      disabled: true,
      isToday: isSameDate(d, today),
    });
  }

  // current
  for (let day = 1; day <= dim; day++) {
    const d = new Date(year, month, day);
    const disabled = (_min ? d < _min : false) || (_max ? d > _max : false);
    cells.push({ d, inMonth: true, disabled, isToday: isSameDate(d, today) });
  }
  // next fillers → 42 cells
  while (cells.length < 42) {
    const idx = cells.length - (startWd + dim) + 1;
    const d = new Date(year, month + 1, idx);
    cells.push({
      d,
      inMonth: false,
      disabled: true,
      isToday: isSameDate(d, today),
    });
  }

  return (
    <Card>
      <Top>
        <Nav type="button" aria-label="이전 달" onClick={() => onMoveMonth?.(-1)}>
          ‹
        </Nav>
        <Title>
          {year}. {String(month + 1).padStart(2, "0")}
        </Title>
        <Nav type="button" aria-label="다음 달" onClick={() => onMoveMonth?.(1)}>
          ›
        </Nav>
      </Top>

      <Week>
        {["일", "월", "화", "수", "목", "금", "토"].map((w) => (
          <span key={w}>{w}</span>
        ))}
      </Week>

      <Grid role="grid" aria-label="달력">
        {cells.map((c, i) => {
          const sel = !!selected && c.inMonth && isSameDate(c.d, selected);
          return (
            <Cell key={i} $selected={sel} $inMonth={c.inMonth} $disabled={c.disabled} $today={c.isToday}>
              <button
                type="button"
                disabled={c.disabled || !c.inMonth}
                onClick={() => {
                  if (c.disabled || !c.inMonth) return;
                  const d = new Date(c.d);
                  d.setHours(0, 0, 0, 0);
                  onSelect(d);
                }}
                aria-label={`${fmtDate(c.d)}${c.disabled ? " (선택 불가)" : ""}`}
                aria-selected={sel}
              >
                {c.d.getDate()}
              </button>
            </Cell>
          );
        })}
      </Grid>
    </Card>
  );
}

// 스타일
const Card = styled.div`
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 12px;
  padding: 12px;
`;

const Top = styled.div`
  display: grid;
  grid-template-columns: 40px 1fr 40px;
  align-items: center;
  margin-bottom: 6px;
`;

const Title = styled.h3`
  text-align: center;
  font-size: 16px;
  font-weight: 700;
  margin: 0;
`;

const Nav = styled.button`
  height: 34px;
  font-size: 25px;
  margin-top: -10px;
  padding: 0 0 5px 0;
`;

const Week = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  margin-bottom: 4px;
  span {
    text-align: center;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.gray400};
    padding: 4px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 6px;
`;

const Cell = styled.div<{
  $selected: boolean;
  $inMonth: boolean;
  $disabled: boolean;
  $today: boolean;
}>`
  button {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 10px;
    border: 1px solid
      ${({ $selected, $today }) =>
        $selected ? "rgba(67,104,255,.9)" : $today ? "rgba(67,104,255,.35)" : "rgba(0,0,0,0.06)"};
    background: ${({ $selected }) => ($selected ? "rgba(67,104,255,.08)" : "#fff")};
    color: ${({ $inMonth, $disabled }) => (!$inMonth || $disabled ? "rgba(0,0,0,0.35)" : "inherit")};
    font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
    text-align: center;
  }
`;

/* utils */
function isSameDate(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
}
function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}
function endOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(23, 59, 59, 999);
  return x;
}
function fmtDate(d: Date) {
  const w = ["일", "월", "화", "수", "목", "금", "토"][d.getDay()];
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  return `${mm}/${dd}(${w})`;
}
