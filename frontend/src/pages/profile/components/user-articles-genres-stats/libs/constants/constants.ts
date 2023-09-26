import { type ArticleGenreStatsFilters } from '~/packages/articles/articles.js';

const GENRES_CHART_COLORS = [
  '#44996b',
  '#6699CC',
  '#996699',
  '#CC9966',
  '#66CC99',
  '#CC99CC',
  '#99CC66',
  '#CC9999',
  '#66CCCC',
  '#8A8EAE',
  '#d6ecff',
];

const DEFAULT_FILTER_PAYLOAD: ArticleGenreStatsFilters = {
  articlePublishedStatus: null,
} as const;

export { DEFAULT_FILTER_PAYLOAD, GENRES_CHART_COLORS };
export { articleStatusOptions } from './article-status-select-options.constant.js';
