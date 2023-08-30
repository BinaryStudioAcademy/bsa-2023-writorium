import { Avatar } from '~/libs/components/avatar/avatar.js';
import { Button } from '~/libs/components/components.js';
import {
  useAppDispatch,
  useAppSelector,
  useCallback,
  useState,
} from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponseDto,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { actions as usersActions } from '~/slices/users/users.js';

import { ProfileEditForm } from './components/components.js';
import styles from './styles.module.scss';

const mockedUser = {
  id: 1,
  email: 'test@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
};

const Profile: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user as UserAuthResponseDto,
  }));
  const dispatch = useAppDispatch();

  const currentUser = user ?? mockedUser;
  const userName = `${currentUser.firstName} ${currentUser.lastName}`;

  const handleUpdateUser = useCallback(
    (payload: UserUpdateRequestDto): void => {
      void dispatch(usersActions.updateUser(payload));
    },
    [dispatch],
  );

  const handleEditMode = useCallback(
    (value = true) => setIsEditingProfile(value),
    [],
  );

  return (
    <div className={styles.profile}>
      <div className={styles.userInfoBlock}>
        <Avatar
          username={userName}
          avatarUrl={null}
          className={styles.avatar}
        />
        {isEditingProfile ? (
          <ProfileEditForm
            user={currentUser}
            onUpdateUser={handleUpdateUser}
            onEdit={handleEditMode}
          />
        ) : (
          <>
            <div className={styles.userInfo}>
              <p>{userName}</p>
              <p>{currentUser.email}</p>
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
  );
};

export { Profile };
