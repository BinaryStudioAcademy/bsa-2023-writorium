import { type To as RedirectTo } from 'react-router-dom';

import {
  Header,
  Loader,
  Notification,
  RouterOutlet,
  ScrollRestoration,
} from '~/libs/components/components.js';
import { DataStatus } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useApplicationRoom,
  useAppSelector,
  useArticlesFeedRoom,
  useEffect,
  useNavigate,
} from '~/libs/hooks/hooks.js';
import { actions as appActions } from '~/slices/app/app.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

const App: React.FC = () => {
  const { redirectTo, user, dataStatus } = useAppSelector(({ app, auth }) => ({
    redirectTo: app.navigateTo,
    user: auth.user,
    dataStatus: auth.dataStatus,
  }));
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  useArticlesFeedRoom();

  const hasUser = Boolean(user);

  const isLoading = !(
    dataStatus === DataStatus.FULFILLED || dataStatus == DataStatus.REJECTED
  );

  useApplicationRoom(user ? user.id : null);

  useEffect(() => {
    if (redirectTo) {
      navigate(redirectTo as RedirectTo);

      dispatch(appActions.navigate(null));
    }
  }, [redirectTo, navigate, dispatch]);

  useEffect(() => {
    if (!hasUser) {
      void dispatch(authActions.getCurrentUser());
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
      <ScrollRestoration />
    </>
  );
};

export { App };
