import { create } from 'zustand';
import { IBike, IRide, IStation } from '@shared/types/assets.types';
import { IUser } from '@shared/types/auth.types';

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
  rides: IRide[];
  setRides: (rides: IRide[]) => void;
  users: IUser[];
  setUsers: (users: IUser[]) => void;
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
  rides: [],
  setRides: (rides: IRide[]) => set(() => ({ rides })),
  users: [],
  setUsers: (users: IUser[]) => set(() => ({ users })),
}));
