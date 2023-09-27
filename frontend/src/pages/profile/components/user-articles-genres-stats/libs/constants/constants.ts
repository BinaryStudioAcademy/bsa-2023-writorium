import { type ArticleGenreStatsFilters } from '~/packages/articles/articles.js';

const GENRES_CHART_COLORS = [
  '#44996b',
  '#009473',
  '#008E7E',
  '#00878B',
  '#008098',
  '#0078A5',
  '#00A0F4',
  '#EAFCFF',
  '#E6F4F1',
];

const DEFAULT_FILTER_PAYLOAD: ArticleGenreStatsFilters = {
  articlePublishedStatus: null,
} as const;

export { DEFAULT_FILTER_PAYLOAD, GENRES_CHART_COLORS };
export { articleStatusOptions } from './article-status-select-options.constant.js';
