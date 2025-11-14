import { useMemo, useState } from "react";
import * as I from "./CartItem.style";
import type { CartItemType, SessionItemType } from "./CartPage";
import ReserveModal from "../../components/Modal/ReserveModal";

import checkIcon from "../../assets/double-check.svg";
import rightChevron from "../../assets/chevron-right-dg.svg";
import reservedrop from "../../assets/chevron-down-b.svg";

function formatKRDate(date: Date, timeLabel?: string) {
  const yoil = ["일", "월", "화", "수", "목", "금", "토"][date.getDay()];
  const yyyy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  const hhmm =
    timeLabel ??
    `${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  return `${yyyy}. ${mm}. ${dd}(${yoil}) ${hhmm}`;
}

type ReserveResult = {
  date: Date;
  slot: { id: string; label: string };
};

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: number) => void;
  onUpdateSession: (
    itemId: number,
    sessionId: number,
    patch: Partial<SessionItemType>
  ) => void;
}

export default function CartItem({
  item,
  onRemove,
  onUpdateSession,
}: CartItemProps) {
  const hasSessions = Array.isArray(item.sessions) && item.sessions.length > 0;
  const [open, setOpen] = useState(false);

  // 모든 세션이 시간까지 선택되었는지
  const reservedCount = useMemo(
    () =>
      (item.sessions || []).filter((s) => !!s.selected && !!s.datetime).length,
    [item.sessions]
  );
  const allReserved =
    hasSessions && reservedCount > 0 && reservedCount === item.sessions!.length;

  // '예약 완료' 버튼을 눌러 확정했는지
  const [confirmed, setConfirmed] = useState(false);

  return (
    <I.Box $open={open} $confirmed={confirmed}>
      {/* 상단 헤더 (이미지/제목/가격) - 클릭 시 토글 */}
      <I.Header
        onClick={() => hasSessions && setOpen((v) => !v)}
        role={hasSessions ? "button" : undefined}
        aria-expanded={open}
      >
        <I.ThumbWrap>
          <I.Thumb src={item.image} alt={item.name} />
        </I.ThumbWrap>

        <I.HeaderInfo>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <I.Title>{item.name}</I.Title>
            {item.description && <I.Desc>{item.description}</I.Desc>}
          </div>
          <I.PriceBig>{item.price.toLocaleString()}원</I.PriceBig>
        </I.HeaderInfo>

        <I.RemoveBtn
          type="button"
          aria-label={`${item.name} 삭제`}
          onClick={(e) => {
            e.stopPropagation();
            onRemove(item.id);
          }}
        >
          ×
        </I.RemoveBtn>
      </I.Header>

      {/* 구분선 + 하단 토글 바(매장 예약하기) */}
      {hasSessions && !open && (
        <>
          <I.Divider />
          <I.FooterToggle
            type="button"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <span>{confirmed ? "매장 예약 완료" : "매장 예약하기"}</span>
            <I.CaretIcon $open={open} src={reservedrop} />
          </I.FooterToggle>
        </>
      )}

      {/* 드롭다운 (세부 세션 리스트 + 하단 CTA) */}
      {hasSessions && (
        <I.Dropdown $open={open}>
          <ul>
            {item.sessions!.map((s) => (
              <li key={s.id}>
                <SessionRow
                  session={s}
                  onReserveComplete={({ date, slot }) => {
                    const formatted = formatKRDate(date, slot.label);
                    onUpdateSession(item.id, s.id, {
                      datetime: formatted,
                      selected: true,
                    });
                  }}
                />
              </li>
            ))}
          </ul>

          {/* 모든 세션 선택 → 활성화 / 클릭 시 확정 + 접힘 + 그라데이션 */}
          <I.PrimaryCTA
            type="button"
            disabled={!allReserved}
            onClick={() => {
              if (!allReserved) return;
              setConfirmed(true);
              setOpen(false);
            }}
          >
        예약 완료
          </I.PrimaryCTA>
        </I.Dropdown>
      )}
    </I.Box>
  );
}

function SessionRow({
  session,
  onReserveComplete,
}: {
  session: SessionItemType;
  onReserveComplete: (res: ReserveResult) => void;
}) {
  const [reserveOpen, setReserveOpen] = useState(false);

  const normalized = session.type.replace(/\s{2,}/g, " ").trim();
  const groupMatch = normalized.match(/그룹\s*\([^)]+\)|\d+\s*인/);
  const timeMatch = normalized.match(
    /\d+\s*타임\s*\([^)]+\)|1일권|타임\s*\([^)]+\)/
  );
  const groupText = groupMatch ? groupMatch[0] : "";
  const timeText = timeMatch
    ? timeMatch[0]
    : normalized.replace(groupText, "").trim();

  const reserved = !!session.datetime && !!session.selected;

  return (
    <I.SessRow>
      <I.SessThumb src={session.image} alt={session.name} />

      <I.SessInfo>
        <I.TitleRow>
          <I.Category>{session.category}</I.Category>
          <I.SessTitle>{session.name}</I.SessTitle>
          <I.GoIcon src={rightChevron} />
        </I.TitleRow>

        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <I.Address title={session.address}>{session.address}</I.Address>
          <I.Meta>
            {groupText && <span>{groupText}</span>}
            {timeText && <span>{timeText}</span>}
            <I.SessPrice>{session.price.toLocaleString()}원</I.SessPrice>
          </I.Meta>
        </div>
      </I.SessInfo>

      <I.RightCol>
        {reserved ? (
          <I.DateChip
            // type="button"
            onClick={() => setReserveOpen(true)}
            aria-label="예약 일시 수정"
            title="예약 일시 수정"
          >
            {session.datetime}
            <I.DateChipCheck aria-hidden>
              <img src={checkIcon} alt="확인" />
            </I.DateChipCheck>
          </I.DateChip>
        ) : (
          <I.ReserveBtn type="button" onClick={() => setReserveOpen(true)}>
            예약하기
          </I.ReserveBtn>
        )}
      </I.RightCol>

      <ReserveModal
        open={reserveOpen}
        onClose={() => setReserveOpen(false)}
        onComplete={(payload) => {
          onReserveComplete(payload);
          setReserveOpen(false);
        }}
        placeTitle={session.name}
      />
    </I.SessRow>
  );
}
