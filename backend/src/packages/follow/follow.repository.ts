import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { type FollowModel } from './follow.model.js';
import { type UserFollowResponseDto } from './libs/types/types.js';

class FollowRepository implements IRepository {
  private followModel: typeof FollowModel;

  public constructor(followModel: typeof FollowModel) {
    this.followModel = followModel;
  }

  public async findAuthorFollowers(authorId: number): Promise<FollowModel[]> {
    return await this.followModel.query().select().where({ authorId });
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
        followersCount: Number(followersCount.count),
        isFollowed: Boolean(isFollowed),
      };
    });
  }

  public find(): Promise<null> {
    return Promise.resolve(null);
  }

  public findAll(): Promise<unknown[]> {
    return Promise.resolve([]);
  }

  public create(): Promise<null> {
    return Promise.resolve(null);
  }

  public update(): Promise<null> {
    return Promise.resolve(null);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export { FollowRepository };
