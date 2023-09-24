import { FIRST_INDEX } from '~/libs/constants/constants.js';
import {
  type ArticleWithCountsResponseDto,
  type ArticleWithFollowResponseDto,
} from '~/packages/articles/articles.js';

const removeReaction = <
  T extends ArticleWithFollowResponseDto | ArticleWithCountsResponseDto,
>(
  article: T,
  reactionId: number,
): T => {
  const reactionIndex = article.reactions.findIndex(
    ({ id }) => id === reactionId,
  );

  const reactionsToUpdate = [...article.reactions];
  reactionsToUpdate.splice(reactionIndex, FIRST_INDEX);

  return {
    ...article,
    reactions: reactionsToUpdate,
  };
};

export { removeReaction };
