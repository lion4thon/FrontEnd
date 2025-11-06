import { useState } from "react";
import * as S from "./SearchBar.style";
import searchIcon from "../../assets/gg_search.svg";

interface Props {
  onSearch: (query: string) => void;
}

export default function SearchBar({ onSearch }: Props) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(value);
  };

  return (
    <S.Container onSubmit={handleSubmit}>
      <S.Input
        type="text"
        placeholder="찾고 싶은 운동 패키지를 검색하세요"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <S.Button type="submit">
        <img src={searchIcon} alt="검색" />
      </S.Button>
    </S.Container>
  );
}
