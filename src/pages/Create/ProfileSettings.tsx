import React from "react";
import * as S from "./ProfileSettings.styles";
import "../../styles/styleguide.css";

export const ProfileSettings: React.FC = () => {
  return (
    <S.MainContainer>
      <S.PackageProfileSetting>패키지 프로필 설정</S.PackageProfileSetting>
      <S.Frame1>
        <S.Frame2>
          <S.PackageNameInput
            type="text"
            placeholder="패키지 이름 설정"
          />
        </S.Frame2>
        <S.Frame3>
          <S.PackageDescriptionTextarea
            placeholder="패키지 설명"
            rows={4}
          />
        </S.Frame3>
      </S.Frame1>
    </S.MainContainer>
  );
};
