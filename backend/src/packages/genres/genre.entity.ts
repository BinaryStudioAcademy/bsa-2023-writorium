import { type IEntity } from '~/libs/interfaces/interfaces.js';

class GenreEntity implements IEntity {
  private 'id': number;

  private 'name': string;

  private 'key': string;

  private constructor({
    id,
    name,
    key,
  }: {
    id: number;
    name: string;
    key: string;
  }) {
    this.id = id;
    this.name = name;
    this.key = key;
  }

  public static initialize({
    id,
    name,
    key,
  }: {
    id: number;
    name: string;
    key: string;
  }): GenreEntity {
    return new GenreEntity({
      id,
      name,
      key,
    });
  }

  public toObject(): {
    id: number;
    name: string;
    key: string;
  } {
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
