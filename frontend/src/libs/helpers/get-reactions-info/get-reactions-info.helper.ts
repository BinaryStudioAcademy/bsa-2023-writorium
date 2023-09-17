import { Reaction } from '~/libs/enums/enums.js';
import { type ValueOf } from '~/libs/types/types.js';
import { type ReactionResponseDto } from '~/packages/articles/articles.js';

type ReactionsInfo = {
  hasAlreadyReactedWith: ValueOf<typeof Reaction> | null;
  likesCount: number;
  dislikesCount: number;
};

const getReactionsInfo = (
  userId: number,
  reactions: ReactionResponseDto[],
): ReactionsInfo => {
  return reactions.reduce<ReactionsInfo>(
    (reactionsInfo, reaction) => {
      const reactionType: ValueOf<typeof Reaction> = reaction.isLike
        ? Reaction.LIKE
        : Reaction.DISLIKE;

      return {
        likesCount: reaction.isLike
          ? reactionsInfo.likesCount + 1
          : reactionsInfo.likesCount,
        dislikesCount: reaction.isLike
          ? reactionsInfo.dislikesCount
          : reactionsInfo.dislikesCount + 1,
        hasAlreadyReactedWith:
          reaction.userId === userId
            ? reactionType
            : reactionsInfo.hasAlreadyReactedWith,
      };
    },
    { likesCount: 0, dislikesCount: 0, hasAlreadyReactedWith: null },
  );
};

export { getReactionsInfo };
