import { create } from 'zustand';
import { IBike, IRide, IStation } from '@shared/types/assets.types';

interface IGlobalStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  activeRide: IRide | null;
  setActiveRide: (activeRide: IRide | null) => void;
  showPostRideModal: boolean;
  setShowPostRideModal: (showRideModal: boolean) => void;
  bikes: IBike[];
  setBikes: (bikes: IBike[]) => void;
  stations: IStation[];
  setStations: (stations: IStation[]) => void;
  getBikesByStationId: (stationId: IStation['id']) => IBike[];
}

export const useGlobalStore = create<IGlobalStore>()((set, get) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  activeRide: null,
  setActiveRide: (activeRide: any) => set(() => ({ activeRide })),
  showPostRideModal: false,
  setShowPostRideModal: (showPostRideModal: boolean) =>
    set(() => ({ showPostRideModal })),
  bikes: [],
  setBikes: (bikes: IBike[]) => set(() => ({ bikes })),
  stations: [],
  setStations: (stations: IStation[]) => set(() => ({ stations })),
  getBikesByStationId: (stationId: IStation['id']) => {
    return get().bikes.filter((bike) => bike.stationId === stationId);
  },
}));
