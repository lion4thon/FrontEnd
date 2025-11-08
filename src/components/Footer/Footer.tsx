import { memo } from "react";
import * as S from "./Footer.style";
import Logo from "../../assets/MOV_footer.svg";

type LinkItem = { label: string; to: string };
type Column = { title: string; items: LinkItem[] };

const COLUMNS: Column[] = [
  {
    title: "패키지",
    items: [{ label: "둘러보기", to: "/packages" }],
  },
  {
    title: "생성",
    items: [
      { label: "패키지 생성", to: "/create" },
      { label: "설문 시작하기", to: "/survey/start" },
      { label: "AI 추천받기", to: "/recommend" },
      { label: "링크 열", to: "/links" },
    ],
  },
  {
    title: "패스",
    items: [
      { label: "장바구니", to: "/cart" },
      { label: "감각 리포트 작성", to: "/report" },
      { label: "패스 현황", to: "/pass" },
    ],
  },
  {
    title: "마이페이지",
    items: [
      { label: "로그인", to: "/login" },
      { label: "회원가입", to: "/signup" },
      { label: "프로필 수정", to: "/profile" },
      { label: "패키지 보관함", to: "/saved" },
      { label: "후기 작성", to: "/review/new" },
    ],
  },
];

function Footer() {
  return (
    <S.Wrap>
      <S.Container>
        <S.Upper>
          <S.Brand>
            <S.Logo src={Logo} alt="MOV" />
          </S.Brand>

          <S.Columns>
            {COLUMNS.map((col) => (
              <S.Col key={col.title}>
                <S.Title>{col.title}</S.Title>
                <S.List>
                  {col.items.map((it) => (
                    <S.Item key={it.label}>
                      <S.A href={it.to}>{it.label}</S.A>
                    </S.Item>
                  ))}
                </S.List>
              </S.Col>
            ))}
          </S.Columns>
        </S.Upper>

        <S.Bottom>
          <S.BottomLink href="/privacy">개인정보 보호정책</S.BottomLink>
          <S.BottomLink href="/tos">서비스 약관</S.BottomLink>
        </S.Bottom>
      </S.Container>
    </S.Wrap>
  );
}

export default memo(Footer);
