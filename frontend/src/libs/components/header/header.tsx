import {
  Avatar,
  Button,
  Icon,
  Layout,
  Link,
  Popover,
} from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }) => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <>
      {user && (
        <header className={styles.header}>
          <Layout className={styles.layout}>
            <Link to={AppRoute.ARTICLES}>
              <Icon iconName="writoriumLogo" className={styles.logo} />
            </Link>
            <div className={styles.rightSide}>
              <Link to={AppRoute.CREATE_ARTICLE} className={styles.writeLink}>
                Write
              </Link>
              <Popover
                content={
                  <>
                    <Link
                      to={AppRoute.CREATE_ARTICLE}
                      className={styles.popoverWriteLink}
                    >
                      Write
                    </Link>
                    <Link className={styles.profileLink} to={AppRoute.PROFILE}>
                      Profile
                    </Link>
                    <Button
                      variant="text"
                      type="button"
                      name="Logout"
                      label="Logout"
                      className={styles.logoutBtn}
                      onClick={handleLogout}
                    />
                  </>
                }
              >
                <Avatar
                  className={styles.avatar}
                  username={getFullName(user.firstName, user.lastName)}
                  avatarUrl={user.avatarUrl}
                />
              </Popover>
            </div>
          </Layout>
        </header>
      )}
    </>
  );
};

export { Header };
