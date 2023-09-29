import { Layout, Spoiler } from '~/libs/components/components.js';
import { WindowBreakpoint } from '~/libs/enums/enums.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
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
  const { user, userActivities } = useAppSelector(
    ({ auth, users, articles }) => ({
      user: auth.user as UserAuthResponseDto,
      userActivities: users.userActivities,
      articles: articles.articles,
    }),
  );

  useEffect(() => {
    void dispatch(usersActions.getUserActivity());
  }, [dispatch]);

  return (
    <Layout>
      <div className={styles.profile}>
        <UserInfo
          user={user}
          className={getValidClassNames(styles.userInfo, styles.profileBlock)}
        />
        <Spoiler breakpoint={WindowBreakpoint.MEDIUM} summary="Achievements">
          <UserAchievements
            className={getValidClassNames(
              styles.profileBlock,
              styles.achievements,
            )}
          />
        </Spoiler>
        <Spoiler
          breakpoint={WindowBreakpoint.MEDIUM}
          summary="Your writing activity"
        >
          <UserActivity
            userActivities={userActivities}
            className={getValidClassNames(styles.profileBlock, styles.activity)}
          />
        </Spoiler>
        <Spoiler breakpoint={WindowBreakpoint.MEDIUM} summary="Genre stats">
          <UserArticlesGenresStats
            className={getValidClassNames(styles.profileBlock, styles.stats)}
          />
        </Spoiler>
        <Spoiler
          breakpoint={WindowBreakpoint.MEDIUM}
          summary="Your latest articles"
        >
          <UserLatestArticles
            className={getValidClassNames(
              styles.profileBlock,
              styles.latestArticles,
            )}
          />
        </Spoiler>
      </div>
    </Layout>
  );
};

export { ProfilePage };
