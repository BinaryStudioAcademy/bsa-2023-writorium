import { default as cloneDeep } from 'lodash.clonedeep';
import { default as isEqual } from 'lodash.isequal';
import { type DependencyList, type EffectCallback } from 'react';
import React from 'react';

function useDeepCompareMemoize<T>(value: T): T {
  const reference = React.useRef<T>(value);
  const signalReference = React.useRef<number>(0);

  if (!isEqual(value, reference.current)) {
    reference.current = cloneDeep(value);
    signalReference.current += 1;
  }

  return React.useMemo(() => reference.current, [signalReference.current]);
}

function useDeepCompareEffect(
  callback: EffectCallback,
  dependencies: DependencyList,
): void {
  return React.useEffect(callback, [
    useDeepCompareMemoize(dependencies),
    callback,
  ]);
}

export { useDeepCompareEffect };
