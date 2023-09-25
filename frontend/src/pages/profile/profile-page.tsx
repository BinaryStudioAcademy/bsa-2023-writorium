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
  UserLatestArticles,
} from './components/components.js';
import styles from './styles.module.scss';

const ProfilePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, userActivities } = useAppSelector(({ auth, users }) => ({
    user: auth.user as UserAuthResponseDto,
    userActivities: users.userActivities,
  }));

  useEffect(() => {
    void dispatch(usersActions.getUserActivity());
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.profile}>
        <UserInfo user={user} className={styles.profileBlock} />
        <UserActivity
          userActivities={userActivities}
          className={styles.profileBlock}
        />
        <UserLatestArticles />
        <UserAchievements className={styles.profileBlock} />
        <UserArticlesGenresStats className={styles.profileBlock} />
      </div>
    </Layout>
  );
};

export { ProfilePage };
