import { useContext } from "react";
import { ModalContext } from "../components/Modal/ModalProvider";
import type { ModalID, ModalPropsMap } from "../components/Modal/types";

/** 모달 컨텍스트 전체 접근(열기/닫기/현재 상태) */
export function useModal() {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error(
      "useModal 훅은 <ModalProvider> 내부에서만 사용할 수 있습니다."
    );
  return ctx;
}

/** 모달 열기 전용 훅 (id, props 전달) */
export function useOpenModal<K extends ModalID>() {
  const { open } = useModal();
  return (id: K, props?: ModalPropsMap[K]) =>
    open(id, props as ModalPropsMap[K]);
}

/** 현재 모달 닫기 전용 훅 */
export function useCloseModal() {
  const { close } = useModal();
  return close;
}
