import { type FC } from 'react';

import { Avatar, Button } from '~/libs/components/components.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useAppDispatch, useCallback, useState } from '~/libs/hooks/hooks.js';
import {
  type UserAuthResponseDto,
  type UserUpdateRequestDto,
} from '~/packages/users/users.js';
import { ProfileEditForm } from '~/pages/profile/components/components.js';
import { actions as usersActions } from '~/slices/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  className?: string;
};

const UserInfo: FC<Properties> = ({ user, className }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const dispatch = useAppDispatch();

  const userName = `${user.firstName} ${user.lastName}`;

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
    <div className={getValidClassNames(className, styles.userInfoBlock)}>
      <Avatar username={userName} avatarUrl={null} className={styles.avatar} />
      {isEditingProfile ? (
        <ProfileEditForm
          user={user}
          onUpdateUser={handleUpdateUser}
          onEdit={handleEditMode}
        />
      ) : (
        <>
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
  );
};

export { UserInfo };
