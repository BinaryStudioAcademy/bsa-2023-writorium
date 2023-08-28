import { type IService } from '~/libs/interfaces/interfaces.js';

import { type GenreRepository } from './genre.repository.js';
import { type GenreGetAllResponseDto } from './lib/types/types.js';

class GenreService implements IService {
  private genreRepository: GenreRepository;

  public constructor(genreRepository: GenreRepository) {
    this.genreRepository = genreRepository;
  }
  public async findAll(): Promise<GenreGetAllResponseDto> {
    const items = await this.genreRepository.findAll();

    return { items: items.map((it) => it.toObject()) };
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

export { GenreService };
