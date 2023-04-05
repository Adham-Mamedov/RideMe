import { INavLink, IAboutUsStatistics } from '@shared/types/client.types';
import { IBike, IStation } from '@shared/types/assets.types';
import { IUser } from '@shared/types/auth.types';
import { Role } from '@shared/enums';

export const unauthenticatedLinks: INavLink[] = [
  { label: 'Login', href: '/login', type: 'link' },
  { label: 'Register', href: '/register', type: 'button' },
];

export const authenticatedLinks: INavLink[] = [
  { label: 'Profile', href: '/profile', type: 'link' },
  { label: 'Bikes', href: '/bikes', type: 'link' },
  { label: 'Log out', href: '/', type: 'linkSecondary' },
];

export const adminLinks: INavLink[] = [
  { label: 'Profile', href: '/profile', type: 'link' },
  { label: 'Stations', href: '/admin/stations', type: 'link' },
  { label: 'Bikes', href: '/admin/bikes', type: 'link' },
  { label: 'Log out', href: '/', type: 'linkSecondary' },
];

export const ownerLinks: INavLink[] = [
  { label: 'Users', href: '/admin/users', type: 'link' },
  ...adminLinks,
];

export const aboutUsStatistics: IAboutUsStatistics[] = [
  { description: 'Bikes in Uzbekistan', value: '238' },
  { description: 'Successful Trips', value: '100k' },
  { description: 'Happy <br/> Riders', value: '20k' },
  { description: 'Overall Rating', value: '4.9' },
];

export const defaultStationData: IStation = {
  title: '',
  location: [41.31185, 69.242534],
  bikes: [],
};

export const defaultBikeData: IBike = {
  title: '',
  stationId: undefined,
  description: '',
  imageUrl: '',
  wheelSize: 0,
  recommendedHeight: 0,
  freeMinutes: 0,
  pricePerMinute: 0,
  isAvailable: true,
  isBroken: false,
};

export const defaultUserData: IUser = {
  card: {
    number: '',
    expDate: '',
  },
  email: '',
  name: '',
  role: Role.User,
};
