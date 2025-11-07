import type { ComponentType } from "react";

export type ModalID = "LoginModal";

export type ModalPropsMap = {
  LoginModal: { onSuccess?: () => void };
};

export type ModalComponent<K extends ModalID = ModalID> = ComponentType<
  ModalPropsMap[K] & { __close: () => void }
>;

export type ModalRegistry = { [K in ModalID]: ModalComponent<K> };

export type ModalStackItem<K extends ModalID = ModalID> = {
  id: K;
  key: string;
  props: ModalPropsMap[K];
};
