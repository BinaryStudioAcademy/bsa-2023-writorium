import { default as isEqual } from 'lodash.isequal';

function checkIsEqual<T>(value1: T, value2: T): boolean {
  return isEqual(value1, value2);
}

export { checkIsEqual };
