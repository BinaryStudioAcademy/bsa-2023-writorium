import { Header, RouterOutlet } from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/data-status.enum.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { storage,StorageKey } from '~/libs/packages/storage/storage.js';
import { actions } from '~/slices/auth/auth.js';

import { Loader } from '../loader/loader.js';
import styles from './styles.module.scss';

const App: React.FC = () => {
  const { user, dataStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    dataStatus: auth.dataStatus,
  }));
  const dispatch = useAppDispatch();
  const hasUser = Boolean(user);
  const hasToken = Boolean(storage.get(StorageKey.TOKEN));

  if (hasUser && !hasToken) {
    void dispatch(actions.logout());
  }

  const isLoading = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );

  useEffect(() => {
    if (hasToken) {
      void dispatch(actions.getCurrentUser());
    }
  }, [hasToken, dispatch]);

  return (
    <Loader isLoading={isLoading}>
      <>
        <Header user={null} />
        <div className={styles.container}>
          <RouterOutlet />
        </div>
      </>
    </Loader>
  );
};

export { App };
