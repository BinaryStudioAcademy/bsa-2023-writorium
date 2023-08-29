import { type IService } from '~/libs/interfaces/service.interface.js';

import { type AchievementRepository } from './achievement.repository.js';
import {
  type AchievementBaseResponseDto,
  type AchievementGetAllResponseDto,
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

  public create(): ReturnType<IService['create']> {
    return Promise.resolve(null);
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { AchievementService };
