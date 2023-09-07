import { Avatar, Icon, Link, Popover } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
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
            <Link to={AppRoute.ARTICLES}>
              <Icon iconName="writoriumLogo" className={styles.logo} />
            </Link>

            <div className={styles.rightSide}>
              <Link to={AppRoute.CREATE_ARTICLE} className={styles.writeLink}>
                Write
              </Link>

              <button
                className={styles.avatarButton}
                onClick={handleAvatarClick}
              >
                <Avatar
                  username={getFullName(user.firstName, user.lastName)}
                  avatarUrl={user.avatarUrl}
                />
              </button>
            </div>
          </header>

          <Popover
            trigger={{ handleToggleModalOpen, isOpen }}
            content={<Dropdown trigger={{ handleToggleModalOpen, isOpen }} />}
            className={getValidClassNames(
              styles.dropdown,
              styles.dropdownModal,
              isOpen && styles.open,
            )}
          />
        </div>
      )}
    </>
  );
};

export { Header };
