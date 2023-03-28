import { INavLink, IAboutUsStatistics } from '@shared/types/client.types';
import { IStation } from '@shared/types/assets.types';

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
  location: [41, 69],
  bikes: [],
};
