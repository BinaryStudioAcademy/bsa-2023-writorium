import { type ArticleReactionEntityType } from './article-reaction.entity.js';

type ArticleReactionCreateDto = Pick<
  ArticleReactionEntityType,
  'isLike' | 'userId' | 'articleId'
>;

export { type ArticleReactionCreateDto };
