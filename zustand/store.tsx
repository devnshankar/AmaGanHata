import { create } from 'zustand';

interface LoginStore {
  showLogin: boolean;
  user: any;
  forceRender: number;
  setShowLogin: (value: boolean) => void;
  setUser: (user: any) => void;
  setForceRender: (value: number) => void;
}

const useLoginStore = create<LoginStore>((set) => ({
  showLogin: true,
  user: null,
  forceRender: 0,
  setShowLogin: (value) => set({ showLogin: value }),
  setUser: (user) => set({ user }),
  setForceRender: (value: number) => set({ forceRender: value }),
}));

export { useLoginStore };
