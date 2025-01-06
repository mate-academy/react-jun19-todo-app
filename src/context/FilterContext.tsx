/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useContext, useState } from 'react';
import { Filter, FILTER_BY } from '../utils/constants/Filter';

const FilterContext = React.createContext<Filter>(FILTER_BY.all);
const SetFilterContext = React.createContext((v: Filter) => {});

export const useFilter = () => useContext(FilterContext);
export const useSetFilter = () => useContext(SetFilterContext);

interface Props {
  children: React.ReactNode;
}

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const [filter, setFilter] = useState<Filter>(FILTER_BY.all);

  return (
    <SetFilterContext.Provider value={setFilter}>
      <FilterContext.Provider value={filter}>{children}</FilterContext.Provider>
    </SetFilterContext.Provider>
  );
};
