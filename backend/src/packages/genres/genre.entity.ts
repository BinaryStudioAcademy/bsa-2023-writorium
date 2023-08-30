import { type IEntity } from '~/libs/interfaces/interfaces.js';

type Genre = {
  id: number;
  name: string;
  key: string;
};

class GenreEntity implements IEntity {
  private 'id': number;

  private 'name': string;

  private 'key': string;

  private constructor({ id, name, key }: Genre) {
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

  public toObject(): Genre {
    return {
      id: this.id,
      name: this.name,
      key: this.key,
    };
  }

  public toNewObject(): unknown {
    return;
  }
}

export { GenreEntity };
