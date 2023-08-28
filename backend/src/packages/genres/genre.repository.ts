import { type IRepository } from '~/libs/interfaces/interfaces.js';
import { type GenreModel } from '~/packages/genres/genre.js';

class GenreRepository implements IRepository {
  private genreModel: typeof GenreModel;

  public constructor(genreModel: typeof GenreModel) {
    this.genreModel = genreModel;
  }

  public async findAll(): Promise<GenreModel[]> {
    return await this.genreModel.query().execute();
  }

  public find(id: number): Promise<unknown> {
    return Promise.resolve(id);
  }

  public create(payload: unknown): Promise<unknown> {
    return Promise.resolve(payload);
  }

  public update(): Promise<unknown> {
    return Promise.resolve(null);
  }

  public delete(): Promise<boolean> {
    return Promise.resolve(true);
  }
}

export { GenreRepository };
