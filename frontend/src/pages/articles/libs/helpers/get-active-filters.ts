import { type FilterFormValues } from '../types/types.js';

const getActiveFilters = (
  filters: FilterFormValues,
): Partial<FilterFormValues> => {
  const activeFilters: Partial<FilterFormValues> = {};

  let keys: keyof FilterFormValues;
  for (keys in filters) {
    const value = filters[keys];
    if (value) {
      Object.assign(activeFilters, { [keys]: value });
    }
  }
  return activeFilters;
};

export { getActiveFilters };
