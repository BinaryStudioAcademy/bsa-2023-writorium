import { type ColumnRefOrOrderByDescriptor } from 'objection';

import { SortingOrder } from '../enums/enums.js';

const getSortingCondition = (
  hasPublishedOnly?: boolean,
): ColumnRefOrOrderByDescriptor[] => {
  const PUBLISHED_ARTICLES = 'articles.publishedAt';
  const DRAFTED_ARTICLES = 'articles.createdAt';
  const orderBy = hasPublishedOnly ? PUBLISHED_ARTICLES : DRAFTED_ARTICLES;

  return [{ column: orderBy, order: SortingOrder.DESCENDING }];
};

export { getSortingCondition };
