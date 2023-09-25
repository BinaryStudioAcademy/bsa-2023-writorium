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
  const ELEMENT_TO_REMOVE_COUNT = 1;
  const reactionIndex = article.reactions.findIndex(
    ({ id }) => id === reactionId,
  );

  const reactionsToUpdate = [...article.reactions];
  reactionsToUpdate.splice(reactionIndex, ELEMENT_TO_REMOVE_COUNT);

  return {
    ...article,
    reactions: reactionsToUpdate,
  };
};

export { removeReaction };
