import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

import { type GenreEntityType } from './lib/types/types.js';

class GenreEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'key': string;

  private constructor({
    id,
    name,
    key,
  }: WithNullableKeys<GenreEntityType, 'id'>) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static initialize({ id, name, key }: GenreEntityType): GenreEntity {
    return new GenreEntity({
      id,
      name,
      key,
    });
  }

  public static initializeNew({
    name,
    key,
  }: Omit<GenreEntityType, 'id'>): GenreEntity {
    return new GenreEntity({
      id: null,
      name,
      key,
    });
  }

  public toObject(): GenreEntityType {
    return {
      id: this.id as number,
      name: this.name,
      key: this.key,
    };
  }

  public toNewObject(): Omit<GenreEntityType, 'id'> {
    return { name: this.name, key: this.key };
  }
}

export { GenreEntity };
