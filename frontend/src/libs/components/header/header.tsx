import { Avatar, Link, Modal } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useLocation,
  useModal,
  useState,
} from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { DropDown } from './dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }) => {
  const { handleToggleModalOpen, isOpen } = useModal();

  const location = useLocation();

  const [previousLocation, setPreviousLocation] = useState(location);

  useEffect(() => {
    if (isOpen && location !== previousLocation) {
      handleToggleModalOpen();
      setPreviousLocation(location);
    }
  }, [location, previousLocation, isOpen, handleToggleModalOpen]);

  const closeDropdown = useCallback((): void => {
    if (isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  const handleClickOnAvatar = useCallback((): void => {
    if (!isOpen) {
      handleToggleModalOpen();
    }
  }, [handleToggleModalOpen, isOpen]);

  return (
    <>
      {user && (
        <div className={styles.outerheader}>
          <header className={styles.header}>
            <Link to={AppRoute.ROOT} className={styles.logo}>
              WRITORIUM
            </Link>

            <button
              className={styles.avatarButton}
              onClick={handleClickOnAvatar}
            >
              <Avatar
                username={getFullName(user.firstName, user.lastName)}
                avatarUrl={null}
              />
            </button>
          </header>

          {isOpen && (
            <Modal
              isOpen
              onClose={closeDropdown}
              className={`${styles.dropdownModal} ${
                styles.dropdownModalStyle
              } ${isOpen ? styles.open : ''}`}
            >
              <DropDown />
            </Modal>
          )}
        </div>
      )}
    </>
  );
};

export { Header };
