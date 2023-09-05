import { Avatar, Button, Layout } from '~/libs/components/components.js';
import { useAppSelector, useCallback, useState } from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { ProfileEditForm } from './components/components.js';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user as UserAuthResponseDto,
  }));
  const userName = `${user.firstName} ${user.lastName}`;

  const handleEditMode = useCallback(
    (value = true) => setIsEditingProfile(value),
    [],
  );

  return (
    <Layout>
      <div className={styles.profile}>
        <div className={styles.userInfoBlock}>
          {isEditingProfile ? (
            <ProfileEditForm user={user} onEdit={handleEditMode} />
          ) : (
            <>
              <Avatar
                username={userName}
                avatarUrl={user.avatarUrl}
                className={styles.avatar}
              />
              <div className={styles.userInfo}>
                <p>{userName}</p>
                <p>{user.email}</p>
              </div>
              <Button
                label="Edit profile"
                className={styles.editProfileBtn}
                onClick={handleEditMode}
              />
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export { Profile };
