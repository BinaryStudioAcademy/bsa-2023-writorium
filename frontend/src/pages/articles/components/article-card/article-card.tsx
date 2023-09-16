import { matchPath } from 'react-router-dom';

import {
  Avatar,
  Icon,
  IconButton,
  Link,
  ShareOnFacebookButton,
  Tags,
} from '~/libs/components/components.js';
import {
  AppRoute,
  ArticleSubRoute,
  DateFormat,
  LinkHash,
  Reaction,
} from '~/libs/enums/enums.js';
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
  useCallback,
  useLocation,
} from '~/libs/hooks/hooks.js';
import { type TagType, type ValueOf } from '~/libs/types/types.js';
import {
  type ArticleWithCommentCountResponseDto,
  getReadTimeString,
  type ReactionResponseDto,
} from '~/packages/articles/articles.js';
import {
  type UserAuthResponseDto,
  type UserDetailsResponseDto,
} from '~/packages/users/users.js';
import { actions as articlesActions } from '~/slices/articles/articles.js';

import { MOCKED_REACTIONS } from '../../libs/constants.js';
import { getReactionConvertedToBoolean } from '../../libs/helpers/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  article: ArticleWithCommentCountResponseDto;
  author: UserDetailsResponseDto;
  tags: TagType[];
  reactions: ReactionResponseDto[];
  onDeleteArticle?: (id: number) => void;
};

const ArticleCard: React.FC<Properties> = ({
  article,
  author,
  tags,
  reactions,
  onDeleteArticle,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(({ auth }) => auth.user) as UserAuthResponseDto;
  const { pathname } = useLocation();

  const isMyArticles = matchPath(
    { path: ArticleSubRoute.MY_ARTICLES },
    pathname,
  );
  const {
    publishedAt,
    title,
    text,
    id,
    userId,
    coverUrl,
    readTime,
    commentCount,
  } = article;
  const { likesCount, dislikesCount, hasAlreadyReactedWith } = getReactionsInfo(
    user.id,
    reactions,
  );
  const { firstName, lastName, avatarUrl } = author;
  const articleUrl = window.location.href;
  const articleRouteById = AppRoute.ARTICLE.replace(':id', String(id));

  const handleDeleteArticle = useCallback(() => {
    onDeleteArticle?.(id);
  }, [id, onDeleteArticle]);
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

  const handleSharedButtonClick = useCallback((): void => {
    void dispatch(articlesActions.shareArticle({ id: id.toString() }));
  }, [dispatch, id]);

  return (
    <article className={styles.article}>
      <div className={styles.header}>
        <div className={styles.info}>
          <Avatar
            username={getFullName(firstName, lastName)}
            avatarUrl={avatarUrl}
          />
          <span className={styles.publisherName}>
            {getFullName(firstName, lastName)}
          </span>
          {publishedAt ? (
            <span className={styles.publicationTime}>
              {getFormattedDate(publishedAt, DateFormat.DAY_SHORT_MONTH)}
            </span>
          ) : (
            <span className={styles.publicationTime}>draft</span>
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
              />
              <Link
                to={
                  AppRoute.EDIT_ARTICLE.replace(
                    ':id',
                    id.toString(),
                  ) as typeof AppRoute.EDIT_ARTICLE
                }
                state={article}
              >
                <Icon
                  iconName="edit"
                  className={getValidClassNames(
                    styles.editIcon,
                    styles.pointerIcon,
                  )}
                />
              </Link>
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
            <Link
              to={{
                pathname: articleRouteById as typeof AppRoute.ARTICLE,
                hash: LinkHash.COMMENTS,
              }}
              className={styles.reaction}
            >
              <IconButton
                iconName="comment"
                className={styles.footerIcon}
                label={commentCount.toString()}
              />
            </Link>
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

        <IconButton
          iconName="share"
          className={styles.iconWrapper}
          onClick={handleSharedButtonClick}
        />
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
