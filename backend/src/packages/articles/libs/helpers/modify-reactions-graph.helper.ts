import { type Model, type QueryBuilder } from 'objection';

const modifyReactionsGraph = (builder: QueryBuilder<Model, Model[]>): void => {
  void builder.select('id', 'isLike', 'userId');
};

export { modifyReactionsGraph };
