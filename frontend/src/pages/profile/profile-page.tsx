import { Layout } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
} from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import {
  UserAchievements,
  UserActivity,
  UserArticlesGenresStats,
  UserInfo,
} from './components/components.js';
import styles from './styles.module.scss';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, userActivity } = useAppSelector(({ auth, users }) => ({
    user: auth.user as UserAuthResponseDto,
    userActivity: users.userActivity,
  }));

  useEffect(() => {
    void dispatch(usersActions.getUserActivity());
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.profile}>
        <UserInfo user={user} className={styles.profileBlock} />
        <UserActivity
          userActivity={userActivity}
          className={styles.profileBlock}
        />
        <UserAchievements className={styles.profileBlock} />
        <UserArticlesGenresStats className={styles.profileBlock} />
      </div>
    </Layout>
  );
};

export { ProfilePage };
