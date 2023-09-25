import { type ArticleGenreStatsFilters } from '~/packages/articles/articles.js';

const GENRES_CHART_COLORS = [
  '#44996b',
  '#58a77c',
  '#6bb588',
  '#7cc392',
  '#8fd19c',
  '#a1e0a6',
  '#b4efb1',
  '#c6fdc1',
  '#d9fecb',
  '#ecffd6',
  '#d6ecff',
];

const DEFAULT_FILTER_PAYLOAD: ArticleGenreStatsFilters = {
  articlePublishedStatus: null,
} as const;

export { DEFAULT_FILTER_PAYLOAD, GENRES_CHART_COLORS };
export { articleStatusOptions } from './article-status-select-options.constant.js';
