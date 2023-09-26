import { type ArticleReactionEntityType } from './article-reaction.entity.type.js';

type ArticleReactionResponseDto = Pick<
  ArticleReactionEntityType,
  'id' | 'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionResponseDto };
