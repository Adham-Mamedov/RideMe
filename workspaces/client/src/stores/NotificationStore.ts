import { create } from 'zustand';
import { IError, ISuccess } from '@shared/types/client.types';

interface INotificationStore {
  toast: Function;
  setToast: (toast: Function) => void;
  displayError: (error: IError) => void;
  displaySuccess: (success: ISuccess) => void;
}

export const useNotificationStore = create<INotificationStore>()(
  (set, get) => ({
    toast: () => {},
    setToast: (toast: Function) => set(() => ({ toast })),
    displayError: (error: IError) => {
      get().toast({
        title: error.title || 'Error!',
        description: error.message,
        status: 'error',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    },
    displaySuccess: (success: ISuccess) => {
      get().toast({
        title: success.title || 'Success!',
        description: success.message,
        status: 'success',
        position: 'top-right',
        duration: 4000,
        isClosable: true,
      });
    },
  })
);
