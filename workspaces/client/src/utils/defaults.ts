import { INavLink, IAboutUsStatistics } from '@shared/types/client.types';

export const unauthenticatedLinks: INavLink[] = [
  { label: 'Login', href: '/login', type: 'link' },
  { label: 'Register', href: '/register', type: 'button' },
];

export const authenticatedLinks: INavLink[] = [
  { label: 'Profile', href: '/profile', type: 'link' },
  { label: 'Bikes', href: '/bikes', type: 'link' },
  { label: 'Log out', href: '/', type: 'linkSecondary' },
];

export const aboutUsStatistics: IAboutUsStatistics[] = [
  { description: 'Bikes in Uzbekistan', value: '238' },
  { description: 'Successful Trips', value: '100k' },
  { description: 'Happy <br/> Riders', value: '20k' },
  { description: 'Overall Rating', value: '4.9' },
];
