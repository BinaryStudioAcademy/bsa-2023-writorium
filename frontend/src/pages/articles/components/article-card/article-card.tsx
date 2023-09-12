import { Link as RouterLink, matchPath } from 'react-router-dom';

import {
  Avatar,
  Icon,
  IconButton,
  Link,
  ShareOnFacebookButton,
} from '~/libs/components/components.js';
import {
  AppRoute,
  ArticleSubRoute,
  DateFormat,
  Reaction,
} from '~/libs/enums/enums.js';
import {
  getFormattedDate,
  getFullName,
  getReactionConvertedToBoolean,
  getReactionsInfo,
  getValidClassNames,
  sanitizeHtml,
} from '~/libs/helpers/helpers.js';
import {
  useAppDispatch,
  useAppSelector,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleWithRelationsType,
  getReadTimeString,
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
  const { publishedAt, title, text, id, userId, coverUrl, readTime } = article;
  const { likesCount, dislikesCount, hasAlreadyReactedWith } = getReactionsInfo(
    user.id,
    reactions,
  );
  const articleUrl = window.location.href;
  const articleRouteById = AppRoute.ARTICLE.replace(':id', String(id));
  const isOwnArticle = user.id === userId;

  const handleReaction = (reaction: ValueOf<typeof Reaction>): void => {
    if (isOwnArticle) {
      return;
    }

    if (hasAlreadyReactedWith === reaction) {
      return void dispatch(
        articlesActions.deleteArticleReaction({
          isLike: getReactionConvertedToBoolean(reaction),
          articleId: id,
        }),
      );
    }

    void dispatch(
      articlesActions.reactToArticle({
        isLike: getReactionConvertedToBoolean(reaction),
        articleId: id,
      }),
    );
  };

  const handleLikeReaction = (): void => {
    handleReaction(Reaction.LIKE);
  };

  const handleDislikeReaction = (): void => {
    handleReaction(Reaction.DISLIKE);
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
          {readTime && (
            <span className={styles.publicationTime}>
              {getReadTimeString(readTime)}
            </span>
          )}
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
          <div className={styles.coverWrapper}>
            <img src={coverUrl} alt="article cover" className={styles.cover} />
          </div>
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
                isOwnArticle ? styles.disabled : styles.reaction,
                hasAlreadyReactedWith === Reaction.LIKE && styles.pressed,
              )}
              label={String(likesCount)}
              onClick={handleLikeReaction}
            />
          </li>
          <li>
            <IconButton
              iconName="dislike"
              className={getValidClassNames(
                styles.footerIcon,
                isOwnArticle ? styles.disabled : styles.reaction,
                hasAlreadyReactedWith === Reaction.DISLIKE && styles.pressed,
              )}
              label={String(dislikesCount)}
              onClick={handleDislikeReaction}
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
