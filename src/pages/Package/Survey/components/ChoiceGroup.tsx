import styled from "styled-components";

// 타입 선언
interface BaseProps {
  title: string;
  subtitle?: string;
  options: string[];
}

interface SingleProps extends BaseProps {
  multiple?: false;
  value?: string;
  onChange: (v: string | undefined) => void;
  allowDeselect?: boolean;
}

interface MultiProps extends BaseProps {
  multiple: true;
  value: string[];
  onChange: (v: string[]) => void;
}

type Props = SingleProps | MultiProps;

export default function ChoiceGroup(props: Props) {
  const { title, subtitle, options } = props;

  return (
    <div>
      <Title>{title}</Title>
      {subtitle && <Sub>{subtitle}</Sub>}
      <Row>
        {options.map((opt) => {
          const selected = props.multiple
            ? props.value.includes(opt)
            : (props.value ?? "") === opt;

          const toggle = () => {
            if (props.multiple) {
              const next = selected
                ? (props.value as string[]).filter((v) => v !== opt)
                : [...(props.value as string[]), opt];
              props.onChange(next as never);
            } else {
              const canDeselect = (props as SingleProps).allowDeselect ?? true;
              if (selected && canDeselect)
                (props as SingleProps).onChange(undefined);
              else (props as SingleProps).onChange(opt);
            }
          };

          return (
            <Chip
              key={opt}
              $selected={selected}
              onClick={toggle}
              aria-pressed={selected}
            >
              {opt}
            </Chip>
          );
        })}
      </Row>
    </div>
  );
}

// 스타일
const Title = styled.h3`
  margin: 0 0 6px;
  font-weight: 700;
  font-size: 18px;
`;

const Sub = styled.p`
  margin: 0 0 30px;
  color: ${({ theme }) => theme.colors.gray500};
  font-size: 12px;
`;

const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
`;

// 선택 여부에 따라 색상 동적 변경
const Chip = styled.button<{ $selected: boolean }>`
  padding: 12px 24px;
  border-radius: 15px;
  font-size: 15px;
  font-weight: 500;
  line-height: 1;
  cursor: pointer;
  color: ${({ $selected, theme }) =>
    $selected ? theme.colors.primary : theme.colors.gray600};
  border: 1px solid
    ${({ $selected, theme }) =>
      $selected ? theme.colors.primary : theme.colors.gray400};
  background: ${({ $selected, theme }) =>
    $selected ? theme.colors.gray50 : theme.colors.gray100};
`;
