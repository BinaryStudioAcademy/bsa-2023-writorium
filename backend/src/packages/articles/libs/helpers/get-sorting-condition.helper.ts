import { type ColumnRefOrOrderByDescriptor } from 'objection';

import {
  DRAFTED_ARTICLES_CONDITION,
  PUBLISHED_ARTICLES_CONDITION,
} from '../constants/constants.js';

const getSortingCondition = (
  hasPublishedOnly?: boolean,
): ColumnRefOrOrderByDescriptor[] => {
  return hasPublishedOnly
    ? PUBLISHED_ARTICLES_CONDITION
    : DRAFTED_ARTICLES_CONDITION;
};

export { getSortingCondition };
