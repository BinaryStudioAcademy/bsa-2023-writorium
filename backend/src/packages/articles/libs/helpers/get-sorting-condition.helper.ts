import { type ColumnRefOrOrderByDescriptor } from 'objection';

import { ArticleSortingKey, SortingOrder } from '../enums/enums.js';

const getSortingCondition = (
  hasPublishedOnly?: boolean,
): ColumnRefOrOrderByDescriptor[] => {
  const orderBy = hasPublishedOnly
    ? ArticleSortingKey.PUBLISHED
    : ArticleSortingKey.DRAFTED;

  return [{ column: orderBy, order: SortingOrder.DESCENDING }];
};

export { getSortingCondition };
