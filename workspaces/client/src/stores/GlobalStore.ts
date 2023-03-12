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
  activeRide: {
    id: '1',
    userId: '1',
    bikeId: '1',
    stationFromId: '1',
    stationToId: null,
    timeStart: new Date(1678606460002),
    timeEnd: null,
    cost: 0,
    distance: 0,
  },
  setActiveRide: (activeRide: any) => set(() => ({ activeRide })),
  showPostRideModal: false,
  setShowPostRideModal: (showPostRideModal: boolean) =>
    set(() => ({ showPostRideModal })),
}));
