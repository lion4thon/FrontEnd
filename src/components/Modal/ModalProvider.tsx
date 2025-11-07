/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type { ReactNode } from "react";
import { createPortal } from "react-dom";
import ModalRoot from "./ModalRoot";
import type { ModalID, ModalPropsMap, ModalStackItem } from "./types";
import { registry } from "./registry";

/** 컨텍스트로 외부에 제공할 모달 제어 API 타입 */
type Ctx = {
  /** 모달 열기: 항상 하나만 유지(있으면 교체) */
  open: <K extends ModalID>(id: K, props?: ModalPropsMap[K]) => void;
  /** 현재 모달 닫기 */
  close: () => void;
  /** 현재 열린 모달(없으면 null) */
  current: ModalStackItem | null;
};

/** 전역 모달 컨텍스트 */
export const ModalContext = createContext<Ctx | null>(null);

export default function ModalProvider({ children }: { children: ReactNode }) {
  /** 현재 열린 모달(단일) */
  const [current, setCurrent] = useState<ModalStackItem | null>(null);

  /** 포털을 꽂아둘 루트 DOM */
  const portalRef = useRef<HTMLElement | null>(null);

  /** 스크롤락 해제용으로 기존 overflow 값을 보관 */
  const bodyOverflowRef = useRef<string | null>(null);

  // 포털 루트 준비(최초 1회)
  useEffect(() => {
    let el = document.getElementById("modal-portal-root");
    if (!el) {
      el = document.createElement("div");
      el.id = "modal-portal-root";
      document.body.appendChild(el);
    }
    portalRef.current = el as HTMLElement;
  }, []);

  // 모달 열릴 때 페이지 스크롤 잠그고, 닫히면 원복
  useEffect(() => {
    if (current) {
      bodyOverflowRef.current = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    } else if (bodyOverflowRef.current !== null) {
      document.body.style.overflow = bodyOverflowRef.current;
      bodyOverflowRef.current = null;
    }
  }, [current]);

  // 모달 열기(항상 하나만 유지 → 기존 것을 교체)
  const open = useCallback(
    <K extends ModalID>(id: K, props?: ModalPropsMap[K]) => {
      setCurrent({
        id,
        props: (props ?? {}) as ModalPropsMap[K],
        key: `${id}-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      });
    },
    []
  );

  // 모달 닫기
  const close = useCallback(() => setCurrent(null), []);

  // 컨텍스트 값 메모
  const ctx = useMemo(() => ({ open, close, current }), [open, close, current]);

  return (
    <ModalContext.Provider value={ctx}>
      {children}
      {portalRef.current &&
        createPortal(
          <ModalRoot
            current={current}
            registry={registry}
            onRequestClose={close}
          />,
          portalRef.current
        )}
    </ModalContext.Provider>
  );
}
