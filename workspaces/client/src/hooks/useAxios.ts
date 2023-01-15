import { useRef } from 'react';
import axios from 'axios';

import { ERoute } from '@shared/enums';

export const useAxios = () => {
  const instance = axios.create({ baseURL: ERoute.Api });

  return useRef(instance).current;
};
