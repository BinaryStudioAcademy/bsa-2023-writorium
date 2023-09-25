import { ArticleSortingKey, SortingOrder } from '../enums/enums.js';

const PUBLISHED_ARTICLES_CONDITION = [
  { column: ArticleSortingKey.PUBLISHED, order: SortingOrder.DESCENDING },
];

const DRAFTED_ARTICLES_CONDITION = [
  { column: ArticleSortingKey.UPDATED, order: SortingOrder.DESCENDING },
  { column: ArticleSortingKey.PUBLISHED, order: SortingOrder.DESCENDING },
];

export { DRAFTED_ARTICLES_CONDITION, PUBLISHED_ARTICLES_CONDITION };
