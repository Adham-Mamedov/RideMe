import { create } from 'zustand';
import { IRide } from '@shared/types/assets.types';

interface IGlobalStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  activeRide: IRide | null;
  setActiveRide: (activeRide: any) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  activeRide: {
    id: '1',
    userId: '1',
    bikeId: '1',
    stationFromId: '1',
    stationToId: '1',
    timeStart: new Date(),
    timeEnd: null,
    cost: 0,
    distance: 0,
  },
  setActiveRide: (activeRide: any) => set(() => ({ activeRide })),
}));
