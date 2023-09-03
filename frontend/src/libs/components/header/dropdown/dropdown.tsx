import { Button, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { useAppDispatch, useCallback } from '~/libs/hooks/hooks.js';
import { actions as authActions } from '~/slices/auth/auth.js';

import styles from './styles.module.scss';

type Properties = {
  trigger: {
    handleToggleModalOpen: () => void;
    isOpen: boolean;
  };
};

const Dropdown: React.FC<Properties> = ({ trigger }) => {
  const dispatch = useAppDispatch();

  const handleLogout = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  const handleLinkClick = (): void => {
    if (trigger.isOpen) {
      trigger.handleToggleModalOpen();
    }
  };

  return (
    <div className={styles.dropdown}>
      <Link
        className={styles.profileLink}
        to={AppRoute.PROFILE}
        onClick={handleLinkClick}
      >
        Profile
      </Link>

      <Button
        type="button"
        name="Logout"
        label="Logout"
        className={styles.logoutBtn}
        onClick={handleLogout}
      />
    </div>
  );
};

export { Dropdown };
