import { Link as RouterLink, matchPath } from 'react-router-dom';

import {
  Avatar,
  Icon,
  IconButton,
  Link,
} from '~/libs/components/components.js';
import { ShareOnFacebookButton } from '~/libs/components/share-on-facebook-icon/share-on-facebook-icon.js';
import { AppRoute, ArticleSubRoute, DateFormat } from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getFullName,
  getReactionsInfo,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useLocation,
} from '~/libs/hooks/hooks.js';
import {
  type ArticleWithRelationsType,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type UserAuthResponseDto,
  type UserDetailsResponseDto,
} from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { MOCKED_REACTIONS } from '../../libs/constants.js';
import { type TagType } from '../../libs/types/types.js';
import { Tags } from '../components.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithRelationsType;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionResponseDto[];
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
}) => {
  const user = useAppSelector(({ auth }) => auth.user) as UserAuthResponseDto;
  const { pathname } = useLocation();
  const dispatch = useAppDispatch();

  const isMyArticles = matchPath(
    { path: `${AppRoute.ARTICLES}/${ArticleSubRoute.MY_ARTICLES}` },
    pathname,
  );
  const { publishedAt, title, text, id, userId, coverUrl } = article;
  const MOCKED_READ_TIME = '7 min read';
  const { likeCount, dislikeCount, isLike } = getReactionsInfo(
    user.id,
    reactions,
  );
  const articleUrl = window.location.href;
  const articleRouteById = AppRoute.ARTICLE.replace(':id', String(id));
  const isOwnArticle = user.id === userId;

  const handleReaction = (isLike: boolean): void => {
    if (!isOwnArticle) {
      void dispatch(articlesActions.reactToArticle({ isLike, articleId: id }));
    }
  };

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
            <RouterLink
              to={AppRoute.EDIT_ARTICLE.replace(':id', id.toString())}
              state={article}
            >
              <Icon iconName="edit" className={styles.editIcon} />
            </RouterLink>
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
          <img src={coverUrl} alt="article cover" className={styles.cover} />
        )}
      </div>
      <div className={styles.footer}>
        <ul className={styles.reactions}>
          <li>
            <IconButton
              iconName="comment"
              className={styles.footerIcon}
              label={MOCKED_REACTIONS.comments}
            />
          </li>
          <li className={styles.footerIcon}>
            <Icon iconName="view" />
            <span>{MOCKED_REACTIONS.views}</span>
          </li>
          <li>
            <IconButton
              iconName="like"
              className={getValidClassNames(
                styles.footerIcon,
                isOwnArticle ? styles.disable : styles.reaction,
                isLike && styles.pressed,
              )}
              label={String(likeCount)}
              onClick={(): void => handleReaction(true)}
            />
          </li>
          <li>
            <IconButton
              iconName="dislike"
              className={getValidClassNames(
                styles.footerIcon,
                isOwnArticle ? styles.disable : styles.reaction,
                isLike === false && styles.pressed,
              )}
              label={String(dislikeCount)}
              onClick={(): void => handleReaction(false)}
            />
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
