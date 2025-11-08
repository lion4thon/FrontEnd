import { useCallback, useEffect, useRef, useState } from "react";

/** 미완 상태에서 이탈/닫기/뒤로가기 방지 훅 */
export function useSurveyGuard() {
  const [dirty, setDirty] = useState(false); // 미완이면 true
  const pendingRef = useRef<null | (() => void)>(null);

  // 창/탭 닫기 가드
  useEffect(() => {
    const onBefore = (e: BeforeUnloadEvent) => {
      if (!dirty) return;
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", onBefore);
    return () => window.removeEventListener("beforeunload", onBefore);
  }, [dirty]);

  /** 외부가 “나가기” 시도했을 때 호출. 확인 모달 필요하면 true 반환 */
  const requestExit = useCallback(
    (onConfirmExit: () => void) => {
      if (dirty) {
        pendingRef.current = onConfirmExit;
        return true;
      }
      onConfirmExit();
      return false;
    },
    [dirty]
  );

  const confirmExit = useCallback(() => {
    pendingRef.current?.();
    pendingRef.current = null;
  }, []);
  const cancelExit = useCallback(() => {
    pendingRef.current = null;
  }, []);

  return { dirty, setDirty, requestExit, confirmExit, cancelExit };
}
