import {
  type ArticleReactionResponseDto,
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
} from '~/packages/articles/articles.js';

import { removeReaction } from './remove-reaction.helper.js';
import { updateReaction } from './update-reaction.helper.js';

const applyReaction = <
  T extends ArticleWithFollowResponseDto | ArticleWithCountsResponseDto,
>(
  article: T,
  reaction: ArticleReactionResponseDto,
): T => {
  const existingReaction = article.reactions.find(
    (item) => item.id === reaction.id,
  );

  return existingReaction?.isLike === reaction.isLike
    ? removeReaction(article, reaction.id)
    : updateReaction(article, reaction);
};

export { applyReaction };
