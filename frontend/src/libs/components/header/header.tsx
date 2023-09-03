import { Avatar, Link, Popover } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import { useCallback, useModal } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { Dropdown } from './dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }) => {
  const { handleToggleModalOpen, isOpen } = useModal();

  const handleAvatarClick = useCallback((): void => {
    if (!isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <>
      {user && (
        <div>
          <header className={styles.header}>
            <Link to={AppRoute.ROOT} className={styles.logo}>
              WRITORIUM
            </Link>

            <button className={styles.avatarButton} onClick={handleAvatarClick}>
              <Avatar
                username={getFullName(user.firstName, user.lastName)}
                avatarUrl={null}
              />
            </button>
          </header>

          <Popover
            trigger={{ handleToggleModalOpen, isOpen }}
            content={<Dropdown trigger={{ handleToggleModalOpen, isOpen }} />}
            className={`${styles.dropdown} ${styles.dropdownModal} ${
              isOpen ? styles.open : ''
            }`}
          />
        </div>
      )}
    </>
  );
};

export { Header };
