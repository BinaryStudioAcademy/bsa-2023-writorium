import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { AchievementEntity } from './achievement.entity.js';
import { type AchievementModel } from './achievement.model.js';

class AchievementRepository implements IRepository {
  private achievementModel: typeof AchievementModel;

  public constructor(achievementModel: typeof AchievementModel) {
    this.achievementModel = achievementModel;
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

  public create(): ReturnType<IRepository['create']> {
    return Promise.resolve(null);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { AchievementRepository };
