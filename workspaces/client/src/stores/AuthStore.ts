import { create } from 'zustand';
import { UserEntity } from '@server/modules/user/entities/user.entity';

interface IAuthStore {
  isUnauthorized: boolean;
  setIsUnauthorized: (isUnauthorized: boolean) => void;
  user: UserEntity | null;
  setUser: (user: UserEntity | null) => void;
}

export const useAuthStore = create<IAuthStore>()((set) => ({
  isUnauthorized: false,
  setIsUnauthorized: (isUnauthorized) => set(() => ({ isUnauthorized })),
  user: null,
  setUser: (user) => set(() => ({ user })),
}));
