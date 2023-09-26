import { type ArticleReactionEntityInstance } from './article-reaction-entity-instance.type.js';

type ArticleReactionCreateDto = Pick<
  ArticleReactionEntityInstance,
  'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionCreateDto };
