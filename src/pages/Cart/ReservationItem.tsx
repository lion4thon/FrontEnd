import styled from "styled-components";
import type { ReservationItemType } from "./CartPage";

/** "그룹 (4인)  1타임 (60분)" -> ["그룹 (4인)", "1타임 (60분)"] */
function splitTypeLabel(typeLabel: string): [string, string] {
  const normalized = typeLabel.replace(/\s{2,}/g, " ").trim();
  const groupMatch = normalized.match(/그룹\s*\([^)]+\)|\d+\s*인/);
  const timeMatch = normalized.match(
    /\d+\s*타임\s*\([^)]+\)|1일권|타임\s*\([^)]+\)/
  );
  const group = groupMatch ? groupMatch[0] : "";
  const time = timeMatch ? timeMatch[0] : normalized.replace(group, "").trim();
  return [group, time];
}

interface Props {
  item: ReservationItemType;
}

export default function ReservationItem({ item }: Props) {
  const [groupText, timeText] = splitTypeLabel(item.type);

  return (
    <Box>
      <Thumb src={item.image} alt={item.name} />
      <Info>
        <Top>
          <Title>{item.name}</Title>
          <Status $state={item.status}>{item.status}</Status>
        </Top>

        <Row>
          <Address title={item.address}>{item.address}</Address>
        </Row>

        <Bottom>
          <Meta>
            {groupText && <span>{groupText}</span>}
            {timeText && <span>{timeText}</span>}
            <span>{item.date}</span>
            <span>{item.time}</span>
          </Meta>
          <Price>{item.price.toLocaleString()}원</Price>
        </Bottom>
      </Info>
    </Box>
  );
}

/* ---- styles ---- */

const Box = styled.div`
  display: flex;
  gap: 12px;
  padding: 12px;
  border: 1px solid #dbe1f3;
  border-radius: 12px;
  background: #fff;
`;

const Thumb = styled.img`
  width: 56px;
  height: 56px;
  object-fit: cover;
  border-radius: 10px;
`;

const Info = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h4`
  font-size: 14px;
  font-weight: 700;
  color: #151a2b;
`;

const Status = styled.span<{ $state: "예약완료" | "이용완료" | "취소됨" }>`
  display: inline-flex;
  align-items: center;
  height: 22px;
  padding: 0 8px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 800;
  color: ${({ $state }) =>
    $state === "취소됨"
      ? "#842029"
      : $state === "이용완료"
      ? "#0f5132"
      : "#0b5ed7"};
  background: ${({ $state }) =>
    $state === "취소됨"
      ? "rgba(220,53,69,0.12)"
      : $state === "이용완료"
      ? "rgba(25,135,84,0.12)"
      : "rgba(13,110,253,0.12)"};
  border: 1px solid
    ${({ $state }) =>
      $state === "취소됨"
        ? "rgba(220,53,69,0.35)"
        : $state === "이용완료"
        ? "rgba(25,135,84,0.35)"
        : "rgba(13,110,253,0.35)"};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Address = styled.p`
  flex: 1;
  min-width: 0;
  font-size: 12px;
  color: #6a7288;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Bottom = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Meta = styled.div`
  display: flex;
  gap: 10px;
  font-size: 12px;
  color: #7d869c;
`;

const Price = styled.strong`
  font-weight: 800;
  color: #151a2b;
`;
