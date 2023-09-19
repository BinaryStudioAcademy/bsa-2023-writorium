import { type ArticleWithCommentCountResponseDto } from '~/packages/articles/articles.js';

const removeReaction = (
  article: ArticleWithCommentCountResponseDto,
  reactionId: number,
): ArticleWithCommentCountResponseDto => {
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
