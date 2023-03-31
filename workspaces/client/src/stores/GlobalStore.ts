import { create } from 'zustand';
import { IBike, IRide, IStation } from '@shared/types/assets.types';

interface IGlobalStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  navBarHeight: number;
  setNavBarHeight: (navBarHeight: number) => void;
  activeRide: IRide | null;
  setActiveRide: (activeRide: IRide | null) => void;
  postRide: IRide | null;
  setPostRide: (postRide: IRide | null) => void;
  bikes: IBike[];
  setBikes: (bikes: IBike[]) => void;
  stations: IStation[];
  filteredStations: IStation[];
  setFilteredStations: (stations: IStation[]) => void;
  setStations: (stations: IStation[]) => void;
  getBikesByStationId: (
    stationId: IStation['id'],
    availableOnly?: boolean
  ) => IBike[];
  rides: IRide[];
  setRides: (rides: IRide[]) => void;
}

export const useGlobalStore = create<IGlobalStore>()((set, get) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  navBarHeight: 0,
  setNavBarHeight: (navBarHeight: number) => set(() => ({ navBarHeight })),
  activeRide: null,
  setActiveRide: (activeRide: any) => set(() => ({ activeRide })),
  postRide: null,
  setPostRide: (postRide: IRide | null) => set(() => ({ postRide })),
  bikes: [],
  setBikes: (bikes: IBike[]) => set(() => ({ bikes })),
  stations: [],
  filteredStations: [],
  setFilteredStations: (stations: IStation[]) =>
    set(() => ({ filteredStations: stations })),
  setStations: (stations: IStation[]) => set(() => ({ stations })),
  getBikesByStationId: (stationId: IStation['id']) => {
    return get().bikes.filter((bike) => bike.stationId === stationId);
  },
  rides: [],
  setRides: (rides: IRide[]) => set(() => ({ rides })),
}));
