import { checkIsEqual, cloneDeep } from '~/libs/helpers/helpers.js';

import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef as useReference,
} from '../hooks.js';

const useDeepCompareMemoize = <T>(value: T): T => {
  const reference = useReference<T>(value);
  if (!checkIsEqual(value, reference.current)) {
    reference.current = cloneDeep(value);
  }
  return reference.current;
};

const useDeepCompareEffect = (
  callback: EffectCallback,
  dependencies: DependencyList,
): void => {
  return useEffect(callback, [useDeepCompareMemoize(dependencies), callback]);
};

export { useDeepCompareEffect };
