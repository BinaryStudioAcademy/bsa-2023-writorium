import { type ReactionResponseDto } from '~/packages/articles/articles.js';

type ReturnValue = {
  isLike?: boolean;
  likeCount: number;
  dislikeCount: number;
};

const getReactionsInfo = (
  userId: number,
  reactions: ReactionResponseDto[],
): ReturnValue => {
  let likeCount = 0;
  let dislikeCount = 0;
  let isLike: boolean | undefined;

  for (const reaction of reactions) {
    if (reaction.userId === userId) {
      isLike = reaction.isLike ? true : false;
    }

    reaction.isLike ? likeCount++ : dislikeCount++;
  }

  return {
    isLike,
    likeCount,
    dislikeCount,
  };
};

export { getReactionsInfo };
