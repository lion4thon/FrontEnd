import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as S from "./Create.styles";
import { Description } from "./Description";
import { StoreSelection } from "./StoreSelection";
import { ProfileSettings } from "./ProfileSettings";
import { Reservation } from "./Reservation";
import { AI } from "./AI";
import { Complete } from "./Complete";
// import Header from "../../components/Header/Header";
import { ApiError } from "../../utils/api";
import { createPass } from "./apis/pass";
import type { CreatePassRequest } from "./apis/pass";
import type { Store } from "../../utils/storeConverter";

export const Create: React.FC = () => {
  const [packageName, setPackageName] = useState("");
  const [packageDescription, setPackageDescription] = useState("");
  const [selectedStores, setSelectedStores] = useState<(Store | null)[]>([
    null,
    null,
    null,
  ]);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const navigate = useNavigate();

  const handlePackageCreate = () => {
    // 최소 1개 매장이 선택되어 있는지 확인
    const hasSelectedStore = selectedStores.some((store) => store !== null);
    if (!hasSelectedStore) {
      alert("최소 1개 이상의 매장을 선택해주세요.");
      return;
    }
    setIsCompleteModalOpen(true);
  };

  // 패키지 가격 계산 (숫자로 반환)
  const calculateTotalPrice = (): number => {
    return selectedStores.reduce((sum, store) => {
      if (store) {
        // "40,000원" 형식에서 숫자만 추출
        const priceStr = store.price.replace(/[^0-9]/g, "");
        return sum + parseInt(priceStr, 10);
      }
      return sum;
    }, 0);
  };

  // 선택된 매장 ID 리스트 가져오기
  const getSelectedStoreIds = (): number[] => {
    return selectedStores
      .filter((store) => store !== null)
      .map((store) => parseInt(store!.id, 10));
  };

  const handleAddToCart = async () => {
    try {
      setIsCreating(true);

      const facilityIds = getSelectedStoreIds();
      // 같은 매장이 여러 슬롯에 들어가 있어도 한 번만 보내도록 중복 제거
      const facilityIdList = Array.from(new Set(facilityIds));
      const passPrice = calculateTotalPrice();

      if (facilityIdList.length === 0) {
        alert("최소 1개 이상의 매장을 선택해주세요.");
        setIsCreating(false);
        return;
      }

      console.log("[DEBUG] 선택된 매장 ID들:", facilityIds);
      console.log("[DEBUG] 중복 제거 후 ID들:", facilityIdList);

      const request: CreatePassRequest = {
        facilityIdList,
        passPrice,
        passName: packageName.trim() || "패키지",
        passDescription: packageDescription.trim() || "",
        storageType: "CART",
      };

      const response = await createPass(request);

      if (response.isSuccess) {
        console.log("패키지 생성 성공:", response.message);
        // 성공 시 모달 닫기
        setIsCompleteModalOpen(false);
        navigate("/cart");
      } else {
        throw new Error(response.message || "패키지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("패키지 생성 실패:", error);
      if (error instanceof ApiError) {
        alert(error.message || "패키지 생성에 실패했습니다.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("패키지 생성에 실패했습니다.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  const handleSaveToStorage = async () => {
    try {
      setIsCreating(true);

      const facilityIdList = getSelectedStoreIds();
      const passPrice = calculateTotalPrice();

      if (facilityIdList.length === 0) {
        alert("최소 1개 이상의 매장을 선택해주세요.");
        setIsCreating(false);
        return;
      }

      const request: CreatePassRequest = {
        facilityIdList,
        passPrice,
        passName: packageName.trim() || "패키지",
        passDescription: packageDescription.trim() || "",
        storageType: "LOCKER",
      };

      const response = await createPass(request);

      if (response.isSuccess) {
        console.log("패키지 생성 성공:", response.message);
        // 성공 시 모달 닫기
        setIsCompleteModalOpen(false);
        // TODO: 성공 시 처리 (예: 보관함에 저장 완료 메시지)
        alert("패키지가 보관함에 저장되었습니다.");
      } else {
        throw new Error(response.message || "패키지 생성에 실패했습니다.");
      }
    } catch (error) {
      console.error("패키지 생성 실패:", error);
      if (error instanceof ApiError) {
        alert(error.message || "패키지 생성에 실패했습니다.");
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("패키지 생성에 실패했습니다.");
      }
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <>
      {/* <Header /> */}
      <S.Container>
        <Description />
        {/* <StoreSelection onStoresChange={setSelectedStores} /> */}
        <StoreSelection onStoresChange={setSelectedStores} />
        <ProfileSettings
          packageName={packageName}
          onPackageNameChange={setPackageName}
          packageDescription={packageDescription}
          onPackageDescriptionChange={setPackageDescription}
        />
        <Reservation onPackageCreate={handlePackageCreate} />
        <AI />
      </S.Container>
      <Complete
        isOpen={isCompleteModalOpen}
        onClose={() => setIsCompleteModalOpen(false)}
        packageName={packageName}
        onAddToCart={handleAddToCart}
        onSaveToStorage={handleSaveToStorage}
        isCreating={isCreating}
      />
    </>
  );
};

export default Create;
