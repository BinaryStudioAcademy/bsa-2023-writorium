import { getFirstLetters, getValidClassNames } from '~/libs/helpers/helpers.js';

import styles from './styles.module.scss';

type Properties = {
  username: string;
  avatarUrl: string | null;
  className?: string;
};

const Avatar: React.FC<Properties> = ({ avatarUrl, username, className }) => {
  if (!avatarUrl) {
    return (
      <span
        className={getValidClassNames(
          styles.avatar,
          styles.defaultAvatar,
          className,
        )}
      >
        <span className={styles.initials}>{getFirstLetters(username)}</span>
      </span>
    );
  }

  return <img src={avatarUrl} alt="avatar" className={styles.avatar} />;
};

export { Avatar };
