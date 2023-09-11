import { type QueryBuilder } from 'objection';

import { type ArticleModel } from '../../article.model.js';
import { modifyReactionsGraph } from './modify-reactions-graph.helper.js';

const joinArticleRelations = <T>(
  queryBuilder: QueryBuilder<ArticleModel, T>,
  relations: string,
): void => {
  void queryBuilder
    .withGraphJoined(relations)
    .modifyGraph('reactions', modifyReactionsGraph);
};

export { joinArticleRelations };
