import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link, Tag } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type UserAuthResponseDto } from '~/packages/users/users.js';

import { type ArticleType } from './libs/types/types.js';
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
  const renderTags = tags.map((tag) => <Tag key={tag.id} name={tag.name} />);

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar username={fullName} avatarUrl={null} />
          <span className={styles.publisherName}>{fullName}</span>
          <span className={styles.publicationTime}>{publishedAt}</span>
          <span className={styles.publicationTime}>{timeSincePublication}</span>
        </div>
        <Icon iconName="favorite" className={styles.favoriteIcon} />
      </div>
      <div className={styles.body}>
        <div>
          <h4 className={styles.title}>{title}</h4>
          <p className={styles.text}>{text}</p>
          <div className={styles.tags}>{renderTags}</div>
        </div>
        <img
          src={ArticlePreview}
          alt="article preview"
          width="134"
          height="134"
          className={styles.preview}
        />
      </div>
      <div className={styles.footer}>
        <div className={styles.reactions}>
          <div className={styles.reaction}>
            <Icon iconName="comment" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{comments}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="view" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{views}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="like" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{likes}</span>
          </div>
          <div className={styles.reaction}>
            <Icon iconName="dislike" className={styles.reactionIcon} />
            <span className={styles.reactionCount}>{dislikes}</span>
          </div>
          <Icon iconName="share" className={styles.reactionIcon} />
        </div>
        <Link to={AppRoute.ROOT} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
