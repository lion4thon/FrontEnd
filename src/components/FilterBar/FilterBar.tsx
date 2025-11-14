import { useState } from "react";
import * as S from "./FilterBar.style";
import {
  PRICE_OPTIONS,
  SORT_OPTIONS,
  type FilterBarProps,
} from "./FilterBar.types";

import priceIcon from "../../assets/price.svg";
import arrayIcon from "../../assets/array.svg";
import chevronDown from "../../assets/dropdown.svg";
import chevronUp from "../../assets/dropdown_up.svg";
import priceIcon2 from "../../assets/price_selected.svg";
import arrayIcon2 from "../../assets/array_selected.svg";
import chevronDown2 from "../../assets/dropdown_selected.svg";
import chevronUp2 from "../../assets/dropdown_up_selected.svg";

export default function FilterBar({
  price,
  sort,
  onChangePrice,
  onChangeSort,
}: FilterBarProps) {
  const [open, setOpen] = useState({ price: false, sort: false });

  const toggle = (key: keyof typeof open) =>
    setOpen({ price: false, sort: false, [key]: !open[key] });

  // 선택 여부
  const priceSelected = price !== "전체";
  const sortSelected = sort !== "전체";

  // 항목 클릭 시 값 설정 + 메뉴 닫기
  const handlePrice = (v: typeof price) => {
    onChangePrice(v);
    setOpen((o) => ({ ...o, price: false }));
  };
  const handleSort = (v: typeof sort) => {
    onChangeSort(v);
    setOpen((o) => ({ ...o, sort: false }));
  };

  return (
    <S.Container>
      {/* 금액 */}
      <S.Group>
        <S.Toggle
          onClick={() => toggle("price")}
          aria-expanded={open.price}
          $selected={priceSelected}
        >
          <S.LeftIcon src={priceSelected ? priceIcon2 : priceIcon} alt="" />
          <span>{priceSelected ? price : "금액대"}</span>
          <S.RightIcon
            src={
              priceSelected
                ? open.price
                  ? chevronUp2
                  : chevronDown2
                : open.price
                ? chevronUp
                : chevronDown
            }
            alt=""
          />
        </S.Toggle>

        {open.price && (
          <S.Menu>
            <S.Option onClick={() => handlePrice("전체")}>전체</S.Option>
            {PRICE_OPTIONS.map((op) => (
              <S.Option
                key={op}
                $active={op === price}
                onClick={() => handlePrice(op)}
              >
                {op}
              </S.Option>
            ))}
          </S.Menu>
        )}
      </S.Group>

      {/* 정렬 */}
      <S.Group>
        <S.Toggle
          onClick={() => toggle("sort")}
          aria-expanded={open.sort}
          $selected={sortSelected}
        >
          <S.LeftIcon src={sortSelected ? arrayIcon2 : arrayIcon} alt="" />
          <span>{sortSelected ? sort : "정렬순서"}</span>
          <S.RightIcon
            src={
              sortSelected
                ? open.sort
                  ? chevronUp2
                  : chevronDown2
                : open.sort
                ? chevronUp
                : chevronDown
            }
            alt=""
          />
        </S.Toggle>

        {open.sort && (
          <S.Menu>
            <S.Option onClick={() => handleSort("전체")}>전체</S.Option>
            {SORT_OPTIONS.map((op) => (
              <S.Option
                key={op}
                $active={op === sort}
                onClick={() => handleSort(op)}
              >
                {op}
              </S.Option>
            ))}
          </S.Menu>
        )}
      </S.Group>
    </S.Container>
  );
}
