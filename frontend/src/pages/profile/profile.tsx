import { Avatar } from '~/libs/components/avatar/avatar.js';
import { Button } from '~/libs/components/components.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

import styles from './styles.module.scss';

const mockedUser = {
  id: 1,
  email: 'test@gmail.com',
  firstName: 'John',
  lastName: 'Doe',
};

const Profile: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  const currentUser = user ?? mockedUser;
  const userName = `${currentUser.firstName} ${currentUser.lastName}`;

  return (
    <div className={styles.profile}>
      <div className={styles.userInfoBlock}>
        <div className={styles.avatar}>
          <Avatar username={userName} avatarUrl={null} />
        </div>
        <div className={styles.userInfo}>
          <p>{userName}</p>
          <p>{currentUser.email}</p>
        </div>
        <Button label="Edit profile" className={styles.editProfileBtn} />
      </div>
    </div>
  );
};

export { Profile };
