import { Avatar, Button, Modal } from '~/libs/components/components.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useModal } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ProfileEditForm } from '../../components/components.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  className?: string;
};

const UserInfo: React.FC<Properties> = ({ user, className }) => {
  const { isOpen, handleToggleModalOpen } = useModal();
  const userName = getFullName(user.firstName, user.lastName);

  const handleModalClose = useCallback(() => {
    if (isOpen) {
      handleToggleModalOpen();
    }
    return false;
  }, [handleToggleModalOpen, isOpen]);

  return (
    <div className={getValidClassNames(className, styles.userInfoBlock)}>
      <div className={styles.userInfoWrapper}>
        <Avatar
          username={userName}
          avatarUrl={user.avatarUrl}
          className={styles.avatar}
        />
        <div>
          <div className={styles.userInfo}>
            <p className={styles.userName}>{userName}</p>
            <p className={styles.userEmail}>{user.email}</p>
          </div>
          <Button
            className={styles.editButton}
            variant="outlined"
            label="Edit profile"
            onClick={handleToggleModalOpen}
          />
        </div>
      </div>
      <Modal
        onClose={handleModalClose}
        isOpen={isOpen}
        contentClassName={styles.modalEditForm}
      >
        <ProfileEditForm user={user} onEdit={handleModalClose} />
      </Modal>
    </div>
  );
};

export { UserInfo };
