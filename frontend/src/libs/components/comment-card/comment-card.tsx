import { Avatar, Icon } from '~/libs/components/components.js';
import {
  getDateDifferenceWithUnit,
  getFullName,
  getPublicationTime,
} from '~/libs/helpers/helpers.js';
import { type CommentBaseResponseDto } from '~/packages/comments/comments.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserDetailsResponseDto;
  comment: CommentBaseResponseDto;
};

const CommentCard: React.FC<Properties> = ({ user, comment }) => {
  const { firstName, lastName, avatarUrl } = user;
  const { text, createdAt } = comment;
  const userName = getFullName(firstName, lastName);

  const { diff, unit } = getDateDifferenceWithUnit(createdAt);
  const publicationTime = getPublicationTime(diff, unit);

  return (
    <section className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <Avatar
              username={userName}
              avatarUrl={avatarUrl}
              className={styles.avatar}
            />
            <span className={styles.userName}>{userName}</span>
            <span className={styles.indicator}></span>
          </div>
          <span className={styles.publicationTime}>{publicationTime} ago</span>
        </div>
        <div className={styles.iconWrapper}>
          <Icon iconName="link" className={styles.linkIcon} />
          <Icon iconName="share" className={styles.shareIcon} />
        </div>
      </div>
      <p className={styles.text}>{text}</p>
    </section>
  );
};

export { CommentCard };
