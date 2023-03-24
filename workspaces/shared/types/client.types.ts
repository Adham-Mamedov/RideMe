export interface INavLink {
  label: string;
  href: string;
  type: 'button' | 'link' | 'linkSecondary';
  onClick?: () => void;
}

export interface IAboutUsStatistics {
  description: string;
  value: string;
}
