import { type IEntity } from '~/libs/interfaces/interfaces.js';
import { type WithNullableKeys } from '~/libs/types/types.js';

type Genre = {
  id: number;
  name: string;
  key: string;
};

class GenreEntity implements IEntity {
  private 'id': number | null;

  private 'name': string;

  private 'key': string;

  private constructor({ id, name, key }: WithNullableKeys<Genre, 'id'>) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static initialize({ id, name, key }: Genre): GenreEntity {
    return new GenreEntity({
      id,
      name,
      key,
    });
  }

  public static initializeNew({ name, key }: Omit<Genre, 'id'>): GenreEntity {
    return new GenreEntity({
      id: null,
      name,
      key,
    });
  }

  public toObject(): Genre {
    return {
      id: this.id as number,
      name: this.name,
      key: this.key,
    };
  }

  public toNewObject(): Omit<Genre, 'id'> {
    return { name: this.name, key: this.key };
  }
}

export { GenreEntity };
