import { type ArticleReactionResponseDto } from '~/packages/article-reactions/article-reactions.js';

type ReactionResponseDto = Pick<
  ArticleReactionResponseDto,
  'id' | 'isLike' | 'userId'
>;

export { type ReactionResponseDto };
