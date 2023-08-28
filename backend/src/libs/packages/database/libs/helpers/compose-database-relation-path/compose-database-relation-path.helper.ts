import {
  type AbstractModel,
  type DatabaseTableName,
} from '~/libs/packages/database/database.js';
import { type ValueOf } from '~/libs/types/types.js';

const composeDatabaseRelationPath = <T extends AbstractModel>(
  databaseTableName: ValueOf<typeof DatabaseTableName>,
  relationIdentifier: keyof T,
): string => {
  return `${databaseTableName}.${relationIdentifier.toString()}`;
};

export { composeDatabaseRelationPath };
