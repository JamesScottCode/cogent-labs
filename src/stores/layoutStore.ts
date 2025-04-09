import { ReactNode } from 'react';
import { create } from 'zustand';

interface ModalState {
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: (callback?: () => void) => void;
  title?: string;
}

export const useModalStore = create<ModalState>((set) => ({
  isOpen: false,
  modalContent: null,
  openModal: (content: ReactNode, title?: string) =>
    set({ modalContent: content, isOpen: true, title: title }),
  closeModal: (callback?: () => void) => {
    if (callback) callback();
    set({ isOpen: false, modalContent: null, title: '' });
  },
  title: '',
}));
