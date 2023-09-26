import { type ArticleReactionEntityInstance } from './article-reaction-entity-instance.type.js';

type ArticleReactionResponseDto = Pick<
  ArticleReactionEntityInstance,
  'id' | 'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionResponseDto };
