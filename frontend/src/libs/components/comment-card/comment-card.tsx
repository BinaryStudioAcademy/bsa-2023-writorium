import { Avatar, Icon } from '~/libs/components/components.js';
import { getTimeFromCreation } from '~/libs/helpers/helpers.js';
import { type Comment } from '~/libs/types/comment.type.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import styles from './styles.module.scss';

type Properties = {
  user: UserAuthResponseDto;
  comment: Comment;
};

const CommentCard: React.FC<Properties> = ({ user, comment }) => {
  const { firstName, lastName } = user;
  const { text, createdAt } = comment;
  const userName = `${firstName} ${lastName}`;

  return (
    <section className={styles.comment}>
      <div className={styles.header}>
        <div className={styles.info}>
          <div className={styles.userInfo}>
            <Avatar
              username={userName}
              avatarUrl={null}
              className={styles.avatar}
            />
            <span className={styles.userName}>{userName}</span>
            <span className={styles.indicator}></span>
          </div>
          <span className={styles.publicationTime}>
            {getTimeFromCreation(createdAt)} ago
          </span>
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
