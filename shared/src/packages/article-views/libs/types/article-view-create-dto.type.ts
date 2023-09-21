import { type ArticleView } from './article-view.type.js';

type ArticleViewCreateDto = Pick<ArticleView, 'articleId' | 'viewedById'>;

export { type ArticleViewCreateDto };
