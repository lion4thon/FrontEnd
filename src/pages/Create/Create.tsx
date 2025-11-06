import React from "react";
import * as S from "./Create.styles";
import { Description } from "./Description";
import { StoreSelection } from "./StoreSelection";
import { ProfileSettings } from "./ProfileSettings";
import { Reservation } from "./Reservation";

export const Create: React.FC = () => {
  return (
    <S.Container>
      <Description />
      <StoreSelection />
      <ProfileSettings />
      <Reservation />
    </S.Container>
  );
};

export default Create;

