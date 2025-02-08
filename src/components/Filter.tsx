import React from 'react';
import cn from 'classnames';

import { FilterType } from '../types/FilterType';

const filters = [
  { type: FilterType.All, href: '#/', dataCy: 'FilterLinkAll' },
  { type: FilterType.Active, href: '#/active', dataCy: 'FilterLinkActive' },
  {
    type: FilterType.Completed,
    href: '#/completed',
    dataCy: 'FilterLinkCompleted',
  },
];

type Props = {
  filter: FilterType;
  setFilter: (filter: FilterType) => void;
};

export const Filter: React.FC<Props> = ({ filter, setFilter }) => (
  <nav className="filter" data-cy="Filter">
    {filters.map(({ type, href, dataCy }) => (
      <a
        key={type}
        href={href}
        className={cn('filter__link', {
          selected: filter === type,
        })}
        data-cy={dataCy}
        onClick={() => setFilter(type)}
      >
        {type}
      </a>
    ))}
  </nav>
);
