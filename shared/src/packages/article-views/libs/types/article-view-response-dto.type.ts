import { type ArticleView } from './article-view.type.js';

type ArticleViewResponseDto = Pick<
  ArticleView,
  'id' | 'articleId' | 'viewedById'
>;

export { type ArticleViewResponseDto };
