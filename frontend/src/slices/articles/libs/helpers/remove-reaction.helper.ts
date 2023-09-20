import { type ArticleWithCountsResponseDto } from '~/packages/articles/articles.js';

const removeReaction = (
  article:  ArticleWithCountsResponseDto,
  reactionId: number,
):  ArticleWithCountsResponseDto => {
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
