import { Link as RouterLink, matchPath } from 'react-router-dom';

import {
  Avatar,
  Icon,
  IconButton,
  Link,
  ShareOnFacebookButton,
} from '~/libs/components/components.js';
import { AppRoute, ArticleSubRoute, DateFormat } from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getFullName,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import { useCallback, useLocation } from '~/libs/hooks/hooks.js';
import {
  type ArticleWithAuthorType,
  getReadTimeString,
} from '~/packages/articles/articles.js';
import { type UserDetailsResponseDto } from '~/packages/users/users.js';

import { type ReactionsType, type TagType } from '../../libs/types/types.js';
import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithAuthorType;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionsType;
  onDeleteArticle?: (id: number) => void;
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
  onDeleteArticle,
}) => {
  const { publishedAt, title, text, id, coverUrl, readTime } = article;
  const { pathname } = useLocation();

  const isMyArticles = matchPath(
    { path: `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}` },
    pathname,
  );
  const { comments, views, likes, dislikes } = reactions;
  const articleUrl = window.location.href;

  const articleRouteById = AppRoute.ARTICLE.replace(':id', String(id));

  const handleDeleteArticle = useCallback(() => {
    onDeleteArticle?.(id);
  }, [id, onDeleteArticle]);

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
          {readTime && (
            <span className={styles.publicationTime}>
              {getReadTimeString(readTime)}
            </span>
          )}
        </div>
        <div className={styles.iconWrapper}>
          {isMyArticles && (
            <>
              <IconButton
                className={styles.iconButton}
                iconName="trashBin"
                iconClassName={getValidClassNames(
                  styles.deleteIcon,
                  styles.pointerIcon,
                )}
                onClick={handleDeleteArticle}
              ></IconButton>
              <RouterLink
                to={AppRoute.EDIT_ARTICLE.replace(':id', id.toString())}
                state={article}
              >
                <Icon
                  iconName="edit"
                  className={getValidClassNames(
                    styles.editIcon,
                    styles.pointerIcon,
                  )}
                />
              </RouterLink>
            </>
          )}
          <Icon iconName="favorite" className={styles.pointerIcon} />
        </div>
      </div>
      <div
        className={getValidClassNames(styles.body, coverUrl && styles.hasCover)}
      >
        <div className={styles.articleInfo}>
          <h4 className={styles.title}>{title}</h4>
          <article
            className={getValidClassNames(styles.text, 'text-overflow')}
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(text) }}
          ></article>
          <Tags tags={tags} />
        </div>
        {coverUrl && (
          <div className={styles.coverWrapper}>
            <img src={coverUrl} alt="article cover" className={styles.cover} />
          </div>
        )}
      </div>
      <div className={styles.footer}>
        <ul className={styles.reactions}>
          <li className={styles.reaction}>
            <Icon iconName="comment" className={styles.pointerIcon} />
            <span className={styles.reactionCount}>{comments}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="view" />
            <span className={styles.reactionCount}>{views}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="like" className={styles.pointerIcon} />
            <span className={styles.reactionCount}>{likes}</span>
          </li>
          <li className={styles.reaction}>
            <Icon iconName="dislike" className={styles.pointerIcon} />
            <span className={styles.reactionCount}>{dislikes}</span>
          </li>
        </ul>
        <Icon iconName="share" className={styles.pointerIcon} />
        <ShareOnFacebookButton
          title={title}
          articleUrl={articleUrl}
          iconStyle={styles.facebookIconButton}
        />
        <Link
          to={articleRouteById as typeof AppRoute.ARTICLE}
          className={styles.readMore}
        >
          Read more
        </Link>
      </div>
    </article>
  );
};

export { ArticleCard };
