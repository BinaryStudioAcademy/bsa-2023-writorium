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
const GENRES_CHART_PLACEHOLDER_DATA = [{ lable: 'No data', count: 1 }];
const GENRES_CHART_PLACEHOLDER_COLOR = '#f0eded';
const GENRES_CHART_PLACEHOLDER_FONT_SIZE = 18;
const GENRES_CHART_PLACEHOLDER_LABEL_COLOR = 'gray';
const GENRES_CHART_PLACEHOLDER_LABEL_POSITION = 'center';

const DEFAULT_FILTER_PAYLOAD: ArticleGenreStatsFilters = {
  articlePublishedStatus: null,
} as const;

export {
  DEFAULT_FILTER_PAYLOAD,
  GENRES_CHART_COLORS,
  GENRES_CHART_PLACEHOLDER_COLOR,
  GENRES_CHART_PLACEHOLDER_DATA,
  GENRES_CHART_PLACEHOLDER_FONT_SIZE,
  GENRES_CHART_PLACEHOLDER_LABEL_COLOR,
  GENRES_CHART_PLACEHOLDER_LABEL_POSITION,
};
export { articleStatusOptions } from './article-status-select-options.constant.js';
