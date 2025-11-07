import React from "react";
import * as S from "./Create.styles";
import { Description } from "./Description";
import { StoreSelection } from "./StoreSelection";
import { ProfileSettings } from "./ProfileSettings";
import { Reservation } from "./Reservation";
import { AI } from "./AI";
import Header from "../../components/Header/Header";

export const Create: React.FC = () => {
  return (
    <>
      <Header />
      <S.Container>
        <Description />
        <StoreSelection />
        <ProfileSettings />
        <Reservation />
        <AI />
      </S.Container>
    </>
  );
};

export default Create;
