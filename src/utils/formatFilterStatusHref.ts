import { FilterStatus } from '../types/FilterStatus';

const formatFilterStatusHref = (filterStatus: FilterStatus): string => {
  return `#/${filterStatus === FilterStatus.All ? '' : filterStatus}`;
};

export default formatFilterStatusHref;
