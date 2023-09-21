import {
  type ArticleReactionResponseDto,
  type ArticleWithCommentCountResponseDto,
} from '~/packages/articles/articles.js';

import { removeReaction } from './remove-reaction.helper.js';
import { updateReaction } from './update-reaction.helper.js';

const applyReaction = (
  article: ArticleWithCommentCountResponseDto,
  reaction: ArticleReactionResponseDto,
): ArticleWithCommentCountResponseDto => {
  const existingReaction = article.reactions.find(
    (item) => item.id === reaction.id,
  );

  return existingReaction?.isLike === reaction.isLike
    ? removeReaction(article, reaction.id)
    : updateReaction(article, reaction);
};

export { applyReaction };
