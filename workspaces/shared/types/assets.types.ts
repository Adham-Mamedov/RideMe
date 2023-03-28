import { IUser } from '@shared/types/auth.types';

export interface IRide {
  id?: string;
  userId?: IUser['id'];
  bikeId: IBike['id'];
  stationFromId: IStation['id'];
  stationToId: IStation['id'] | null;
  timeStart: Date;
  timeEnd: Date | null;
  cost: number;
  distance: number;
}

export interface IBike {
  id?: string;
  stationId: IStation['id'];
  isAvailable: boolean;
  isBroken: boolean;
  title: string;
  description: string;
  imageUrl: string;
  wheelSize: number;
  recommendedHeight: number;
  freeMinutes: number;
  pricePerMinute: number;
}

export interface IStation {
  id?: string;
  title: string;
  location: [number, number];
  bikes: string[];
}

export interface IComment {
  id?: string;
  rideId: IRide['id'];
  text: string;
  createdAt: Date;
}
