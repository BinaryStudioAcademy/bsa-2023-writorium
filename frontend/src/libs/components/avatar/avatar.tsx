import { Link } from '~/libs/components/link/link.jsx';
import { AppRoute } from '~/libs/enums/app-route.enum';
import { getFirstLetters } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  username: string;
  avatarUrl?: string | null;
};

const Avatar: React.FC<Properties> = ({ avatarUrl, username }) => {
  return (
    <div className={styles['avatar-info']}>
      <Link to={AppRoute.PROFILE}>
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className={styles.avatar} />
        ) : (
          <div className={`${styles.avatar} ${styles.defaultAvatar}`}>
            <span className={styles.initials}>{getFirstLetters(username)}</span>
          </div>
        )}
      </Link>
    </div>
  );
};

export { Avatar };
