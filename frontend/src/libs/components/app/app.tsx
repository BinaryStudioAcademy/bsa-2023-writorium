import {
  Header,
  Loader,
  Notification,
  RouterOutlet,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { actions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  const { user, dataStatus } = useAppSelector(({ auth }) => ({
    user: auth.user,
    dataStatus: auth.dataStatus,
  }));
  const dispatch = useAppDispatch();
  const hasUser = Boolean(user);

  const isLoading = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );

  useEffect(() => {
    if (!hasUser) {
      void dispatch(actions.getCurrentUser());
    }
  }, [hasUser, dispatch]);

  return (
    <>
      <Loader isLoading={isLoading} hasOverlay type="circular">
        <Header user={user} />
        <div className={styles.container}>
          <RouterOutlet />
        </div>
      </Loader>
      <Notification />
    </>
  );
};

export { App };
