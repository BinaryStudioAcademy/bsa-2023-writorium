import { type IRepository } from '~/libs/interfaces/repository.interface.js';
import { type DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { AchievementEntity } from './achievement.entity.js';
import { type AchievementModel } from './achievement.model.js';
import { type Achievement, type UserAchievement } from './libs/types/types.js';
import { type UserAchievementModel } from './user-achievements.model.js';

type referenceTableType = ValueOf<typeof DatabaseTableName>;

class AchievementRepository implements IRepository {
  private achievementModel: typeof AchievementModel;
  private userAchievementModel: typeof UserAchievementModel;

  public constructor(
    achievementModel: typeof AchievementModel,
    userAchievementModel: typeof UserAchievementModel,
  ) {
    this.achievementModel = achievementModel;
    this.userAchievementModel = userAchievementModel;
  }

  public async find(id: number): Promise<AchievementEntity | null> {
    const achievement = await this.achievementModel
      .query()
      .findById(id)
      .execute();

    if (!achievement) {
      return null;
    }

    return AchievementEntity.initialize(achievement);
  }

  public async findAll(): Promise<AchievementEntity[]> {
    const achievements = await this.achievementModel.query().execute();

    return achievements.map((it) => AchievementEntity.initialize(it));
  }

  public async findAllUserAchievements(
    userId: number,
  ): Promise<UserAchievement[]> {
    const achievements = await this.userAchievementModel
      .query()
      .where({ userId })
      .execute();

    return achievements.map((userAchievement) => ({
      id: userAchievement.id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
    }));
  }

  public async findBy(
    filters: Partial<Achievement> = {},
  ): Promise<AchievementEntity | null> {
    const achievement = await this.achievementModel
      .query()
      .where(filters)
      .first()
      .execute();

    if (!achievement) {
      return null;
    }

    return AchievementEntity.initialize(achievement);
  }

  public create(): ReturnType<IRepository['create']> {
    return Promise.resolve(null);
  }

  public async createUserAchievement(data: {
    userId: number;
    achievementId: number;
  }): Promise<UserAchievement> {
    const userAchievement = await this.userAchievementModel
      .query()
      .insert(data)
      .castTo<UserAchievement>()
      .execute();

    return {
      id: userAchievement.id,
      userId: userAchievement.userId,
      achievementId: userAchievement.achievementId,
    };
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public async getCountsInReferenceTables(
    userId: number,
  ): Promise<{ [key: string]: number }[]> {
    const relatedTableNames = await this.achievementModel
      .query()
      .select('referenceTable')
      .groupBy('referenceTable')
      .castTo<{ referenceTable: referenceTableType }[]>()
      .execute();

    const knex = this.achievementModel.knex();

    return await Promise.all(
      relatedTableNames.map(async ({ referenceTable }) => {
        const count = (await knex
          .select()
          .count(`* as ${referenceTable}`)
          .from(referenceTable)
          .where('userId', userId)
          .first()) as { [key in referenceTableType]: string };

        return { [referenceTable]: Number(count[referenceTable]) };
      }),
    );
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { AchievementRepository };
