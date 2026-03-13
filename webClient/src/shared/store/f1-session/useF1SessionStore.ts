import { create } from 'zustand';

type F1SessionState = {
    isExpired: boolean;
    setExpired: (value: boolean) => void;
};

export const useF1SessionStore = create<F1SessionState>((set) => ({
    isExpired: false,
    setExpired: (value) => set({ isExpired: value }),
}));
