import { type ArticleReactionEntityType } from './article-reaction.entity.type.js';

type ArticleReactionCreateDto = Pick<
  ArticleReactionEntityType,
  'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionCreateDto };
