import ChoiceGroup from "./components/ChoiceGroup";

import type {
  QuestionSchema,
  SurveyAnswerMap,
  SurveyKey,
  SingleKey,
  MultiKey,
} from "./survey.state";

function isSingle(
  q: QuestionSchema
): q is Extract<QuestionSchema, { kind: "single" }> {
  return q.kind === "single";
}

function isMulti(
  q: QuestionSchema
): q is Extract<QuestionSchema, { kind: "multi" }> {
  return q.kind === "multi";
}

interface BaseProps<K extends SurveyKey> {
  q: Extract<QuestionSchema, { key: K }>;
  value: SurveyAnswerMap[K] | undefined;
  onChange: (v: SurveyAnswerMap[K] | undefined) => void;
}

export function QuestionRenderer(
  props: BaseProps<SingleKey> | BaseProps<MultiKey>
) {
  const { q } = props as { q: QuestionSchema };

  if (isSingle(q)) {
    const p = props as BaseProps<SingleKey>;
    return (
      <ChoiceGroup
        title={q.title}
        subtitle={q.subtitle}
        multiple={false}
        options={q.options}
        value={p.value as string | undefined}
        onChange={(v) => p.onChange(v as string | undefined)}
        allowDeselect
      />
    );
  }

  if (isMulti(q)) {
    const p = props as BaseProps<MultiKey>;
    return (
      <ChoiceGroup
        title={q.title}
        subtitle={q.subtitle}
        multiple
        options={q.options}
        value={(p.value as string[] | undefined) ?? []}
        onChange={(v) => p.onChange(v as string[])}
      />
    );
  }

  return null;
}
