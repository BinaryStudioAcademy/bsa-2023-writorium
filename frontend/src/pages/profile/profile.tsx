import { Button } from '~/libs/components/components.js';
import { useAppSelector } from '~/libs/hooks/hooks.js';

import avatar from '../../assets/img/avatar.jpg';
import styles from './styles.module.scss';

const Profile: React.FC = () => {
  const { user } = useAppSelector(({ auth }) => ({
    user: auth.user,
  }));

  return (
    <div className={styles.profile}>
      <div className={styles.user_info_block}>
        <div className={styles.user_avatar}>
          <img className={styles.user_avatar_image} src={avatar} alt="avatar" />
        </div>
        <div className={styles.user_info}>
          <p>{`${user?.firstName} ${user?.lastName}`}</p>
          <p>{user?.email}</p>
        </div>
        <Button label="Edit profile" className="edit_profile" />
      </div>
    </div>
  );
};

export { Profile };
