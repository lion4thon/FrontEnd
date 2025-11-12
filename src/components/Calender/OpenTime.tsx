import styled from "styled-components";

export type Slot = { id: string; label: string };

export type TimeSlotGridProps = {
  slots: Slot[];
  selected?: Slot | null;
  disabledChecker?: (s: Slot) => boolean;
  onSelect: (s: Slot) => void;
};

export default function TimeSlotGrid({
  slots,
  selected,
  disabledChecker,
  onSelect,
}: TimeSlotGridProps) {
  return (
    <Wrap>
      {slots.map((s) => {
        const dis = disabledChecker ? disabledChecker(s) : false;
        const sel = !!selected && selected.id === s.id && !dis;
        return (
          <Btn
            key={s.id}
            type="button"
            disabled={dis}
            $selected={sel}
            onClick={() => !dis && onSelect(s)}
            aria-pressed={sel}
          >
            {s.label}
          </Btn>
        );
      })}
    </Wrap>
  );
}

// 스타일
const Wrap = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 8px;
`;

const Btn = styled.button<{ $selected: boolean }>`
  text-align: center;
  border-radius: 28px;
  border: 1px solid
    ${({ $selected }) => ($selected ? "rgba(67, 104, 255, .9)" : "#7d818e")};
  background: ${({ $selected }) =>
    $selected ? "rgba(67, 104, 255, .08)" : "#fff"};
  color: ${({ $selected }) => ($selected ? "#4368ff" : "#2c2f36")};
  font-weight: 400;
  font-size: 15px;
  padding: 8px 18px;
  &:disabled {
    opacity: 0.35;
    text-decoration: line-through;
    cursor: not-allowed;
  }
`;
