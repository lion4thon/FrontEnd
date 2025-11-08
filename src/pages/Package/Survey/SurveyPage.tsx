import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSurveyState,
  type SurveyAnswerMap,
  type SurveyKey,
} from "./survey.state";

import { QUESTIONS, PAGE_GROUPS } from "./survey.schema";
import { QuestionRenderer } from "./QuestionRenderer";
import LeftIcon from "../../../assets/chevron-left.svg";
import RightIcon from "../../../assets/chevron-right.svg";
import * as S from "./Survey.styles";

import Dialog, { Btn } from "../../../components/Dialog/Dialog";
import { useSurveyGuard } from "../../../hooks/useSurveyGuard";

import { APP_NAV_EVENT, type AppNavDetail } from "../../../utils/appNav";

// 진행률 바
function SegmentedProgress(props: { segments: number; values: number[] }) {
  const { segments, values } = props;
  return (
    <S.Segments $count={segments}>
      {values.map((v, i) => (
        <S.SegTrack key={i}>
          <S.SegFill $ratio={v} />
        </S.SegTrack>
      ))}
    </S.Segments>
  );
}

// 태그 선택 여부 판단
const isAnsweredValue = (val: unknown): boolean => {
  if (val == null) return false;
  if (Array.isArray(val)) return val.length > 0;
  if (typeof val === "string") return val.trim() !== "";
  if (typeof val === "number") return !Number.isNaN(val);
  if (typeof val === "boolean") return true;
  if (typeof val === "object") {
    const o = val as Record<string, unknown>;
    return Object.values(o).some((v) => isAnsweredValue(v));
  }
  return false;
};

export default function SurveyPage() {
  const { page } = useParams();
  const idx = Math.max(1, Math.min(PAGE_GROUPS.length, Number(page) || 1)) - 1;
  const navigate = useNavigate();

  const { state, setAnswer, clearAnswer } = useSurveyState();
  const group = PAGE_GROUPS[idx];

  const questions = useMemo(
    () =>
      group.keys
        .map((k) => QUESTIONS.find((q) => q.key === k)!)
        .filter(Boolean),
    [group]
  );

  // 각 페이지별 진행률
  const perPageProgress = useMemo(() => {
    return PAGE_GROUPS.map((g) => {
      const total = g.keys.length || 1;
      const answered = g.keys.reduce(
        (acc, k) => acc + (isAnsweredValue(state[k]) ? 1 : 0),
        0
      );
      return answered / total;
    });
  }, [state]);

  // 진행률 = 100% 인지 여부
  const isAllComplete = useMemo(
    () => perPageProgress.every((r) => r >= 1),
    [perPageProgress]
  );

  /** 이 페이지의 “진행 중” 카드 key: 아직 답 안 한 첫 문항 */
  const activeKey = useMemo(() => {
    const firstUnanswered = questions.find(
      (q) => !isAnsweredValue(state[q.key])
    );
    return firstUnanswered?.key ?? null;
  }, [questions, state]);

  // 각 페이지 완료 여부(지표/스타일 용도; 버튼 비활성화엔 사용 안 함)
  // const isPageComplete = questions.every((q) =>
  //   q.required === false ? true : isAnsweredValue(state[q.key])
  // );

  // 페이지 이동은 항상 가능하도록
  const go = (to: number) => navigate(`/package/survey/${to}`);

  const onPrev = () => {
    if (idx > 0) go(idx);
  };

  const onNext = () => {
    if (idx < PAGE_GROUPS.length - 1) {
      go(idx + 2);
    }
  };

  const submit = () => {
    console.log("SUBMIT", state);
    // TODO: 제출 API 연결 시 이곳에서 호출
  };

  // 값 유무에 따라 저장하든 버리든
  const setFor =
    <K extends SurveyKey>(key: K) =>
    (v: SurveyAnswerMap[K] | undefined) => {
      const normalized = isAnsweredValue(v as unknown) ? v : undefined;
      if (normalized === undefined) clearAnswer(key);
      else setAnswer(key, normalized);
    };

  // 문항 번호 계산
  const startNumber = PAGE_GROUPS.slice(0, idx).reduce(
    (acc, g) => acc + g.keys.length,
    0
  );

  // ====== 마지막 페이지 가드/모달 로직 ======
  const isLastPage = idx === PAGE_GROUPS.length - 1;

  const { setDirty, requestExit, confirmExit, cancelExit } = useSurveyGuard();
  const [openIncomplete, setOpenIncomplete] = useState(false);
  const [openComplete, setOpenComplete] = useState(false);

  // 마지막 페이지에서만 창닫기 가드(브라우저 종료/외부 네비 등) 활성화
  useEffect(() => {
    if (!isLastPage) {
      setDirty(false);
      return;
    }
    setDirty(!isAllComplete);
  }, [isLastPage, isAllComplete, setDirty]);

  // 외부 네비(헤더/다른 버튼 등) 시도 수신 → 전체 미완이면 모달
  useEffect(() => {
    const onAppNav = (e: Event) => {
      const { detail } = e as CustomEvent<AppNavDetail>;
      if (!detail?.cb) return;

      if (isLastPage && !isAllComplete) {
        const need = requestExit(detail.cb);
        if (need) setOpenIncomplete(true);
      } else {
        detail.cb();
      }
    };

    window.addEventListener(APP_NAV_EVENT, onAppNav as EventListener);
    return () =>
      window.removeEventListener(APP_NAV_EVENT, onAppNav as EventListener);
  }, [isLastPage, isAllComplete, requestExit]);

  // 진행률 100% 다 차야 제출하기 성공
  const onSubmitGuarded = () => {
    if (!isLastPage) return;
    if (!isAllComplete) setOpenIncomplete(true);
    else setOpenComplete(true);
  };

  const onExitAnyway = () => {
    setOpenIncomplete(false);
    confirmExit(); // 외부 네비 실제 실행
  };
  const onCancelExit = () => {
    setOpenIncomplete(false);
    cancelExit();
  };

  const onConfirmComplete = () => {
    submit();
    setDirty(false);
    setOpenComplete(false);
    navigate("/package/survey/done"); // 완료 페이지로 이동
  };

  return (
    <S.Page>
      <S.Header>
        <S.Title>
          <h1>
            어떤 운동을 시작해야 할지 막막한 산초님,
            <br />
            간단한 설문을 통해 산초님께 딱 맞는 패키지를 추천해 드려요!
          </h1>
        </S.Title>
        <SegmentedProgress
          segments={PAGE_GROUPS.length}
          values={perPageProgress}
        />
      </S.Header>

      <S.Section>
        {questions.map((q, i) => {
          const completed = isAnsweredValue(state[q.key]);
          const active = q.key === activeKey;
          return (
            <S.Card key={q.key} $active={active} $completed={completed}>
              <S.Number>{startNumber + i + 1}</S.Number>
              <QuestionRenderer
                q={q as never}
                value={state[q.key] as never}
                onChange={setFor(q.key) as never}
              />
            </S.Card>
          );
        })}
      </S.Section>

      <S.Footer>
        <S.NavBtn disabled={idx === 0} onClick={onPrev}>
          <img src={LeftIcon} alt="이전" style={{ marginRight: 8 }} />
          이전 페이지
        </S.NavBtn>

        {isLastPage ? (
          <S.NavBtn onClick={onSubmitGuarded}>제출하기</S.NavBtn>
        ) : (
          <S.NavBtn onClick={onNext}>
            <>
              다음 페이지
              <img src={RightIcon} alt="다음" style={{ marginLeft: 8 }} />
            </>
          </S.NavBtn>
        )}
      </S.Footer>

      {/* 미완료 컨펌 모달 */}
      <Dialog
        open={openIncomplete}
        onClose={onCancelExit}
        labelledById="incomplete-title"
        actions={
          <>
            <Btn variant="primary" onClick={onCancelExit}>
              설문 종료하고 나가기
            </Btn>
            <Btn variant="secondary" onClick={onExitAnyway}>
              설문 계속 진행하기
            </Btn>
          </>
        }
      >
        <span
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#596072",
            fontWeight: 500,
            padding: "50px 0",
          }}
        >
          아직 설문이 완료되지 않았어요.
          <br />
          설문을 종료하시겠어요?
        </span>
      </Dialog>

      {/* 제출 완료 모달 */}
      <Dialog
        open={openComplete}
        onClose={onConfirmComplete}
        labelledById="complete-title"
        actions={
          <Btn variant="primary" onClick={onConfirmComplete}>
            AI추천 패키지 확인하기
          </Btn>
        }
      >
        <span
          style={{
            display: "block",
            textAlign: "center",
            fontSize: "16px",
            lineHeight: "1.7",
            color: "#596072",
            fontWeight: 500,
            padding: "50px 0",
          }}
        >
          설문 제출이 완료되었습니다.
          <br />
          산초님만을 위한 AI추천 패키지를 준비해드릴게요!
        </span>
      </Dialog>
    </S.Page>
  );
}
