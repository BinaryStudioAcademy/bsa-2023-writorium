import { default as _cloneDeep } from 'lodash.clonedeep';

const cloneDeep = <T>(value: T): T => {
  return _cloneDeep(value);
};

export { cloneDeep };
