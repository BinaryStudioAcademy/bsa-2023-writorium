import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon, Link } from '~/libs/components/components.js';
import { AppRoute } from '~/libs/enums/enums.js';
import { type ArticleBaseResponseDto } from '~/packages/articles/articles.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ReactionsType, type TagType } from '../../libs/types/types.js';
import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleBaseResponseDto;
  user: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionsType;
};

const ArticleCard: React.FC<Properties> = ({
  article,
  user,
  tags,
  reactions,
}) => {
  const { publishedAt, title, text } = article;
  const { comments, views, likes, dislikes } = reactions;

  const { firstName, lastName } = user;
  const fullName = `${firstName} ${lastName}`;
  const publicationTime = new Date(publishedAt as string)
    .toString()
    .split(' ')
    .slice(1, 3)
    .join(' ');
  const MOCKED_READ_TIME = '7 min read';

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar username={fullName} avatarUrl={null} />
          <span className={styles.publisherName}>{fullName}</span>
          <span className={styles.publicationTime}>{publicationTime}</span>
          <span className={styles.publicationTime}>{MOCKED_READ_TIME}</span>
        </div>
        <Icon iconName="favorite" className={styles.icon} />
      </div>
      <div className={styles.body}>
        <div className={styles.articleInfo}>
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
        <Link to={AppRoute.ROOT} className={styles.readMore}>
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
