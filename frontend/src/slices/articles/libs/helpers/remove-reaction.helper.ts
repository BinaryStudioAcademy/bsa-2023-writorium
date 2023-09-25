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
  const FIRST_ARRAY_ITEM_INDEX = 1;
  const reactionIndex = article.reactions.findIndex(
    ({ id }) => id === reactionId,
  );

  const reactionsToUpdate = [...article.reactions];
  reactionsToUpdate.splice(reactionIndex, FIRST_ARRAY_ITEM_INDEX);

  return {
    ...article,
    reactions: reactionsToUpdate,
  };
};

export { removeReaction };
