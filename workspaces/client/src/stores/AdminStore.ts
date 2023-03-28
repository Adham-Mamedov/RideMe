import { create } from 'zustand';
import { IBike, IStation } from '@shared/types/assets.types';

interface IAdminStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  bikes: IBike[];
  unAssignedBikes: IBike[];
  setBikes: (bikes: IBike[]) => void;
  stations: IStation[];
  setStations: (stations: IStation[]) => void;
  getBikesByStationId: (stationId: IStation['id']) => IBike[];
  getStationById: (stationId: IStation['id']) => IStation | undefined;
}

export const useAdminStore = create<IAdminStore>()((set, get) => ({
  loading: false,
  setLoading: (loading: boolean) => set(() => ({ loading })),
  bikes: [],
  unAssignedBikes: [],
  setBikes: (bikes: IBike[]) => {
    const unAssignedBikes = bikes.filter((bike) => !bike.stationId);
    set(() => ({ bikes, unAssignedBikes }));
  },
  stations: [],
  setStations: (stations: IStation[]) => set(() => ({ stations })),
  getBikesByStationId: (stationId: IStation['id']) => {
    return get().bikes.filter((bike) => bike.stationId === stationId);
  },
  getStationById: (stationId: IStation['id']) => {
    return get().stations.find((station) => station.id === stationId);
  },
}));
