import { Button, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

const DropDown: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleSignOut = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  return (
    <div className={styles.dropdown}>
      <Link className={styles.profileLink} to={AppRoute.PROFILE}>
        Profile
      </Link>

      <Button
        type="button"
        name="Logout"
        label="Logout"
        className={styles.logoutBtn}
        onClick={handleSignOut}
      />
    </div>
  );
};

export { DropDown };
