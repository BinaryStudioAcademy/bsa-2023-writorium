import { useDispatch } from 'react-redux';

import { type store } from '~/libs/packages/store/store.js';

const useAppDispatch: () => typeof store.instance.dispatch = () =>
  useDispatch<typeof store.instance.dispatch>();

export { useAppDispatch };
