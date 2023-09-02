import { Avatar, Link, Modal } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { getFullName } from '~/libs/helpers/helpers.js';
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { DropDown } from './dropdown/dropdown.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto | null;
};

const Header: React.FC<Properties> = ({ user }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const avatarReference = useRef<HTMLDivElement>(null);

  const closeDropdown = useCallback((): void => {
    setIsDropdownOpen(false);
  }, [isDropdownOpen]);

  const handleClickOnAvatar = useCallback((): void => {
    setIsDropdownOpen(true);
  }, [avatarReference]);

  useEffect(() => {
    const avatarElement = avatarReference.current;
    if (!avatarElement) {
      return;
    }
    avatarElement.addEventListener('click', handleClickOnAvatar);

    return () => {
      avatarElement.removeEventListener('click', handleClickOnAvatar);
    };
  }, [avatarReference, handleClickOnAvatar]);

  return (
    <>
      {user && (
        <div className={styles.outerheader}>
          <header className={styles.header}>
            <Link to={AppRoute.ROOT} className={styles.logo}>
              WRITORIUM
            </Link>

            <div className={styles.avatarWrapper} ref={avatarReference}>
              <Avatar
                username={getFullName(user.firstName, user.lastName)}
                avatarUrl={null}
              />
            </div>
          </header>

          <Modal
            isOpen={isDropdownOpen}
            onClose={closeDropdown}
            className={`${styles.dropdownModal} ${styles.dropdownModalStyle}`}
          >
            <DropDown />
          </Modal>
        </div>
      )}
    </>
  );
};

export { Header };
