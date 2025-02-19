export type NavItem = {
  href: string;
  style?: string;
  'data-cy': string;
  text: string;
};

export const navigationItems: NavItem[] = [
  {
    href: '#/',
    style: 'filter__link',
    'data-cy': 'FilterLinkAll',
    text: 'All',
  },
  {
    href: '#/active',
    style: 'filter__link',
    'data-cy': 'FilterLinkActive',
    text: 'Active',
  },
  {
    href: '#/completed',
    style: 'filter__link',
    'data-cy': 'FilterLinkCompleted',
    text: 'Completed',
  },
];
