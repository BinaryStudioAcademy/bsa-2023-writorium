import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type Achievement } from './libs/types/types.js';

type AchievementEntityPayload = Omit<Achievement, 'id'>;

class AchievementEntity implements IEntity {
  private 'id': number | null;

  private 'key': string;

  private 'name': string;

  private 'description': string;

  private 'breakpoint': number;

  private 'referenceTable': string;

  private constructor({
    id,
    key,
    name,
    description,
    breakpoint,
    referenceTable,
  }: WithNullableKeys<Achievement, 'id'>) {
    this.id = id;
    this.key = key;
    this.name = name;
    this.description = description;
    this.breakpoint = breakpoint;
    this.referenceTable = referenceTable;
  }

  public static initialize({
    id,
    key,
    name,
    description,
    breakpoint,
    referenceTable,
  }: Achievement): AchievementEntity {
    return new AchievementEntity({
      id,
      key,
      name,
      description,
      breakpoint,
      referenceTable,
    });
  }

  public static initializeNew({
    key,
    name,
    description,
    breakpoint,
    referenceTable,
  }: AchievementEntityPayload): AchievementEntity {
    return new AchievementEntity({
      id: null,
      key,
      name,
      description,
      breakpoint,
      referenceTable,
    });
  }

  public toObject(): Achievement {
    return {
      id: this.id as number,
      key: this.key,
      name: this.name,
      description: this.description,
      breakpoint: this.breakpoint,
      referenceTable: this.referenceTable,
    };
  }

  public toNewObject(): AchievementEntityPayload {
    return {
      key: this.key,
      name: this.name,
      description: this.description,
      breakpoint: this.breakpoint,
      referenceTable: this.referenceTable,
    };
  }
}

export { AchievementEntity };
