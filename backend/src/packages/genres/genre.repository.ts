import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { GenreEntity, type GenreModel } from '~/packages/genres/genre.js';

import { UNKNOWN_GENRE_KEY } from './lib/constants/constants.js';

class GenreRepository implements IRepository {
  private genreModel: typeof GenreModel;

  public constructor(genreModel: typeof GenreModel) {
    this.genreModel = genreModel;
  }

  public async findAll(): Promise<GenreEntity[]> {
    const genres = await this.genreModel.query().execute();

    return genres.map((it) => GenreEntity.initialize(it));
  }

  public async find(id: number): Promise<GenreEntity | null> {
    const genre = await this.genreModel.query().findById(id);
    if (!genre) {
      return null;
    }

    return GenreEntity.initialize(genre);
  }

  public async findByKey(key: string): Promise<GenreEntity | null> {
    const genre = await this.genreModel.query().findOne({ key }).execute();

    if (!genre) {
      return null;
    }

    return GenreEntity.initialize(genre);
  }

  public async create(entity: GenreEntity): Promise<GenreEntity> {
    const { key, name } = entity.toNewObject();

    const item = await this.genreModel
      .query()
      .insert({
        key,
        name,
      })
      .returning('*')
      .execute();

    return GenreEntity.initialize(item);
  }

  public async getUnknownGenre(): Promise<GenreEntity> {
    return (await this.findByKey(UNKNOWN_GENRE_KEY)) as GenreEntity;
  }

  public update(): Promise<unknown> {
    return Promise.resolve(null);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export { GenreRepository };
