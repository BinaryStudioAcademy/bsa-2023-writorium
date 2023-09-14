import { type DependencyList, type EffectCallback } from 'react';
import React from 'react';

import { checkIsEqual, cloneDeep } from '~/libs/helpers/helpers.js';

const useDeepCompareMemoize = <T>(value: T): T => {
  const reference = React.useRef<T>(value);
  if (!checkIsEqual(value, reference.current)) {
    reference.current = cloneDeep(value);
  }
  return reference.current;
};

const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
): void => {
  return React.useEffect(callback, [
    useDeepCompareMemoize(dependencies),
    callback,
  ]);
};

export { useDeepCompareEffect };
