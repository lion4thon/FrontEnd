import { useEffect, useMemo, useState } from "react";
import { api } from "../../../lib/api";
import { useNavigate, useParams } from "react-router-dom";
import {
  useSurveyState,
  type SurveyAnswerMap,
  type SurveyKey,
} from "./survey.state";

import {
  getAiRecommendations,
  type AiRecommendationRequest,
  type AiRecommendationResponse,
} from "./apis/aiRecommendations";

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

//   const submit = async () => {
//   const interestIds = (state.interest ?? [])
//     .map((v) => Number(v))
//     .filter((n) => !Number.isNaN(n)); // NaN 제거

//   const payload = {
//     purpose: state.goal ?? "",
//     preferredTime: state.time ?? "",
//     price: 50000,
//     preferredIntensity: state.intensity ?? "",
//     recoveryCondition: state.recovery ?? "",
//     preferredEnvironment: state.env ?? "",
//     timeRange: state.moveTime ?? "",
//     avoidFactors: state.risk ?? [],
//     interestedSportIds: interestIds,  // 여기로 교체
//   };

//   console.log("SUBMIT payload", payload);
//   console.log("POST URL", api.defaults.baseURL, "/api/survey");

//   const res = await api.post("/api/survey", payload);
//   return res.data;
// };

const submit = async () => {
  // 1) 관심 운동 종목 id 리스트
  const interestIds = (state.interest ?? [])
    .map((v) => Number(v))
    .filter((n) => !Number.isNaN(n));

  // 2) 설문 저장용 payload (/api/survey)
  const surveyPayload = {
    purpose: state.goal ?? "",
    preferredTime: state.time ?? "",
    price: 50000,
    preferredIntensity: state.intensity ?? "",
    recoveryCondition: state.recovery ?? "",
    preferredEnvironment: state.env ?? "",
    timeRange: state.moveTime ?? "",
    avoidFactors: state.risk ?? [],
    interestedSportIds: interestIds,
  };

  console.log("[SURVEY PAYLOAD]", surveyPayload);
  console.log("[SURVEY URL]", api.defaults.baseURL, "/api/survey");

  // 설문 내용 저장
  await api.post("/api/survey", surveyPayload);

  // 3) AI 추천용 payload (/api/ai/recommendations)
  const aiPayload: AiRecommendationRequest = {
    purpose: surveyPayload.purpose,
    preferred_time: surveyPayload.preferredTime,
    preferred_intensity: surveyPayload.preferredIntensity,
    travel_time: surveyPayload.timeRange,
    environment: surveyPayload.preferredEnvironment,
    preferred_sports: (state.interest ?? []).map(String),
    recovery_level: surveyPayload.recoveryCondition,
    // budget_range: String(surveyPayload.price),
    budget_range: String(surveyPayload.price),
    avoid_factors: surveyPayload.avoidFactors,
  };

  console.log("[AI PAYLOAD]", aiPayload);
  console.log("[AI URL]", api.defaults.baseURL, "/api/ai/recommendations");


  // AI 추천 패키지 조회
  // const aiResult = await getAiRecommendations(aiPayload);
  // console.log("[AI RESULT]", aiResult);
  // return aiResult; 

  // AI 추천 패키지 조회
let aiResult: AiRecommendationResponse;

try {
  aiResult = await getAiRecommendations(aiPayload);
  console.log("[AI RESULT]", aiResult);
} catch (error) {
  console.error("[AI ERROR] 실제 AI 호출 실패, 목 데이터로 대체합니다.", error);
  aiResult = MOCK_AI_RESULT;
}

return aiResult;
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

  // const onConfirmComplete = async () => {
  //   try {
  //     await submit();
  //     // data.surveyId 등이 있을 경우, 필요 시 아래 navigate에 쿼리로 넘길 수 있음
  //     setDirty(false);
  //     setOpenComplete(false);
  //     // ------------------------------------------------------------------
  //     //  api 설계 끝나면 나중에 수정해야함 !!!!
  //     navigate("/package");
  //     // ------------------------------------------------------------------
  //   } catch (e) {
  //     console.error("설문 제출 실패", e);
  //     // TODO: 에러 토스트/모달로 교체 가능
  //     alert("설문 제출 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
  //   }
  // };

  const onConfirmComplete = async () => {
  try {
    // 설문 저장 + AI 추천까지 한 번에
    const aiResult = await submit();

    setDirty(false);
    setOpenComplete(false);

    // 필요하다면 추천 리스트를 /package로 같이 넘겨주기
    navigate("/package", {
      state: {
        aiRecommendations: aiResult.recommendations,
        aiTotalCount: aiResult.total_count,
      },
    });
  } catch (e) {
    console.error("설문 제출 실패", e);
    alert("설문 제출 중 오류가 발생했어요. 잠시 후 다시 시도해주세요.");
    setOpenComplete(false);
  }
};

  return (
    <S.Page >
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
        backdropClosable
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
        backdropClosable
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


const MOCK_AI_RESULT: AiRecommendationResponse = {
   "recommendations": [
            {
                "name": "즐거운 운동 (풋살1회+댄스1회)",
                "price": 26000,
                "intensity": "MID",
                "pass_id": 20,
                "purposeTag": "STRESS_RELIEF",
                "predicted_score": 14.817466698049722,
                "image_url": "https://plus.unsplash.com/premium_photo-1726254136091-57392c67e442?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "name": "전신 운동 콤보 (클라이밍1회+수영1회)",
                "price": 31000,
                "intensity": "HIGH",
                "pass_id": 18,
                "purposeTag": "FITNESS",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1560088971-123158b94b34?q=80&w=1738&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "name": "헬린이 기초 체력 패키지 (헬스 2회 + PT 1회)",
                "price": 35000,
                "intensity": "MID",
                "pass_id": 38,
                "purposeTag": "FITNESS",
                "predicted_score": 14.817466698049722,
                "image_url": "https://plus.unsplash.com/premium_photo-1670505062582-fdaa83c23c9e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fCVFRCU5NyVBQyVFQyU4QSVBNCVFQyU5RSVBNXxlbnwwfHwwfHx8MA%3D%3D"
            },
            {
                "name": "헬린이 스타터 팩 (헬스 1회 + PT 1회)",
                "price": 29000,
                "intensity": "LOW",
                "pass_id": 37,
                "purposeTag": "FITNESS",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVEJTk3JUFDJUVDJThBJUE0JUVDJTlFJUE1fGVufDB8fDB8fHww"
            },
            {
                "name": "요가 입문자 스타터 팩 (요가 1회)",
                "price": 27000,
                "intensity": "LOW",
                "pass_id": 43,
                "purposeTag": "STRESS_RELIEF",
                "predicted_score": 14.817466698049722,
                "image_url": "https://plus.unsplash.com/premium_photo-1661777196224-bfda51e61cfd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8JUVDJTlBJTk0JUVBJUIwJTgwfGVufDB8fDB8fHww"
            },
            {
                "name": "구기 종목 탐험 (테니스1회+풋살1회)",
                "price": 30000,
                "intensity": "MID",
                "pass_id": 29,
                "purposeTag": "EXPLORE",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1541744573515-478c959628a0?q=80&w=1035&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "name": "요가 입문자 기초 패키지 (요가 2회)",
                "price": 33000,
                "intensity": "LOW",
                "pass_id": 44,
                "purposeTag": "STRESS_RELIEF",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8JUVDJTlBJTk0JUVBJUIwJTgwfGVufDB8fDB8fHww"
            },
            {
                "name": "지방 연소 (댄스1회+수영1회)",
                "price": 31000,
                "intensity": "MID",
                "pass_id": 27,
                "purposeTag": "DIET",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1616711854228-28b39ad7eb80?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            },
            {
                "name": "요가 입문자 종합 프로그램 (요가 2회 + 필라테스 1회)",
                "price": 39000,
                "intensity": "MID",
                "pass_id": 45,
                "purposeTag": "FITNESS",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1717500252573-d31d4bf5ddf1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8JUVEJTk1JTg0JUVCJTlEJUJDJUVEJTg1JThDJUVDJThBJUE0fGVufDB8fDB8fHww"
            },
            {
                "name": "새로운 도전 (풋살1회+클라이밍1회)",
                "price": 24000,
                "intensity": "MID",
                "pass_id": 25,
                "purposeTag": "EXPLORE",
                "predicted_score": 14.817466698049722,
                "image_url": "https://images.unsplash.com/photo-1658678921674-dc4943b10dee?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
        ],
        "total_count": 10
};