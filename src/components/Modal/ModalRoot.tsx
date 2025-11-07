import React from "react";
import type { ModalRegistry, ModalStackItem, ModalPropsMap } from "./types";
import BaseModal from "./BaseModal/BaseModal";

interface ModalRootProps {
  /** 현재 열린 모달(없으면 null) */
  current: ModalStackItem | null;
  /** ID → 컴포넌트 매핑 테이블 */
  registry: ModalRegistry;
  /** 닫기 요청 (X 버튼 등) */
  onRequestClose: () => void;
}

/**
 * ModalRoot
 * - 단일 모달만 렌더링
 * - ESC 닫기 없음, 백드롭 클릭 닫기 기본 비활성
 */
export default function ModalRoot({
  current,
  registry,
  onRequestClose,
}: ModalRootProps) {
  if (!current) return null;

  const { id, props, key } = current;

  // 레지스트리에서 컴포넌트 찾기 (TS 추론 한계 보완: unknown → 정확 타입으로 캐스팅; any 사용 안 함)
  const ModalComponent = registry[id] as unknown as React.ComponentType<
    ModalPropsMap[typeof id] & { __close: () => void }
  >;

  return (
    <BaseModal
      key={key}
      onClose={onRequestClose}
      labelledBy={`${id}-title`}
      backdropClosable={false}
    >
      <ModalComponent {...props} __close={onRequestClose} />
    </BaseModal>
  );
}
