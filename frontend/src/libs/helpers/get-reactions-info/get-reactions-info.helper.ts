import { INDEX_INCREMENT, ZERO_COUNT } from '~/libs/constants/constants.js';
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
          ? reactionsInfo.likesCount + INDEX_INCREMENT
          : reactionsInfo.likesCount,
        dislikesCount: reaction.isLike
          ? reactionsInfo.dislikesCount
          : reactionsInfo.dislikesCount + INDEX_INCREMENT,
        hasAlreadyReactedWith:
          reaction.userId === userId
            ? reactionType
            : reactionsInfo.hasAlreadyReactedWith,
      };
    },
    {
      likesCount: ZERO_COUNT,
      dislikesCount: ZERO_COUNT,
      hasAlreadyReactedWith: null,
    },
  );
};

export { getReactionsInfo };
