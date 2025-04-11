import { ReactNode } from 'react';
import { create } from 'zustand';

interface Toast {
  message: string;
  visible: boolean;
  isError: boolean;
}

interface LayoutState {
  toast: Toast;
  openToast: ({ message, visible, isError }: Toast) => void;
  closeToast: () => void;
  isOpen: boolean;
  modalContent: ReactNode | null;
  openModal: (content: ReactNode, title?: string) => void;
  closeModal: (callback?: () => void) => void;
  title?: string;
}

export const useLayoutStore = create<LayoutState>((set, get) => ({
  toast: {
    message: '',
    visible: false,
    isError: false,
  },
  openToast: ({ message, visible, isError }) => {
    set({ toast: { message, visible, isError } });

    setTimeout(() => {
      get().closeToast();
    }, 3000);
  },
  closeToast: () => {
    set({ toast: { message: '', visible: false, isError: false } });
  },
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
