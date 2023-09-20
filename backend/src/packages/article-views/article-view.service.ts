import { type IService } from '~/libs/interfaces/service.interface.js';

import { ArticleViewEntity } from './article-view.entity.js';
import { type ArticleViewRepository } from './article-view.repository.js';
import { type ArticleViewCreateDto, type ArticleViewResponseDto } from './libs/types/types.js';

class ArticleViewService implements IService {
  private articleViewRepository: ArticleViewRepository;

  public constructor(articleViewRepository: ArticleViewRepository) {
    this.articleViewRepository = articleViewRepository;
  }

  public find(): ReturnType<IService['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IService['findAll']> {
    return Promise.resolve({ items: [] });
  }

  public async create(
    payload: ArticleViewCreateDto,
  ): Promise<ArticleViewResponseDto> {
    const view = await this.articleViewRepository.create(
      ArticleViewEntity.initializeNew({
        ...payload,
      }),
    );

    return view.toObject();
  }

  public update(): ReturnType<IService['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IService['delete']> {
    return Promise.resolve(true);
  }
}

export { ArticleViewService };