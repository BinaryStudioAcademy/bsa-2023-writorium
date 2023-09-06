import { Button } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import {
  useAppDispatch,
  useCallback,
  useNavigate,
} from '~/libs/hooks/hooks.js';
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

  const navigate = useNavigate();

  const handleLogout = useCallback((): void => {
    void dispatch(authActions.logout());
  }, [dispatch]);

  const handleProfileClick = (): void => {
    if (trigger.isOpen) {
      trigger.handleToggleModalOpen();
    }
    navigate(AppRoute.PROFILE);
  };

  return (
    <div className={styles.dropdown}>
      <Button
        type="button"
        name="Profile"
        label="Profile"
        onClick={handleProfileClick}
        className={styles.profileLink}
      />

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
