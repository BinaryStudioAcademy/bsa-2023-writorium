import { type DatabaseTableName } from '~/libs/packages/database/database.js';

type ReferenceTable =
  | typeof DatabaseTableName.ARTICLES
  | typeof DatabaseTableName.COMMENTS;

export { type ReferenceTable };
