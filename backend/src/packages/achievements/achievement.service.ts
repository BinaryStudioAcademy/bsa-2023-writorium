import { type IService } from '~/libs/interfaces/service.interface.js';
import { type DatabaseTableName } from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

import { type AchievementRepository } from './achievement.repository.js';
import { PercentageProgress } from './libs/enums/enums.js';
import {
  type AchievementBaseResponseDto,
  type AchievementGetAllResponseDto,
  type AchievementWithProgressResponseDto,
  type ReferenceTable,
} from './libs/types/types.js';

class AchievementService implements IService {
  private achievementRepository: AchievementRepository;

  public constructor(achievementRepository: AchievementRepository) {
    this.achievementRepository = achievementRepository;
  }

  public async find(id: number): Promise<AchievementBaseResponseDto | null> {
    const achievement = await this.achievementRepository.find(id);

    if (!achievement) {
      return null;
    }

    return achievement.toObject();
  }

  public async findAll(): Promise<AchievementGetAllResponseDto> {
    const items = await this.achievementRepository.findAll();

    return {
      items: items.map((it) => it.toObject()),
    };
  }

  public async findOwnProgress(
    userId: number,
  ): Promise<AchievementWithProgressResponseDto[]> {
    const achievements = await this.findAll();

    const userAchievements =
      await this.achievementRepository.findAllUserAchievements(userId);

    const referenceTableToCount =
      await this.achievementRepository.getCountsInReferenceTables(userId);

    return achievements.items.map((achievement) => {
      const isAchieved = userAchievements.find(
        ({ achievementId }) => achievement.id === achievementId,
      );

      if (isAchieved) {
        return {
          ...achievement,
          progress: PercentageProgress.MAX,
        };
      }

      const countByAchievementReference =
        referenceTableToCount[achievement.referenceTable as ReferenceTable];

      const progress = Math.round(
        (countByAchievementReference / achievement.breakpoint) *
          PercentageProgress.MAX,
      );

      return {
        ...achievement,
        progress: progress,
      };
    });
  }

  public create(): ReturnType<IService['create']> {
    return Promise.resolve(null);
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public async checkAchievement({
    userId,
    countOfItems,
    referenceTable,
  }: {
    userId: number;
    countOfItems: number;
    referenceTable: ValueOf<typeof DatabaseTableName>;
  }): Promise<void> {
    const achievementEntity = await this.achievementRepository.findBy({
      referenceTable,
      breakpoint: countOfItems,
    });

    if (!achievementEntity) {
      return;
    }

    const { id: achievementId } = achievementEntity.toObject();

    await this.achievementRepository.createUserAchievement({
      userId,
      achievementId,
    });
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { AchievementService };
