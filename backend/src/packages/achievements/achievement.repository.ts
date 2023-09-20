import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { AchievementEntity } from './achievement.entity.js';
import { type AchievementModel } from './achievement.model.js';
import {
  type Achievement,
  type ReferenceTable,
  type ReferenceTablesCounts,
  type UserAchievement,
} from './libs/types/types.js';
import { type UserAchievementModel } from './user-achievements.model.js';

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
    filters: Pick<Achievement, 'breakpoint' | 'referenceTable'>,
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
  ): Promise<ReferenceTablesCounts> {
    const referenceTablesNames = await this.achievementModel
      .query()
      .select('referenceTable')
      .distinctOn('referenceTable')
      .castTo<{ referenceTable: ReferenceTable }[]>()
      .execute();

    const knex = this.achievementModel.knex();

    const referenceTablesCounts = await Promise.all<
      Record<ReferenceTable, string>
    >(
      referenceTablesNames.map(({ referenceTable }) => {
        return knex
          .select()
          .count('*', { as: referenceTable })
          .from(referenceTable)
          .where('userId', userId)
          .first();
      }),
    );

    return referenceTablesCounts.reduce<ReferenceTablesCounts>(
      (groupedCount, referenceTableToCount) => {
        const [[tableName, count]] = Object.entries(referenceTableToCount);
        return {
          ...groupedCount,
          [tableName]: Number(count),
        };
      },
      {} as ReferenceTablesCounts,
    );
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { AchievementRepository };
