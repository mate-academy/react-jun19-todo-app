import React, { useContext } from 'react';
import { navigationItems, NavItem } from '../common/navItems';
import { TodoContext } from '../contexts/TodoContext';
import { FilterBy } from '../types/FilterBy';

export const Navitagion: React.FC = () => {
  const { activeItem, setActiveItem, setFilterBy } = useContext(TodoContext);

  const handleFilterBy = (item: string) => {
    setActiveItem(item);
  };

  return (
    <nav className="filter" data-cy="Filter">
      {navigationItems.map((navItem: NavItem) => (
        <a
          key={navItem.href}
          href={navItem.href}
          className={`${navItem.style} ${activeItem !== '' && activeItem === navItem.href ? 'selected' : ''}`}
          data-cy={navItem['data-cy']}
          onClick={() => {
            handleFilterBy(navItem.href);
            setFilterBy(
              FilterBy[navItem.text.toUpperCase() as keyof typeof FilterBy],
            );
          }}
        >
          {navItem.text}
        </a>
      ))}
    </nav>
  );
};
