import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';
import { type ArticleType } from '~/pages/articles/libs/types/types.js';

import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleType;
  user: UserAuthResponseDto;
};

const ArticleCard: React.FC<Properties> = ({ article, user }) => {
  const {
    publishedAt,
    timeSincePublication,
    title,
    text,
    comments,
    views,
    likes,
    dislikes,
    tags,
  } = article;

  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar username={fullName} avatarUrl={null} />
          <span className={styles.publisherName}>{fullName}</span>
          <span className={styles.publicationTime}>{publishedAt}</span>
          <span className={styles.publicationTime}>{timeSincePublication}</span>
        </div>
        <Icon iconName="favorite" className={styles.icon} />
      </div>
      <div className={styles.body}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.text}>{text}</p>
          <Tags tags={tags} />
        </div>
        <img
          src={ArticlePreview}
          alt="article preview"
          className={styles.preview}
        />
      </div>
      <div className={styles.footer}>
        <ul className={styles.reactions}>
          <li className={styles.reaction}>
            <Icon iconName="comment" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{comments}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="view" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{views}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="like" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{likes}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="dislike" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{dislikes}</span>
          </li>
        </ul>
        <Icon iconName="share" className={styles.icon} />
        <Link to={AppRoute.ARTICLE} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
