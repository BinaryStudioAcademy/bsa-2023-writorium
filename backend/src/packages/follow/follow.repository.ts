import { type FollowModel } from './follow.model.js';
import { type UserFollowResponseDto } from './libs/types/types.js';

class FollowRepository {
  private followModel: typeof FollowModel;

  public constructor(followModel: typeof FollowModel) {
    this.followModel = followModel;
  }

  public async toggleFollowAuthor({
    userId,
    authorId,
  }: {
    userId: number;
    authorId: number;
  }): Promise<FollowModel | FollowModel[]> {
    const isFollowing = await this.followModel
      .query()
      .where({ userId, authorId })
      .first();

    if (!isFollowing) {
      return await this.followModel
        .query()
        .insert({ userId, authorId })
        .returning('*');
    }

    return await this.followModel
      .query()
      .delete()
      .where({ userId, authorId })
      .returning('*');
  }

  public async getAuthorFollowersCountAndStatus({
    userId,
    authorId,
  }: {
    userId?: number;
    authorId: number;
  }): Promise<UserFollowResponseDto> {
    return await this.followModel.transaction(async (trx) => {
      const followersCount = await this.followModel
        .query(trx)
        .where({ authorId })
        .count()
        .first()
        .castTo<{ count: string }>();

      const isFollowed = userId
        ? await this.followModel.query(trx).where({ userId, authorId }).first()
        : false;

      return {
        authorId,
        followersCount: Number.parseInt(followersCount?.count, 10),
        isFollowed: Boolean(isFollowed),
      };
    });
  }
}

export { FollowRepository };
