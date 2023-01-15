import { create } from 'zustand';

interface IGlobalStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
}));
