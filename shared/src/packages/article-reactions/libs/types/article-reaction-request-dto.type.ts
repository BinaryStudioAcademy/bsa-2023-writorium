import { type ArticleReactionEntityType } from './article-reaction.entity.type.js';

type ArticleReactionRequestDto = Pick<
  ArticleReactionEntityType,
  'isLike' | 'articleId'
>;

export { type ArticleReactionRequestDto };
