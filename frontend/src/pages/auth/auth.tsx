import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type UserSignUpRequestDto } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import { SignInForm, SignUpForm } from './components/components.js';
import styles from './styles.module.scss';

const Auth: React.FC = () => {
  const dispatch = useAppDispatch();
  const { dataStatus } = useAppSelector(({ auth }) => ({
    dataStatus: auth.dataStatus,
  }));
  const { pathname } = useLocation();

  const handleSignInSubmit = useCallback((): void => {
    /**
     * @todo implement sign in handling
     */
  }, []);

  const handleSignUpSubmit = useCallback(
    (payload: UserSignUpRequestDto): void => {
      void dispatch(authActions.signUp(payload));
    },
    [dispatch],
  );

  const getScreen = (screen: string): React.ReactNode => {
    switch (screen) {
      case AppRoute.SIGN_IN: {
        return <SignInForm onSubmit={handleSignInSubmit} />;
      }
      case AppRoute.SIGN_UP: {
        return <SignUpForm onSubmit={handleSignUpSubmit} />;
      }
    }

    return null;
  };

  return (
    <div className={styles.authLayout}>
      <div className={styles.authFormWrapper}>
        state: {dataStatus}
        {getScreen(pathname)}
      </div>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>WRITORIUM</h1>
      </div>
    </div>
  );
};

export { Auth };
