import { getFirstLetters, getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  username: string;
  avatarUrl: string | null;
};

const Avatar: React.FC<Properties> = ({ avatarUrl, username }) => {
  if (!avatarUrl) {
    return (
      <div className={styles.avatarInfo}>
        <span
          className={getValidClassNames(styles.avatar, styles.defaultAvatar)}
        >
          <span className={styles.initials}>{getFirstLetters(username)}</span>
        </span>
      </div>
    );
  }

  return (
    <div className={styles.avatarInfo}>
      <img src={avatarUrl} alt="avatar" className={styles.avatar} />
    </div>
  );
};

export { Avatar };
