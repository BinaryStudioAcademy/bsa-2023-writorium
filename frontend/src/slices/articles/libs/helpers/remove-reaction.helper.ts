import {
  type ArticleWithCommentCountResponseDto,
  type ArticleWithFollowResponseDto,
} from '~/packages/articles/articles.js';

const removeReaction = <
  T extends ArticleWithFollowResponseDto | ArticleWithCommentCountResponseDto,
>(
  article: T,
  reactionId: number,
): T => {
  const reactionIndex = article.reactions.findIndex(
    ({ id }) => id === reactionId,
  );

  const reactionsToUpdate = [...article.reactions];
  reactionsToUpdate.splice(reactionIndex, 1);

  return {
    ...article,
    reactions: reactionsToUpdate,
  };
};

export { removeReaction };
