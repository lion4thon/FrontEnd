import React from "react";
import * as S from "./ProfileSettings.styles";
import "../../styles/styleguide.css";

interface ProfileSettingsProps {
  packageName: string;
  onPackageNameChange: (name: string) => void;
  packageDescription: string;
  onPackageDescriptionChange: (description: string) => void;
}

export const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  packageName,
  onPackageNameChange,
  packageDescription,
  onPackageDescriptionChange,
}) => {
  return (
    <S.MainContainer>
      <S.PackageProfileSetting>패키지 프로필 설정</S.PackageProfileSetting>
      <S.Frame1>
        <S.Frame2>
          <S.PackageNameInput
            type="text"
            placeholder="패키지 이름 설정"
            value={packageName}
            onChange={(e) => onPackageNameChange(e.target.value)}
          />
        </S.Frame2>
        <S.Frame3>
          <S.PackageDescriptionTextarea
            placeholder="패키지 설명"
            rows={4}
            value={packageDescription}
            onChange={(e) => onPackageDescriptionChange(e.target.value)}
          />
        </S.Frame3>
      </S.Frame1>
    </S.MainContainer>
  );
};
