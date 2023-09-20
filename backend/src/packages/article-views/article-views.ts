import { ArticleViewModel } from './article-view.model.js';
import { ArticleViewRepository } from './article-view.repository.js';
import { ArticleViewService } from './article-view.service.js';

const articleViewRepository = new ArticleViewRepository(
  ArticleViewModel,
);
const articleViewService = new  ArticleViewService(
  articleViewRepository,
);

export { articleViewService };
export { ArticleViewModel } from './article-view.model.js';
