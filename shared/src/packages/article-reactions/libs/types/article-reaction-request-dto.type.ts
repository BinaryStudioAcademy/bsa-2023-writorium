import { type ArticleReactionEntityType } from './article-reaction.entity.js';

type ArticleReactionRequestDto = Pick<
  ArticleReactionEntityType,
  'isLike' | 'articleId'
>;

export { type ArticleReactionRequestDto };
