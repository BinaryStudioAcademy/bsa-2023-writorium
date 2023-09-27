import { Avatar, Button } from '~/libs/components/components.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ProfileEditForm } from '../../components/components.js';
import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  className?: string;
};

const UserInfo: React.FC<Properties> = ({ user, className }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userName = getFullName(user.firstName, user.lastName);

  const handleEditMode = useCallback(
    (value = true) => setIsEditingProfile(value),
    [],
  );

  return (
    <div className={styles.userInfoContainer}>
      <h3 className={styles.title}>Your details</h3>
      <div className={getValidClassNames(className, styles.userInfoBlock)}>
        {isEditingProfile ? (
          <ProfileEditForm user={user} onEdit={handleEditMode} />
        ) : (
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
                variant="greenOutlined"
                label="Edit profile"
                onClick={handleEditMode}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export { UserInfo };
