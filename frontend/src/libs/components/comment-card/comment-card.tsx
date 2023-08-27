import { Avatar, Icon, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
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
        <div className={styles.userInfo}>
          <Link to={AppRoute.PROFILE}>
            <Avatar username={userName} avatarUrl={null} />
          </Link>
          <span className={styles.userName}>{userName}</span>
          <span className={styles.publicationTime}>{createdAt}</span>
        </div>
        <div className={styles.iconWrapper}>
          <Icon iconName="share" className={styles.shareIcon} />
          <Icon iconName="link" className={styles.linkIcon} />
        </div>
      </div>

      <p className={styles.text}>{text}</p>
    </section>
  );
};

export { CommentCard };
