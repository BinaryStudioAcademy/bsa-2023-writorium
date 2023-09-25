import { type FC } from 'react';

import { Avatar, Button } from '~/libs/components/components.js';
import { getFullName, getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { ProfileEditForm } from '~/pages/profile/components/components.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  className?: string;
};

const UserInfo: FC<Properties> = ({ user, className }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const userName = getFullName(user.firstName, user.lastName);

  const handleEditMode = useCallback(
    (value = true) => setIsEditingProfile(value),
    [],
  );

  return (
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
              variant="outlined"
              label="Edit profile"
              onClick={handleEditMode}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export { UserInfo };
