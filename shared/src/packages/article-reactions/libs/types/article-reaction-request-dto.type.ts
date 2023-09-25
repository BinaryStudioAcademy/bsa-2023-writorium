import { type ArticleReactionEntityInstance } from './article-reaction-entity-instance.type.js';

type ArticleReactionRequestDto = Pick<
  ArticleReactionEntityInstance,
  'isLike' | 'articleId'
>;

export { type ArticleReactionRequestDto };
