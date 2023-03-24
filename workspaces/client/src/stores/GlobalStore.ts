import { create } from 'zustand';
import { IRide } from '@shared/types/assets.types';

interface IGlobalStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  activeRide: IRide | null;
  setActiveRide: (activeRide: IRide | null) => void;
  showPostRideModal: boolean;
  setShowPostRideModal: (showRideModal: boolean) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  activeRide: null,
  setActiveRide: (activeRide: any) => set(() => ({ activeRide })),
  showPostRideModal: false,
  setShowPostRideModal: (showPostRideModal: boolean) =>
    set(() => ({ showPostRideModal })),
}));
