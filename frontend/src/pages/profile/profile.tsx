import { Avatar, Button, Layout } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useEffect,
  useState,
} from '~/libs/hooks/hooks.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { ProfileEditForm, UserActivity } from './components/components.js';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user, userActivity } = useAppSelector(({ auth, users }) => ({
    user: auth.user as UserAuthResponseDto,
    userActivity: users.userActivity,
  }));
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const userName = `${user.firstName} ${user.lastName}`;

  const handleEditMode = useCallback(
    (value = true) => setIsEditingProfile(value),
    [],
  );

  useEffect(() => {
    void dispatch(usersActions.getUserActivity());
  }, [dispatch]);

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
        <UserActivity userActivity={userActivity} />
      </div>
    </Layout>
  );
};

export { Profile };
