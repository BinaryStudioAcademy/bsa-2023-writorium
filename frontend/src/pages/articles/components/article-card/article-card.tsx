import { Link, matchPath } from 'react-router-dom';

import ArticlePreview from '~/assets/img/article-preview.png';
import { Avatar, Icon } from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute, DateFormat } from '~/libs/enums/enums.js';
import { getFormattedDate, getFullName } from '~/libs/helpers/helpers.js';
import { useLocation } from '~/libs/hooks/hooks.js';
import { type ArticleWithAuthorType } from '~/packages/articles/articles.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ReactionsType, type TagType } from '../../libs/types/types.js';
import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithAuthorType;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionsType;
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
}) => {
  const { pathname } = useLocation();

  const isMyArticles = matchPath(
    { path: `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}` },
    pathname,
  );
  const { publishedAt, title, text, id } = article;
  const { comments, views, likes, dislikes } = reactions;

  const MOCKED_READ_TIME = '7 min read';

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar
            username={getFullName(author.firstName, author.lastName)}
            avatarUrl={null}
          />
          <span className={styles.publisherName}>
            {getFullName(author.firstName, author.lastName)}
          </span>
          {publishedAt && (
            <span className={styles.publicationTime}>
              {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
            </span>
          )}
          <span className={styles.publicationTime}>{MOCKED_READ_TIME}</span>
        </div>
        <div className={styles.iconWrapper}>
          {isMyArticles && (
            <Link to={`${AppRoute.EDIT_ARTICLE_BASE}${id}`} state={article}>
              <Icon iconName="edit" className={styles.editIcon} />
            </Link>
          )}
          <Icon iconName="favorite" className={styles.icon} />
        </div>
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
