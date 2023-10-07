import { create } from "zustand";

export type ModalType = "createServer";

interface ModalStore {
  onClose: () => void;
  isOpen: boolean;
  onOpen: (type: ModalType) => void;
  type: ModalType | null;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  isOpen: false,
  onOpen: (type) => set({ isOpen: true, type }),
  onClose: () => set({ type: null, isOpen: false }),
}));
