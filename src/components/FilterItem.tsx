import classNames from 'classnames';
import { FilterStatus } from '../types/FilterStatus';
import { useContext } from 'react';
import { StateContext } from '../store/Store';
import capitalize from '../utils/capitalize';
import formatFilterStatusHref from '../utils/formatFilterStatusHref';

type Props = {
  status: FilterStatus;
  onClick: (status: FilterStatus) => void;
};

export const FilterItem: React.FC<Props> = ({ status, onClick }) => {
  const { filterStatus } = useContext(StateContext);

  return (
    <a
      href={formatFilterStatusHref(status)}
      className={classNames('filter__link', {
        selected: filterStatus === status,
      })}
      data-cy={`FilterLink${capitalize(status)}`}
      onClick={() => onClick(status)}
    >
      {capitalize(status)}
    </a>
  );
};
