import { type FilterFormValues } from '../types/types.js';

const getActiveFilters = (
  filters: FilterFormValues,
): Partial<FilterFormValues> => {
  return Object.entries(filters).reduce<Partial<FilterFormValues>>(
    (activeFilters, [keys, value]) => {
      if (value) {
        return {
          ...activeFilters,
          [keys]: value,
        };
      }
      return activeFilters;
    },
    {},
  );
};

export { getActiveFilters };
