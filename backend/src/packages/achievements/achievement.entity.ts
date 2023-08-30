import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type Achievement } from './libs/types/types.js';

type AchievementEntityPayload = Omit<Achievement, 'id'>;

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
  }: WithNullableKeys<Achievement, 'id'>) {
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
  }: Achievement): AchievementEntity {
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
  }: AchievementEntityPayload): AchievementEntity {
    return new AchievementEntity({
      id: null,
      key,
      name,
      description,
    });
  }

  public toObject(): Achievement {
    return {
      id: this.id as number,
      key: this.key,
      name: this.name,
      description: this.description,
    };
  }

  public toNewObject(): AchievementEntityPayload {
    return {
      key: this.key,
      name: this.name,
      description: this.description,
    };
  }
}

export { AchievementEntity };
