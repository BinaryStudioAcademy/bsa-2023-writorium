import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type AchievementEntityType } from './libs/types/types.js';

class AchievementEntity implements IEntity {
  private 'id': number | null;

  private 'key': string;

  private 'name': string;

  private 'description': string;

  private constructor({
    id,
    key,
    name,
    description,
  }: WithNullableKeys<AchievementEntityType, 'id'>) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.description = description;
  }

  public static initialize({
    id,
    key,
    name,
    description,
  }: AchievementEntityType): AchievementEntity {
    return new AchievementEntity({
      id,
      key,
      name,
      description,
    });
  }

  public static initializeNew({
    key,
    name,
    description,
  }: Omit<AchievementEntityType, 'id'>): AchievementEntity {
    return new AchievementEntity({
      id: null,
      key,
      name,
      description,
    });
  }

  public toObject(): AchievementEntityType {
    return {
      id: this.id as number,
      key: this.key,
      name: this.name,
      description: this.description,
    };
  }

  public toNewObject(): Omit<AchievementEntityType, 'id'> {
    return {
      key: this.key,
      name: this.name,
      description: this.description,
    };
  }
}

export { AchievementEntity };
