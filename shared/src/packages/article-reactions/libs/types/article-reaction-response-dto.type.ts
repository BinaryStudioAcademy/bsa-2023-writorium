import { type ArticleReactionEntityType } from './article-reaction.entity.js';

type ArticleReactionResponseDto = Pick<
  ArticleReactionEntityType,
  'id' | 'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionResponseDto };
