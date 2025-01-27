import React from 'react';

import cn from 'classnames';
import { Actions, Filters } from '../types/Todo';
import { DispatchContext, StateContext } from '../Store';

type Props = {
  filterItem: Filters;
};

const FilterButton: React.FC<Props> = ({ filterItem }) => {
  const { activeFilter } = React.useContext(StateContext);
  const dispatch = React.useContext(DispatchContext);

  const isSelectedFilter = activeFilter === filterItem;

  const filterName = filterItem.charAt(0).toUpperCase() + filterItem.slice(1);

  const handleFilterClick = () => {
    if (!isSelectedFilter) {
      if (dispatch) {
        dispatch({ type: Actions.Filter, payload: filterItem });
      }
    }
  };

  return (
    <a
      key={filterItem}
      href={`#/${filterItem}`}
      className={cn('filter__link', {
        selected: isSelectedFilter,
      })}
      data-cy={`FilterLink${filterName}`}
      onClick={handleFilterClick}
    >
      {filterName}
    </a>
  );
};

export default FilterButton;
