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
    <Link to={AppRoute.PROFILE} className={styles['avatar-info']}>
      {avatarUrl ? (
        <img src={avatarUrl} alt="avatar" className={styles.avatar} />
      ) : (
        <span className={`${styles.avatar} ${styles.defaultAvatar}`}>
          <span className={styles.initials}>{getFirstLetters(username)}</span>
        </span>
      )}
    </Link>
  );
};

export { Avatar };
