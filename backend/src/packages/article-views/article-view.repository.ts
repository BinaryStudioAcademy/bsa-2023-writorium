import { type IRepository } from '~/libs/interfaces/repository.interface.js';

import { ArticleViewEntity } from './article-view.entity.js';
import { type ArticleViewModel } from './article-view.model.js';

class ArticleViewRepository implements IRepository {
  private articleViewModel: typeof ArticleViewModel;

  public constructor(articleViewModel: typeof ArticleViewModel) {
    this.articleViewModel = articleViewModel;
  }

  public find(): ReturnType<IRepository['find']> {
    return Promise.resolve(null);
  }

  public findAll(): ReturnType<IRepository['findAll']> {
    return Promise.resolve([]);
  }

  public async create(entity: ArticleViewEntity): Promise<ArticleViewEntity> {
    const { articleId, viewedById } = entity.toNewObject();

    const view = await this.articleViewModel
      .query()
      .insert({
        articleId,
        viewedById,
      })
      .onConflict(['article_id', 'viewed_by_id'])
      .ignore();

    return ArticleViewEntity.initialize(view);
  }

  public update(): ReturnType<IRepository['update']> {
    return Promise.resolve(null);
  }

  public delete(): ReturnType<IRepository['delete']> {
    return Promise.resolve(true);
  }
}

export { ArticleViewRepository };
