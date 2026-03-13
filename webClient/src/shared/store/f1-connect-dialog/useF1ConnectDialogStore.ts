import { create } from 'zustand';

type F1ConnectDialogState = {
    open: boolean;
    setOpen: (value: boolean) => void;
};

export const useF1ConnectDialogStore = create<F1ConnectDialogState>((set) => ({
    open: false,
    setOpen: (value) => set({ open: value }),
}));
