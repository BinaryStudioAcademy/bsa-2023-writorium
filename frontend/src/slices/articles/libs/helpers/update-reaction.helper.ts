import {
  type ArticleWithCommentCountResponseDto,
  type ArticleWithFollowResponseDto,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';

const updateReaction = <
  T extends ArticleWithFollowResponseDto | ArticleWithCommentCountResponseDto,
>(
  article: T,
  updatedReaction: ReactionResponseDto,
): T => {
  let reactionIndex: number;

  const existingReaction = article.reactions.find(({ id }, index) => {
    if (id === updatedReaction.id) {
      reactionIndex = index;
      return true;
    }
  });

  if (!existingReaction) {
    return {
      ...article,
      reactions: [...article.reactions, updatedReaction],
    };
  }

  const reactionsToUpdate = [...article.reactions];
  reactionsToUpdate[reactionIndex!] = updatedReaction;

  return {
    ...article,
    reactions: reactionsToUpdate,
  };
};

export { updateReaction };
